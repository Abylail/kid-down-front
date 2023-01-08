<script>
export default {
  name: "index",
  middleware({ redirect, store }) {
    console.log("isAuth", store.getters["user/isAuth"]);
    if (store.getters["user/isAuth"]) return redirect(`/user/${store.getters["user/getUsername"]}`);
    redirect("/");
  }
}
</script>
