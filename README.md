# bootstrap-video

A custom video player for Bootstrap using buttons and panels, designed to behave like regular Bootstrap video.

## Demo and Documentation

See a Bootstrap 3 example [here](http://mklocek.github.io/bootstrap-video).

## Usage

Create your `<video>` with the `.bootstrap-video` class.
```html
<video class="bootstrap-video">
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
  Your browser does not support the video tag.
</video>
```

Also you can use JavaScript to create video players:
```js
// To style only <video>s with the .bootstrap-video class
$('.bootstrap-video').bootstrapVideo();
```
Or
```js
// To style all <video>s
$('video').bootstrapVideo();
```

## Bugs and feature requests

Anyone and everyone is welcome to contribute.

## Copyright and license

Copyright (C) 2015 bootstrap-video

Licensed under [the MIT license](LICENSE).
