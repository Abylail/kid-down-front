import Vue from "vue";
import moment from "moment";

moment.locale("ru");

function dateFormat(date) {
  return moment(date).format("DD.MM.yyyy")
}
Vue.filter("dateFormat", dateFormat)

function dateTimeFormat(date) {
  return moment(date).format("DD.MM.yyyy (HH:mm)")
}
Vue.filter("dateTimeFormat", dateTimeFormat)

// Сколько времени прошло
function timeAgo(date) {
  const minutesAgo = (new Date().getTime() - new Date(date).getTime()) / 60000;
  if (minutesAgo < 1) return "прям только что";
  if (minutesAgo < 60) return `${Math.ceil(minutesAgo)} минут назад`
  if (minutesAgo < 24 * 60) return `${Math.ceil(minutesAgo/60)} часов назад`;

  const daysAgo = minutesAgo/(24*60);
  if (daysAgo < 7) return `${Math.ceil(daysAgo)} дней назад`

  const weeksAgo = Math.floor(daysAgo/7);
  if (weeksAgo < 2) return `${weeksAgo} неделю назад`
  if (weeksAgo < 4) return `${weeksAgo} недели назад`
  return moment(date).format("DD MMMM YYYY");
}

Vue.filter("timeAgo", timeAgo)

// Сколько времени прошло (Сокращенный)
function timeAgoMini(date) {
  const minutesAgo = (new Date().getTime() - new Date(date).getTime()) / 60000;
  if (minutesAgo < 1) return "сейчас";
  if (minutesAgo < 60) return `${Math.ceil(minutesAgo)}м`
  if (minutesAgo < 24 * 60) return `${Math.ceil(minutesAgo/60)}ч`;

  const daysAgo = minutesAgo/(24*60);
  if (daysAgo < 7) return `${Math.ceil(daysAgo)}д`

  const weeksAgo = Math.floor(daysAgo/7);
  if (weeksAgo < 4) return `${weeksAgo}н`
  return moment(date).format("DD.MM.YYYY");
}

Vue.filter("timeAgoMini", timeAgoMini)
