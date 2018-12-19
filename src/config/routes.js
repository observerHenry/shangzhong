import Login from '../components/Login.vue'
import NotFound from '../components/404.vue'
import Home from '../components/home.vue'

//system
import System from "../components/system.vue"
import UserManage from '../components/system/user_manage.vue'
import RoleManage from '../components/system/role_manage.vue'

export default
[
	{
		path: '/login',
		component: Login,
		name: 'Login',
		hidden: true
	},
	{
		path: '/404',
		component: NotFound,
		name: '404',
		hidden: true
	},
	{
		path: '/home',
		component: Home,
		redirect: '/home/system',
		children: [
			{
				path: '/home/system',
				component: System,
				name: 'System',
				meta: "系统管理",
				children: [
					{
						path: '/home/system/user_manage',
						component: UserManage,
						name: 'user_manage',
						meta: '用户管理'
					},
					{
						path: '/home/system/role_manage',
						component: RoleManage,
						name: 'role_manage',
						meta: '角色管理'
					},
				]
			},
		]
	},
	{
		path: '*',
		redirect: '/home',
		hidden: true
	},
]
