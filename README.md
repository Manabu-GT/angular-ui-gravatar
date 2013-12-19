
angular-ui-gravatar [![Build Status](https://travis-ci.org/Manabu-GT/angular-ui-gravatar.png?branch=master)](https://travis-ci.org/Manabu-GT/angular-ui-gravatar)
========================
An AngularJS Directive that takes an email address and several options and creates an image tag to show an avatar image
from the Gravatar site.

##Requirements

- [AngularJS] (http://angularjs.org/)

##Usage

You can install it from [Bower](http://bower.io/)

```
bower install angular-ui-gravatar
```

This will copy the angular-ui-gravatar files into a `bower_components` folder.
Load the script files in your application:

```html
<script type="text/javascript" src="bower_components/angular/angular.js"></script>
<script type="text/javascript" src="bower_components/angular-ui-gravatar/dist/angular-ui-gravatar.js"></script>
```

Add the ui.gravatar module as a dependency to your application module:

```javascript
var yourAppModule = angular.module('app', ['ui.gravatar']);
```

Finally, add the directive to your html:

```html
<body ng-controller="AppCtrl" >
  <ui-gravatar gravatar-email="email" gravatar-options="options"></ui-gravatar>
</body>
```

Note that `email` will be an email addreess associated with an avatar , and `options` will be optional object which can
be used to customize the behavior of the directive. (see [below](#options)).

## Options

```javascript
yourAppModule.controller('AppCtrl', ['$scope', function ($scope) {
    $scope.email = 'abc@example.com';
    $scope.options = {
        secure: true,
        size: 100,
        defaultImage: 'mm'
    };
  }]);
```

Short doc for all of the available attributes:

* `gravatar-email(required)` - You must supply an email address for the directive using the gravatar-email attribute.
* `gravatar-options(optional)` - Optional object to customize the behavior of the directive. Please see below for available properties.

    `secure`, set to `true` if you want to serve Gravatars via SSL.

    `fileType`, add a file-type extension to the URL. Choose from `jpg`, `jpeg`, `png`, or `gif`.

    `size`, set the size of the avatar image in pixels. The default is 80 pixels.

    `forceDefault`, set to `true` if you want to force the default image to always load.

    `defaultImage`, specify a default image to display if the email address does not have an associated avatar.

    `rating`, specify a rating to limit what avatars are displayed. Choose from `g`, `pg`, `r`, or `x`.

    For details, please also check out [Gravatar Image Requests](http://en.gravatar.com/site/implement/images/).

## Development

To build the directive yourself you need to have NodeJS version 0.8 or later. Then do the following:

```shell
$ npm install -g grunt-cli bower karma
$ npm install
$ bower install
$ grunt test
$ grunt release
```