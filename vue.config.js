const path = require('path');
const glob = require('glob');
const title = '测试页面';
const addStyleResource = rule => {
	rule.use('style-resource')
		.loader('style-resources-loader')
		.options({
			patterns: [
				path.resolve(__dirname, './src/css/config.less'),
			],
		})
}

const getPages = () => {
	// 多页面配置，相当于配置html-webpack-plugin
	const pages = {};
	glob.sync('./src/page/**/*.[jt]s?(x)').forEach((item) => {
		const filename = item.match(/\.\/src\/page\/(\S*).[jt]s?x?/)[1];
		pages[filename] = {
			title,
			entry: item,
			template: `public/${filename}.html`,
			filename: `${filename}`,
			chunks: ['common', filename],
			chunksSortMode: 'manual',
			inject: true
		};
	});
	return pages;
}

module.exports = {
	pages: getPages(),
	outputDir: './static',	//执行build时会在static下生成编译后的文件
	assetsDir: './',
	filenameHashing: false,
	productionSourceMap: false,
	configureWebpack: {
		resolve: {
			alias: {
				'@css': path.join(__dirname, 'src/css'),
				'@router': path.join(__dirname, 'src/router'),
				'@component': path.join(__dirname, 'src/components'),
				'@page': path.join(__dirname, 'src/page'),
			},
		}
	},
	chainWebpack: config => {
		// 移除 preload 插件
		config.plugins.delete('preload');
		config.plugins.delete('prefetch');

		// 增加图片超过80k就转成base64编码，否则就为原图片
		config.module
			.rule('images')
			.use('url-loader')
			.loader('url-loader')
			.tap(options => Object.assign(options, { limit: 1024 * 80, publicPath: '../../' }));

		// 压缩图片
		config.module
			.rule('images')
			.use('image-webpack-loader')
			.loader('image-webpack-loader')
			.options({
				quality: '65-80'
			})
			.end()

		// 每个单文件组件和less文件中导入config.less
		const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
		types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))

		// 加入ts
		config.module.rule('ts').use('babel-loader');

		// 移动端 px2rem-loader
		config.module
			.rule('less')
			.oneOf('normal')
			.use('px2rem-loader')
			.loader('px2rem-loader')
			.before('postcss-loader')
			.options({
				remUnit: 37.5,
				remPrecision: 8
			})
			.end()
	},
	css: {
		// 是否开启支持 foo.module.css 样式
		modules: false,
		// 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中
		// 如果为true，iview的icon无法显示
		extract: false,
		// 是否构建样式地图，false 将提高构建速度
		sourceMap: false,
		// css预设器配置项
		loaderOptions: {
			css: {},
			postcss: {}
		}
	},
	// 配置webpack-dev-server 
	devServer: {
		open: true,
		host: '127.0.0.1',
		port: 3000,
		https: false,
		hotOnly: false,
		proxy: null,
		before: app => {
			// 将路由加上路径前缀，否则刷新页面就会空白
			// const base = '/page1/index1'.replace(/\/+$/, ''); // 移除尾部斜杠
			// app.get(`${base}/:page/*`, (req, _, next) => {
			// 	if (['router1', 'router2', 'router3'].includes(req.params.page)) {
			// 		// 把 /<base>/<page>/* 重定向到 /<base>/<page>/
			// 		req.url = `${base}/${req.params.page}/`;
			// 		next('route');
			// 	} else {
			// 		next();
			// 	}
			// });
		}
	},
	// 构建时开启多进程处理 babel 编译
	parallel: require('os').cpus().length > 1,
}
