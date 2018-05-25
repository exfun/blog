/**
 * 码云 Open API
 * https://gitee.com/api/v5/swagger#/getV5ReposOwnerRepoStargazers?ex=no
 */

const giteeConfig = {
  username: 'lanten',
  repo: 'blog',

  host: 'https://gitee.com/api',
  method: 'GET',
  accept: 'application/json',
}

const { host, username, repo } = giteeConfig

let giteeApi = {
  giteeConfig,

  // 获取 issues
  getIssues: {
    url: `/repos/${username}/${repo}/issues`,
    accept: 'application/vnd.github.symmetra-preview+json',
  },
}

export default giteeApi