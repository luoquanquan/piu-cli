/**
 * 项目初始化问题整理
 * @param  {[type]} template [description]
 * @param  {[type]} user     [description]
 * @param  {[type]} email    [description]
 * @return {[type]}          [description]
 */
module.exports = function askCreator({
  template,
  user,
  email
}) {
  return [
    {
      type: 'confirm',
      name: 'private',
      message: 'Is the project private ?'
    },
    {
      type: 'input',
      name: 'author',
      default: user,
      message: 'Please tell me your name'
    },
    {
      type: 'input',
      name: 'name',
      message: 'package name',
      default: template,
      validate(input) {
        const done = this.async()
        if (input.trim()
          .length === 0) {
          done('project name is empty')
          return
        }
        done(null, true)
      }
    },

    {
      type: 'input',
      name: 'description',
      message: 'description'
    },

    {
      type: 'list',
      name: 'license',
      message: 'license',
      choices: ['MIT', "BSD 2-clause 'Simplified'", 'Apache 2.0', 'GNU General Public v3.0', 'BSD 3-clause', 'Eclipse Public 1.0', 'GNU Affero General Public v3.0', 'GNU General Public v2.0', 'GNU Lesser General Public v2.1', 'GNU Lesser General Public v3.0', 'Mozilla Public 2.0', 'The Unlicense']
    },
    {
      type: 'input',
      name: 'email',
      message: 'email',
      default: email
    }
  ]
}
