export default async function ({ store, redirect, route }) {
  console.log("MIDDLEWARE")
  if (!store.getters["user/isAuth"] && !["login", "registration"].includes(route.name)) {
    return redirect(`/login?redirect=${route.path}`);
  }
}
