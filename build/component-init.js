const prompt = require('inquirer').createPromptModule()
const shellJs = require('shelljs')
const path = require('path')
const bluebird = require('bluebird')
const ora = require('ora')
const moment = require('moment')
const userName = require('git-user-name')
const userEmail = require('git-user-email')
const fs = bluebird.promisifyAll(require('fs'))

// path
const CWD = process.cwd()
const COMPONENTS_PATH = path.resolve(CWD, './components')
const EXPECT_SHELL = path.resolve(CWD, './build/template.exp')
const DEMO_INDEX_PATH = path.resolve(CWD, './examples/demo-index.js')
const TYPES = path.resolve(CWD, './types/index.d.ts')
const COMPONENT_INDEX = path.resolve(CWD, './components/index.js')
const COMPONENT_JSON = path.resolve(CWD, './examples/components.json')

function init (answers) {
  return Promise.resolve(answers)
    .then(checkNoRepeat)
    .then(create)
    .then(sync)
    .catch(err => {
      console.warn(err)
    })
}

function checkNoRepeat(answers) {
  return fs.readdirAsync(COMPONENTS_PATH)
    .then(files => {
      return Promise.all(files.map(file => checkFile(COMPONENTS_PATH, file, answers.componentName))).then(() => answers)
    })
}

function upperFirst(str) {
  return String.prototype.replace.call(str, /^\w/, function (match) {
    return String.prototype.toUpperCase.call(match)
  })
}

function changeKebabToCamel(str) {
  return String.prototype.replace.call(str, /\-(\w)/g, function(match, p1) {
    return String.prototype.toUpperCase.call(p1)
  })
}

function sync(answers) {
  return Promise.all([syncToComponentJson(answers), syncToExample(answers), syncToIndex(answers), syncToTypes(answers)]).then(() =>answers)
}

function syncToExample(answers) {
  fs.readFileAsync(DEMO_INDEX_PATH, 'utf8')
    .then(str => {
      return compile(answers, str)
    })
    .then(str => fs.writeFileAsync(DEMO_INDEX_PATH, str, 'utf8'))
    .then(() => answers)
}
function syncToTypes(answers) {
  fs.readFileAsync(TYPES, 'utf8')
    .then(str => {
      return compile(answers, str)
    })
    .then(str => fs.writeFileAsync(TYPES, str, 'utf8'))
    .then(() => answers)
}

function syncToIndex(answers) {
  /* ??????components/index?????? */
  fs.readFileAsync(COMPONENT_INDEX, 'utf8')
    .then(str => {
      return compile(answers, str)
    })
    .then(str => fs.writeFileAsync(COMPONENT_INDEX, str, 'utf8'))
    .then(() => answers)
}

function syncToComponentJson(answers) {
  const json = require(COMPONENT_JSON)
  let index = json.findIndex(item => item.category === answers.componentType)
  if (index === -1) {
    index = json.length
    json.push({
      category: answers.componentType,
      list: [],
    })
  }
  json[index].list.push({
    name: answers.componentNameUpper,
    path: `/${answers.componentName}`,
    icon: answers.componentName,
    text: answers.componentCnName,
  })
  Array.prototype.forEach.call(json, element => {
    Array.prototype.sort.call(element.list, function(a, b) {
      return a.name > b.name ? 1 : -1
    })
  })
  Array.prototype.sort.call(json, (a, b) => {
    return a.category > b.category ? 1: -1
  })
  return fs.writeFileAsync(COMPONENT_JSON, JSON.stringify(json), 'utf8')
            .then(answers => answers)
}

function compile(metaData, fileStr) {
  return String.prototype.replace.call(fileStr, /\/\*.*@init<%(.*)%>.*\*\//g, function (match, p1) {
    return (String.prototype.replace.call(p1, /\${(\w*)}/g, function (innMatch, innP1) {
      return metaData[innP1]
    })) + '\r' +match
  })
}

function checkFile(dir, file, name) {
  const filePath = path.resolve(dir, `./${file}`)
  return fs.statAsync(filePath)
    .then(stat => {
      if (stat.isDirectory()) {
        if (name === file) {
          return Promise.reject(`??????????????????????????????${name}??????????????????????????????????????????`)
        }
      }
      return
    })
}

function exec (command, argvs) {
  const spinner = ora('Loading...').start()
  const result = shellJs.exec(`${command} ${argvs.map(item => `\'${item}\'`).join(' ')} >> /dev/null`)
  spinner.succeed(['????????????'])
  return result
}

function create(answers) {
  exec('expect', [EXPECT_SHELL, answers.componentCnName, answers.componentName, answers.componentType, answers.componentDesc, answers.author, answers.time, COMPONENTS_PATH])
  return answers
}

function getUserInfo() {
  let user = userName()
  if (!user) {
    user = 'anonymous'
  }
  const email = userEmail()
  if (email) {
    user += ` <${email}>`
  }
  return user
}

function launch() {
  return prompt([
    {
      type: 'input',
      name: 'componentName',
      message: '?????????????????????????????????(kebab-case):',
      validate: function (str) {
        return /^[a-z][a-z|-]*[a-z]$/.test(str)
      }
    },
    {
      type: 'input',
      name: 'componentCnName',
      message: '???????????????????????????????????????(??????):',
    },  
    {
      type: 'list',
      choices: [
        "basic",
        "feedback",
        "form",
        "business",
        "gesture"
      ],
      name: 'componentType',
      message: '????????????',
    },
    {
      type: 'input',
      name: 'componentDesc',
      message: '????????????',
    },
    {
      type: 'input',
      name: 'author',
      message: '??????',
      default: getUserInfo(),
    },
    {
      type: 'input',
      name: 'time',
      message: 'time',
      default: moment().format('YYYY???MM???DD???')
    }
  ])
    .then(answers => {
      answers = Object.assign(answers, {
        componentNameUpper: upperFirst(changeKebabToCamel(answers.componentName))
      })
      return init(answers)
    })
}

launch()
