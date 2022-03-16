const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  user_info: state => state.user.user_info,
  addRouters:state => state.permission.addRouters,
  routers:state => state.permission.routers,
}
export default getters
