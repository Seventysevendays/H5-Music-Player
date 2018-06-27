var gulp = require("gulp");
var imagemin = require("gulp-imagemin")//压缩图片
var htmlclean = require("gulp-htmlclean");//压缩HTML
var uglify = require("gulp-uglify");//压缩js
var stripDebug = require("gulp-strip-debug");//去除js调试语句
var concat = require("gulp-concat");//拼接js文件
var deporder = require("gulp-deporder");
var less = require("gulp-less");//less翻译成css
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");//css兼容
var cssnano = require("cssnano");//压缩css
var connect = require("gulp-connect");



var folder = {
    src : "src/",
    dist : "dist/"
}

var devMode = process.env.NODE_ENV !== "production";

//流操作 task running
gulp.task("html",function(){
    var page =  gulp.src(folder.src + "html/index.html")
                    .pipe(connect.reload());
    if(!devMode){
        page.pipe(htmlclean());
    }
    page.pipe(gulp.dest(folder.dist + "html/"))
})

gulp.task("images",function(){
    gulp.src(folder.src + "images/*")
        .pipe(imagemin())
        .pipe(gulp.dest(folder.dist+"images/"))
})
gulp.task("js",function(){
    var js = gulp.src(folder.src+"js/*")
            .pipe(connect.reload());
    if(!devMode){
        js.pipe(uglify())
        .pipe(stripDebug())
    }   
    js.pipe(gulp.dest(folder.dist+"js/"))
})
gulp.task("css",function(){
    var css = gulp.src(folder.src+"css/*")
                .pipe(connect.reload())
                .pipe(less());
    var options = [autoprefixer()];
    if(!devMode){
        options.push(cssnano())
    }
        
    css.pipe(postcss(options))
    .pipe(gulp.dest(folder.dist + "css/"))
})
gulp.task("watch",function(){
    gulp.watch(folder.src + "html/*",["html"]);
    gulp.watch(folder.src + "images/*",["images"]);
    gulp.watch(folder.src + "js/*",["js"]);
    gulp.watch(folder.src + "css/*",["css"]);
})
gulp.task("server",function(){
    connect.server({
        // host: "192.168.43.248",
        port: "8080",
        livereload : true
    });
})

gulp.task("default",["html","images","js","css","watch","server"]);