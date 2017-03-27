var gulp = require('gulp');
var gulpNconp = require('<%= userOptions.nconp %>');
var runSequence = require('run-sequence').use(gulp);
var option = {
	    base: 'src'
};
var dist = __dirname + '/dist';
var build = __dirname + '/build';

var nconpOption ={
	root:__dirname,
	base: 'src',
	download:'node',
	dist:'dist',
	build:'build',
	node:'v7.5.0',
	platform:'linux-x86'
}
var nconp = new gulpNconp(gulp,nconpOption);

gulp.task('default', function(cb) {
	runSequence('init','copy','pack',cb);
});

gulp.task('init', function(cb) {
	nconp.init(cb);
});

gulp.task('copy', function() {
	nconp.copy();
});

gulp.task('pack', function() {
	nconp.pack();
});

gulp.task('start', function(cb) {
	nconp.start(cb);
});




