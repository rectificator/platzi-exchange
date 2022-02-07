import Vue from 'vue'
import Router from 'vue-router'

// Al utiilizar la carpeta views
// Diferencio los componentes que 
// representan páginas (vistas) de
// los componentes normales como el header, etc.
import Home from '@/views/Home'
import About from '@/views/About'
import Error from '@/views/Error'

// La funcion "use" me permite
// instalar plugins o incorporar
// los diferentes plugins o utilidades
// que contienen las bibliotecas
// Es decir nos permite ir progresando
// el proyecto al incorporar funcionalidades
// e ir escalando requerimientos a medida que
// tenga que resolver cosas más complicadas
Vue.use(Router)

// Dentro de "Router" establezco 
// la configuración de mis rutas
export default new Router({
    // Este modo utiliza el history mode de HTML
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: Aboutme
        },
        {
            path: '',
            name: '',
            component: Error
        }

    ]
})