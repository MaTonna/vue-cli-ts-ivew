import NotFoundComponent from '@component/NotFoundComponent.vue'
const routes = [
	{
		path: '/',
		redirect: 'contentManage'
	},
	{
		name: 'TopMenu',
		path: '/TopMenu',
		component: () => import('@component/page1/TopMenu.vue'),
		// 左侧导航
		children: [
			{
				name: 'contentManage',
				path: '/contentManage',
				props: { default: true, sidebar: true },
				component: () => import('@component/page1/SideMenu.vue'),
				children: [{
					name: 'contentCenter1',
					path: '/contentCenter1',
					component: () => import('@component/page1/ContentCenter1.vue'),
				}, {
					name: 'contentCenter2',
					path: '/contentCenter2',
					component: () => import('@component/page1/ContentCenter2.vue'),
				}]
			},
			{
				name: 'statisticsManage',
				path: '/statisticsManage',
				props: { default: true, sidebar: true },
				component: () => import('@component/page1/SideMenu.vue'),
				children: [{
					name: 'statisticsCenter1',
					path: '/statisticsCenter1',
					component: () => import('@component/page1/StatisticsCenter1.vue'),
				}]
			}
		]
	},
	{
		path: '*',
		component: NotFoundComponent,
	}
];
export default routes;