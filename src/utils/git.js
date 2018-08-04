const { basename } = require('path')
const Rp = require('request-promise')
const DownloadGitRepo = require('download-git-repo')
const { dirs, baseUrl } = require('../../config')
/**
 * git操作类
 */
class Git {
  constructor(type, registry) {
    this.type = type
    this.registry = registry
  }

  fetch(url, ua) {
    return Rp({
      url,
      headers: {
        'User-Agent': `${ua}`
      },
      json: true
    })
  }

  /**
   * 获取当前项目组下的项目列表
   */
  fetchRepoList() {
    const api = `${baseUrl}/${this.type}s/${this.registry}/repos`
    return this.fetch(api)
  }

  /**
   * 获取项目的 tag 列表
   * @param  {} repo [仓库名称]
   * @return {[type]}      [description]
   */
  fetchRepoTagList(repo) {
    const {
      url,
      scaffold
    } = this.fetchGitInfo(repo)
    const api = `${baseUrl}/repos/${url}/tags`

    return this.fetch(api, scaffold, url)
  }

  /**
   * 获取项目详情和目标目录
   * @param  {String} repo 仓库名称
   * @return {Object}      项目地址和目标目录
   */
  fetchGitInfo(repo) {
    let template = repo
    let [scaffold] = template.split('@')

    scaffold = basename(scaffold)

    template = template.split('@')
      .filter(Boolean)
      .join('#')
    const url = `${this.registry}/${template}`
    return {
      url,
      scaffold
    }
  }

  /**
   * clone Git 项目到指定的文件夹
   * @param  {Object} repo  项目地址目标目录
   * @return {Promise}      返回下载状态Promise
   */
  download(repo) {
    const { url, scaffold } = this.fetchGitInfo(repo)
    return new Promise((resolve, reject) => {
      DownloadGitRepo(url, `${dirs.download}/${scaffold}`, (err) => {
        if (err) reject(err)
        resolve(true)
      })
    })
  }
}

module.exports = Git
