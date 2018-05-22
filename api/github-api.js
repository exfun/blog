const config = {
  username: 'lanten',
  repo: 'blog'
}

const { username, repo } = config

let api = {
  ...config,
  getIssues: `/repos/${username}/${repo}/issues`
}

module.exports = api