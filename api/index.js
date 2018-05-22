import githubAPI from "./github-api"

export const api = { ...githubAPI }

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
      // 'Content-Type': 'application/json',
    },
    body: params,
  }

  return fetch(`${host}${url}`, requestHead).then(res => res.json())
}

