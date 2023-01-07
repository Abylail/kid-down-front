// Если пользователь авторизован то его кидает на главную
export default async function ({ store, redirect, route }) {
  if (store.getters["user/isAuth"]) {
    return redirect(`/`);
  }
}
