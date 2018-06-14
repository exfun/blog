import axios from 'axios'
import githubAPI from "./github-api"

export const api = Object.assign({}, githubAPI)

export function request(key, params, options = {}) {
  const { config = 'githubConfig', loading = true } = options
  let { method = 'GET', host, accept, url } = api[config]
  const target = api[key]

  if (loading) $app.nav.loader(true)

  if (typeof target == 'object') {
    const { url: targetUrl, accept: targetAccept, method: targetMethod } = target
    url = targetUrl
    if (targetAccept) accept = targetAccept
    if (targetMethod) method = targetMethod
  } else {
    url = target
  }

  url = `${host}${url}`
  const requestHead = {
    method,
    headers: {
      Accept: accept,
      // 'content-type': 'application/json'
    },
    url,
    data: params,
  }

  if (method.toLowerCase() === 'get') {
    return axios.get(url, { params }).then(checkStatus)
  } else {
    return axios(requestHead).then(checkStatus)
  }

  function checkStatus(res) {
    if (loading) $app.nav.loader(false)
    return res.data
  }
}


// axios.interceptors.request.use(config => {
//   config.headers = Object.assign({}, { 'X-Requested-With': 'XMLHttpRequest' }, config.headers)
//   return config
// }, error => {
//   return Promise.reject(error)
// })

// axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))
