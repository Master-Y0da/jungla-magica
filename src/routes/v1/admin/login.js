import { Hono } from 'hono'
import { join } from "path";

import LoginLayout from '../../../components/admin/layouts/admin'
import AdminLayout from '../../../components/admin/layouts/home'
import Login from '../../../components/admin/login'
import Home from '../../../components/admin/home'
import Nav  from '../../../components/admin/nav'
import Agenda from '../../../components/admin/agenda'
import Planes from '../../../components/admin/planes'
import Kids from '../../../components/admin/niños/kids'
import { authMiddleware } from '../middlewares/authMiddleware';
import nunjucks from "nunjucks";


const admin_routes = new Hono()
const nunjucks_instance = nunjucks.configure(
    join(import.meta.dir, "../../../components/admin"),
    { autoescape: true, express: admin_routes.app, noCache: true },
);

admin_routes.use('*', async(c,next) => {

    if(!c.req.url.includes('/login')){
        let result = await authMiddleware(c)
        if(result.status === 401){
            c.status(401)
            c.header('Location','/admin/login')
            return c.redirect('/admin/login')          
        }
    }
    c.nunjucks = nunjucks_instance;
    return await next()
})

admin_routes.get('/login', (c) => {
    
    return c.html(<LoginLayout section={<Login/>}/>)
})

admin_routes.get('/home', async(c) => {
    let page = c.nunjucks.render('home2.html')   
    return c.html(<AdminLayout nav={<Nav/>} main={<div dangerouslySetInnerHTML={{__html: page}}/>} />)
})

admin_routes.get('/agenda', async(c) => {
    
    return c.html(<AdminLayout nav={<Nav/>} main={<Agenda/>} />)
})

admin_routes.get('/kids', async(c) => {
    
    return c.html(<AdminLayout nav={<Nav/>} main={<Kids/>} />)
})

admin_routes.get('/planes', async(c) => {
    
    return c.html(<AdminLayout nav={<Nav/>} main={<Planes/>} />)
})
admin_routes.get('/inventario', async(c) => {
    let page = c.nunjucks.render('inventario/inventario.html')
    return c.html( <AdminLayout nav={<Nav/>} main={<div dangerouslySetInnerHTML={{__html: page}}/>} />)
})


export { admin_routes }
