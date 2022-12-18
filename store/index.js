export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch("user/tokenAuth", null, {root: true});
  }
}
