'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
module.exports = generators.extend({
    initializing: function () {    
    },

    prompting: function () {  
        var done = this.async(); 

        this.log(yosay('欢迎使用 ' + chalk.red('nconp') + ' 生成器'
        ));
        this.name = path.basename(process.cwd());
        this.license = 'MIT';
        this.description = '';
        this.author = '';
		this.nconp = 'gulp-nconp';
		this.npm = 'npm';
        var prompts = [
            {
                type: 'input',
                name: 'name',
                message: '应用名称:', default: this.name
            },
            {
                type: 'input',
                name: 'description',
                message: '应用描述:', default: this.description
            },
            {
                type: 'input',
                name: 'repo',
                message: 'git repository:', default: this.repo
            },
            {
                type: 'input',
                name: 'license',
                message: 'license:', default: this.license
            },
            {
                type: 'input',
                name: 'author',
                message: 'author:', default: this.author
            },
            {
                type: 'input',
                name: 'npm',
                message: 'npm:', default: this.npm
            },
            {
                type: 'input',
                name: 'nconp',
                message: 'gulp-nconp:', default: this.nconp
            }

        ];
		
		return this.prompt(prompts).then((options)=>{
			this.userOptions = options;
			done();  
		});
    },

    writing:  function () {
			//this.fs.copy(this.templatePath('_gulpfile.js'),this.destinationPath('gulpfile.js'));
        	this.fs.copyTpl(
				this.templatePath(this.templatePath('_gulpfile.js')),
				this.destinationPath(this.destinationPath('gulpfile.js')),
				{ userOptions: this.userOptions });
			this.fs.copyTpl(
				this.templatePath(this.templatePath('_package.json')),
				this.destinationPath(this.destinationPath('package.json')),
				{ userOptions: this.userOptions });
			
    },

    install: function () {
        var done = this.async();
        this.spawnCommand(this.userOptions.npm, ['install'])  //安装项目依赖
            .on('exit', function (code) {
                if (code) {
                    done(new Error('code:' + code));
                } else {
                    done();
                }
            })
            .on('error', done);
    },
    end: function () {
    }
});
