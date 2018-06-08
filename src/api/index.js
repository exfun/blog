import githubAPI from "./github-api"

export const api = Object.assign({}, githubAPI)

export function request(key, params, options = {}) {
  const { config = 'githubConfig' } = options
  let { method = 'GET', host, accept, url } = api[config]
  const target = api[key]

  if (typeof target == 'object') {
    const { url: targetUrl, accept: targetAccept, method: targetMethod } = target
    url = targetUrl
    if (targetAccept) accept = targetAccept
    if (targetMethod) method = targetMethod
  } else {
    url = target
  }

  const requestHead = {
    method: method,
    headers: {
      'Accept': accept,
      'content-type': 'application/json'
    },
    body: params,
  }

  return fetch(`${host}${url}`, requestHead).then(res => res.json())
}

