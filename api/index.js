import githubAPI from "./github-api"

export const api = { ...githubAPI }

export function request(key, params, options) {
  return fetch(`https://api.github.com${api[key]}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.github.symmetra-preview+json',
      'Content-Type': 'application/json',
    },
    body: params,
  }).then(res => res.json())
}

