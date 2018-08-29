const mix = require('laravel-mix');

mix.setPublicPath('public')
  .setResourceRoot('resources')
  .js('resources/js/index.js', 'js')
  .sass('resources/sass/index.scss', 'css', {precision: 8})
  .copy('resources/img/marker.png', 'public/img')
  .version('img');

