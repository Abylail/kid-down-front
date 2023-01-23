export default async function ({ store, redirect, route }) {
  store.dispatch("user/tokenAuth");
  store.dispatch("user/notifications/fetchNewCount");
}
