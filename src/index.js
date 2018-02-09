//004
import Vue from "vue"
import App from "./app.vue"

//018引入图片和样式
import "./assets/styles/test.css"
import "./assets/styles/test-stylus.styl"
import "./assets/images/bg.jpeg"


//006
const root = document.createElement("div")
document.body.appendChild(root)
//007入口文件已经编写好，然后去webpack.config.js配置路径

//005
new Vue({
	render:(h) => h(App)
}).$mount(root)