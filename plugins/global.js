
// Кнопка назад (если в контексте есть куда вернуться то идем нативно, либо идем в extraPath)
// extraPath -> роут в который надо вернуться если у пользователя нет истории
const goBack = ({router, context}, extraPath) => {
  if (context.from) router.go(-1);
  else router.push(extraPath);
}

// Перейти на страницу логина, так что бы при логине кинуло обратно
// path -> ссылка куда надо перейти если пользовьтель авторизовался
const goLogin = ({ router, context, store }, path) => {
  if (store.getters["user/isAuth"]) router.push(path || "/");
  else router.push(`/login?redirect=${path || context.route.fullPath || "/"}`);
}

export default function ({app}, inject) {
  inject("goBack", extraPath => goBack(app, extraPath))
  inject("goLogin", extraPath => goLogin(app, extraPath))
}
