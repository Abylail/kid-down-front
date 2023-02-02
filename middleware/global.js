export default async function ({ store, redirect, route }) {
  await store.dispatch("user/tokenAuth");
  store.dispatch("user/notifications/fetchNewCount");
}
