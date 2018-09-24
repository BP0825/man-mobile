export {default as Home} from './home.vue'

export const Category = r => require.ensure([], () => r(require('./category')), 'category')
export const Button = r => require.ensure([], () => r(require('../components/button/demo')), 'button')
export const Icon = r => require.ensure([], () => r(require('../components/icon/demo')), 'icon')
export const Popup = r => require.ensure([], () => r(require('../components/popup/demo')), 'popup')
export const ActionBar = r => require.ensure([], () => r(require('../components/action-bar/demo')), 'action-bar')
export const DropMenu = r => require.ensure([], () => r(require('../components/drop-menu/demo')), 'drop-menu')
export const Picker = r => require.ensure([], () => r(require('../components/picker/demo')), 'picker')
export const TabBar = r => require.ensure([], () => r(require('../components/tab-bar/demo')), 'tab-bar')
export const Swiper = r => require.ensure([], () => r(require('../components/swiper/demo')), 'swiper')
export const Toast = r => require.ensure([], () => r(require('../components/toast/demo')), 'toast')
export const Dialog = r => require.ensure([], () => r(require('../components/dialog/demo')), 'dialog')
export const Tip = r => require.ensure([], () => r(require('../components/tip/demo')), 'tip')
export const Tabs = r => require.ensure([], () => r(require('../components/tabs/demo')), 'tabs')
export const Tag = r => require.ensure([], () => r(require('../components/tag/demo')), 'tag')
export const InputItem = r => require.ensure([], () => r(require('../components/input-item/demo')), 'input-item')
export const NumberKeyboard = r =>
  require.ensure([], () => r(require('../components/number-keyboard/demo')), 'number-keyboard')
export const Stepper = r => require.ensure([], () => r(require('../components/stepper/demo')), 'stepper')
export const Steps = r => require.ensure([], () => r(require('../components/steps/demo')), 'steps')
export const NoticeBar = r => require.ensure([], () => r(require('../components/notice-bar/demo')), 'notice-bar')
export const ResultPage = r => require.ensure([], () => r(require('../components/result-page/demo')), 'result-page')
export const ActionSheet = r => require.ensure([], () => r(require('../components/action-sheet/demo')), 'action-sheet')
export const Selector = r => require.ensure([], () => r(require('../components/selector/demo')), 'selector')
export const Landscape = r => require.ensure([], () => r(require('../components/landscape/demo')), 'landscape')
export const ImageViewer = r => require.ensure([], () => r(require('../components/image-viewer/demo')), 'image-viewer')
export const ImageReader = r => require.ensure([], () => r(require('../components/image-reader/demo')), 'image-reader')
export const TabPicker = r => require.ensure([], () => r(require('../components/tab-picker/demo')), 'tab-picker')
export const Field = r => require.ensure([], () => r(require('../components/field/demo')), 'field')
export const CellItem = r => require.ensure([], () => r(require('../components/cell-item/demo')), 'cell-item')
export const Switch = r => require.ensure([], () => r(require('../components/switch/demo')), 'switch')
export const Agree = r => require.ensure([], () => r(require('../components/agree/demo')), 'agree')
export const Radio = r => require.ensure([], () => r(require('../components/radio/demo')), 'radio')
export const DatePicker = r => require.ensure([], () => r(require('../components/date-picker/demo')), 'date-picker')
export const Captcha = r => require.ensure([], () => r(require('../components/captcha/demo')), 'captcha')
export const Codebox =  r => require.ensure([], () => r(require('../components/codebox/demo')), 'codebox')
export const Cashier =  r => require.ensure([], () => r(require('../components/cashier/demo')), 'cashier')
export const Chart =  r => require.ensure([], () => r(require('../components/chart/demo')), 'chart')
export const Amount =  r => require.ensure([], () => r(require('../components/amount/demo')), 'amount')
export const ActivityIndicator =  r => require.ensure([], () => r(require('../components/activity-indicator/demo')), 'activity-indicator')
export const Check =  r => require.ensure([], () => r(require('../components/check/demo')), 'check')
export const ScrollView =  r => require.ensure([], () => r(require('../components/scroll-view/demo')), 'scroll-view')
export const Bill =  r => require.ensure([], () => r(require('../components/bill/demo')), 'bill')
export const WaterMark =  r => require.ensure([], () => r(require('../components/water-mark/demo')), 'water-mark')
export const Transition =  r => require.ensure([], () => r(require('../components/transition/demo')), 'transition')
export const DetailItem =  r => require.ensure([], () => r(require('../components/detail-item/demo')), 'detail-item')
/* @init<%export const ${componentNameUpper} =  r => require.ensure([], () => r(require('../components/${componentName}/demo')), '${componentName}')%> */
