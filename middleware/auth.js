export default function ({app, route, redirect}){
    if(route.path === '/createpost' || route.path === '/' || route.path === '/profile'){
        if(!app.$fire.auth.currentUser){
            return redirect('/home')
        }
    }
}