var chalk = require('chalk') // 终端字符串样式造型模块（可以给字符串显示各种样式）
var semver = require('semver') // 对版本加工和处理的工具模块
var packageConfig = require('../package.json') // 工程配置json对象
var shell = require('shelljs') // shell命令封装模块（可实现跨Unix平台使用）;https://www.npmjs.com/package/shelljs

function exec(cmd) {
  return require('child_process').execSync(cmd).toString().trim() // child_process 是node中的子进程模块
}

var versionRequirements = [{
  name: 'node',
  currentVersion: semver.clean(process.version), // process.version = 'v7.9.0',加工后 '7.9.0'; https://www.npmjs.com/package/semver
  versionRequirement: packageConfig.engines.node
}, ]

if (shell.which('npm')) { // 检测 npm 是否安装了
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function() {
  var warnings = []
  for (var i = 0; i < versionRequirements.length; i++) {
    var mod = versionRequirements[i]
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log() // 控制台独占一行
    for (var i = 0; i < warnings.length; i++) {
      var warning = warnings[i]
      console.log('  ' + warning)
    }
    console.log()
    process.exit(1)
  }
}
