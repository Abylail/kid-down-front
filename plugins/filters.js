import Vue from "vue";
import moment from "moment";

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
  return "больше дня назад";
}

Vue.filter("timeAgo", timeAgo)

// Сколько времени прошло (Сокращенный)
function timeAgoMini(date) {
  const minutesAgo = (new Date().getTime() - new Date(date).getTime()) / 60000;
  if (minutesAgo < 1) return "сейчас";
  if (minutesAgo < 60) return `${Math.ceil(minutesAgo)}м`
  if (minutesAgo < 24 * 60) return `${Math.ceil(minutesAgo/60)}ч`;
  return "больше дня назад";
}

Vue.filter("timeAgoMini", timeAgoMini)
