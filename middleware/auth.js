export default function ({app, route, redirect}){
    if(route.path === '/createpost'){
        if(!app.$fire.auth.currentUser){
            return redirect('/home')
        }
    }
}