<script>
export default {
  name: "index",
  middleware({ redirect, store }) {
    if (store.getters["user/isAuth"]) return redirect(`/user/${store.getters["user/getUsername"]}`);
    redirect("/");
  }
}
</script>
