export default function ({ app, route, redirect }) {
  if (
    route.path === '/createpost' ||
    route.path === '/' ||
    route.path === '/profile/editprofile' ||
    route.path === '/profile/savedpost' ||
    route.path === '/blogpreview'
  ) {
    if (!app.$fire.auth.currentUser) {
      return redirect('/home')
    }
  }
}
