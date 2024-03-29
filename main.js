import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import store from './store/index.js'

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.use(uView);

App.mpType = 'app'

const app = new Vue({
    ...App,
		store
})
app.$mount()
