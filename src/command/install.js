const program = require('commander')
const inquirer = require('inquirer')
const Git = require('../utils/git')
const config = require('../../config')
const OraLoading = require('../utils/OraLoading')

const git = new Git(config.repoType, config.registry)

program
  .command('install')
  .description('install github project to local')
  .action(async () => {
    const loaderList = OraLoading('正在获取你可以开发的项目列表...')
    const repos = await git.fetchRepoList()
    loaderList.succeed('列表获取成功')
    if (repos.length === 0) throw new Error(`There is no any scaffolds in https://github.com/${config.registry}. Please create and try`)
    // 提取返回结果中每一项的项目名字
    const choices = repos.map(({ name }) => name)
    const questions = [{
      type: 'list',
      name: 'repo',
      message: '你想要下载啥样子的项目咧 ^ _ ^ ?',
      choices
    }]
    // 取出选择的git仓库
    const { repo } = await inquirer.prompt(questions)
    // 获取选择仓库所有的版本
    const tags = await git.fetchRepoTagList(repo)
    const { name: version } = tags.pop()
    const loaderProject = OraLoading('正在加速为你下载代码...')
    await git.download([repo, version].join('@'))
    loaderProject.succeed('项目下载完成啦, 开启你的操作吧 !  !   !     !')
  })
program.parse(process.argv) // 开始解析用户输入的命令
