import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ihrm-token'
const TimeKey = 'hrsaas-ihrm-time'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getTimeKey () {
  return Cookies.get(TimeKey)
}

export function setTimeKey () {
  return Cookies.set(TimeKey, Date.now())
}
