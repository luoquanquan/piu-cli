const program = require('commander')

program
  .command('init')
  .description('init project for local')
  .action(() => { // list命令的实现体
    // to do
    console.log('init command')
  })
program.parse(process.argv)
