//002path是node.js的一个基本包
const path = require("path")
//003创建src/index.js作为入口文件
//004编写index.js
//001
module.exports = {
//007编写入口
	entry:path.join(__dirname,"src/index.js"),
//008编写出口，输出文件，到这里基本完成打包，会把依赖的Vue，App等都打包成bundle.js，并且是能够直接在浏览器里面运行的js代码
	output:{
		filename:"bundle.js",//输出文件名，运行时会动态创建一个bundle.js
		path:path.join(__dirname,'dist')//输出路径，即bundle.js是在dist里面的
	},
//011
	module:{
		rules:[
			{//011test去检测文件类型
				test:/\.vue$/,
				loader:"vue-loader"
			//此时，碰到.vue结尾的文件，webpack就会用vue-loader去处理，就可以输出一个正确的js代码
			//012npm run build报错解决，并且生成dist/bundle.js
			//013此时去看dist/bundle.js，前面的部分是webpack固有的代码，处理所有的模块依赖，因为js会相互依赖
			//接下去就是vue的源码，把vue的整个包都打包到同一个js里面，后面会讲如何分离
			},
			//014配置规则加载css
			{
				test:/\.css$/,
				// loader:"css-loader"//此时，css-loader只是处理了css文件，读取到css的内容，但是没右完成渲染
				use:[
					'style-loader',//把css-loader读取到的css渲染到html上
					'css-loader'
				]
			},
			//015配置规则加载图片
			{
				test:/\.(gif|jpg|jpeg|png|svg)$/,
				use:[
					{//使用对象的写法是因为loader是可以配置选项的，使用options去配置参数
						loader:'url-loader',//url-loader把图片直接转换成base64代码，直接写在js内容里面，不需要生成一个新的文件
						//url-loader其实是封装了file-loader，file-loader就是把图片简单地读取一下，进行操作后，把图片重新换一个名字，放在别的地方
						options:{
							limit:1024,//对于一些小图片就可以减少http请求，此处的限制就是只针对小于1024的图片进行url-loader操作
							name:'[name]-aaa.[ext]'//指定输出的文件的名字，ext是文件的扩展名，自定义-aaa可以省略
						}
					}
				]
			}
			//016安装相应的loader。npm install style-loader url-loader file-loader
			//之所以要安装file-loader是因为url-loader是依赖于file-loader的
			//017添加src/assets/images和src/assets/styles
			//018测试引入的图片和css样式，到app.vue引入
		]
	}
}
//009去package.json添加一个脚本bulid第8行
//009只有在这里去调用webpack，才会去调用项目里面的webpack,如果直接在命令行输会调用全局的webpack,可能会造成版本的不一样
//010添加完脚本之后npm run build，此时弹出错误ERROR in ./src/app.vue
//You may need an appropriate loader to handle this file type.
//这里的错误是因为webpack原生是只支持js文件类型的，并且支持的语法是es5的语法，所以需要加个配置module去定义规则