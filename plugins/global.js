const goBack = ({router, context}, extraPath) => {
  if (context.from) router.go(-1);
  else router.push(extraPath);
}

export default function ({app}, inject) {
  inject("goBack", extraPath => goBack(app, extraPath))
}
