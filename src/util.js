/**
 * Created by wenxiaoxin on 2017/4/13.
 */

/*
 *  get cookie value
 *
 *  @params   {string}name
 *  @returns  {string}cookieValue
 **/
export function getCookie (name) {
  let cookieName = encodeURIComponent(name) + '='
  let cookieStart = document.cookie.indexOf(cookieName)
  let cookieValue = null
  if (cookieStart > -1) {
    let cookieEnd = document.cookie.indexOf(';', cookieStart)
    if (cookieEnd === -1) {
      cookieEnd = document.cookie.Length
    }
    cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
  }
  return cookieValue
}
