/**
 * github API 默认使用 V3
 * https://developer.github.com/v3/
 */

const githubConfig = {
  username: 'lanten',
  repo: 'blog',

  host: 'https://api.github.com',
  method: 'GET',
  accept: 'application/vnd.github.v3+json', // 默认使用 v3 api
}

const { host, username, repo } = githubConfig

let githubApi = {
  githubConfig,

  // 获取 issues
  getIssues: {
    url: `/repos/${username}/${repo}/issues`,
    accept: 'application/vnd.github.symmetra-preview+json',
  },
}

export default githubApi