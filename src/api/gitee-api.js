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
  getIssues: `/repos/${username}/${repo}/issues`,
}

export default giteeApi