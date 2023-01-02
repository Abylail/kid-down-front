export default async function ({ store, redirect, route }) {
  if (!store.getters["user/isAuth"] && !["login", "registration"].includes(route.name)) {
    return redirect(`/login?redirect=${route.path}`);
  }
}
