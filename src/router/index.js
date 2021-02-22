import Vue from 'vue'
import Router from 'vue-router'
import menus from '@/config/menu-config'

Vue.use(Router)
//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

var routes = []

menus.forEach(element => {
    element.sub.forEach(
        (sub) => {
            routes.push({
                path: `/${sub.componentName}`,
                name: sub.componentName,
                component: () => import(`@/views/${sub.componentName}`)
            })
        }
    )
});

export default new Router({ routes })