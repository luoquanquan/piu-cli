const program = require('commander')
const inquirer = require('inquirer')
const { resolve } = require('path')
const rmfr = require('rmfr')
const { readdir, exists } = require('mz/fs')
const { dirs, metalsmith } = require('../../config')
const copyFile = require('../utils/copyFile')
const metalsmithACtion = require('../utils/metalsmithACtion')
const OraLoading = require('../utils/OraLoading')


program
  .command('init')
  .description('init project for local')
  .action(async () => {
    let loader
    loader = OraLoading('检查本地模版库')
    if (!await exists(dirs.download)) {
      throw new Error(`There is no ${dirs.download}, Please install a template`)
    }
    const list = await readdir(dirs.download)
    if (list.length === 0) {
      throw new Error(`There is no any scaffolds in your local folder ${dirs.download}, install it`)
    }
    loader.succeed('检查本地模版库完成')
    const questions = [{
      type: 'list',
      name: 'template',
      message: '你想要开发啥样子的项目咧 ^ _ ^ ?',
      choices: list
    }, {
      type: 'input',
      name: 'dir',
      message: '请输入项目名称',
      async validate(input) {
        const done = this.async()
        if (input.length === 0) {
          done('你必须输入项目名')
          return
        }
        const dir = resolve(process.cwd(), input)
        if (await exists(dir)) {
          done('项目已存在，请重新输入别的项目名')
        }
        done(null, true)
      }
    }]
    const answers = await inquirer.prompt(questions)
    if (metalsmith) {
      const tmp = `${dirs.tmp}/${answers.template}`
      // 复制一份到临时目录，在临时目录编译生成
      // loader = OraLoading('copy file to tmp dir')
      await copyFile(`${dirs.download}/${answers.template}`, tmp)
      // loader.succeed('copy file to tmp dir success')
      await metalsmithACtion(answers.template)
      loader = OraLoading('编译', answers.dir)
      await copyFile(`${tmp}/${dirs.metalsmith}`, answers.dir)
      await rmfr(tmp) // 清除临时文件夹
    } else {
      loader = OraLoading(`正在创建 ${answers.dir}`)
      await copyFile(`${dirs.download}/${answers.template}`, answers.dir)
    }
    loader.succeed(`${answers.dir} 创建完成`)
  })
program.parse(process.argv) // 开始解析用户输入的命令
