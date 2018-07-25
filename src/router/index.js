import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Post from '@/components/Post'
import Categorias from '@/components/Categorias'
import Busqueda from '@/components/Busqueda'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'home', component: Home },
    {path: '/post/:slug', name:'post', component: Post},
    {path: '/categorias/:name', name:'categories', component: Categorias},
    {path: '/busqueda/:query', name:'search', component: Busqueda},
    {path:'*',  redirect: {name:'home'}   }
  ]
})
