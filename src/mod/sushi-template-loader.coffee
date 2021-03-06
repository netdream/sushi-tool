async = require "async"
bower = require "bower"
fs    = require "fs"
Git   = require "nodegit"
os    = require "os"
path  = require "path"
home  = os.homedir()
Multispinner = require "multispinner"
template_git_dir = ".sushi-tool/template-git"
template_git_pwd = path.resolve(path.join(home, template_git_dir))
template_dir = ".sushi-tool/template"
template_pwd = path.resolve(path.join(home, template_dir))
prettyjson = require 'prettyjson'

gitRepository = "https://github.com/netdream/sushi-gen"

downloadDependencies = (callback) ->
  # Execute bower
  config =
    cwd: template_git_pwd
  bower.commands.install([], {}, config)
  .on "end", ->
    callback()

module.exports =
  template_pwd: template_pwd
  isTemplateReady: ->
    fs.existsSync(template_git_pwd)

  updateTemplate: (callback) ->
    spinner = new Multispinner
      'bower_dependencies': __("pdf.bower_dependencies")

    async.series [
      (internalCallback) ->
        Git.Repository.open (template_git_pwd)
        .then (repository) ->
          repository.fetchAll()
          .then ->
            repository.mergeBranches("master", "origin/master")
            .then (oid) ->
              internalCallback()
      , (internalCallback) ->
        downloadDependencies ->
          if !fs.existsSync template_pwd
            fs.symlinkSync path.join(template_git_pwd, "public"), template_pwd
          if !fs.existsSync path.join(template_pwd, "_harp.json")
            fs.symlinkSync path.join(template_git_pwd, "harp.json"), path.join(template_pwd, "_harp.json")
          spinner.success('bower_dependencies')

        spinner.on 'done', =>
          callback()
          internalCallback()
    ]

  downloadTemplate: (callback) ->
    Git.Clone gitRepository, template_git_pwd, { checkoutBranch: "master" }
    .then (repository) ->
      callback()

  prepareTemplateFolder: (externalCallback) ->
    async.series [
      (callback) =>
        if !@isTemplateReady()
          spinner = new Multispinner
            'git_download': __("pdf.download_template")

          @downloadTemplate ->
            spinner.success('git_download')
            callback()
        else
          callback()
      , (callback) =>
        @updateTemplate ->
          callback()
      , (callback) =>
        externalCallback()
        callback()
    ]
