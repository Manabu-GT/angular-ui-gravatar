(function () {
  'use strict';

  angular.module('ui.gravatar', ['md5'])
    //gravatar default image size is 80px
    .constant('DEFAULT_IMG_SIZE', 80)
    .directive('uiGravatar', ['md5', 'DEFAULT_IMG_SIZE', function(md5, DEFAULT_IMG_SIZE) {
      return {
        restrict: 'E',
        template: '<img ng-src="{{baseUrl}}.gravatar.com/avatar/{{hash}}{{fileExt}}{{getParams}}"/>',
        replace: true,
        scope: {
          gravatarEmail: '=',
          gravatarOptions: '=?'
        },
        link: function(scope, element, attrs) {

          function setImgAttrSize(size) {
            attrs.$set('width', size);
            attrs.$set('height', size);
          }

          function generateParams() {
            var options = [];
            scope.getParams = '';
            angular.forEach(scope.options, function(value, key) {
              if(value) {
                options.push(key + '=' + encodeURIComponent(value));
              }
            });
            if(options.length > 0) {
              scope.getParams = '?' + options.join('&');
            }
          }

          setImgAttrSize(DEFAULT_IMG_SIZE);

          var fileTypeRegexp = /^jpg$|^jpeg$|^gif$|^png$/;
          var ratingRegexp = /^g$|^pg$|^r$|^x$/;

          scope.options = {};

          scope.$watch('gravatarEmail', function(email) {
            if(email) {
              scope.hash = md5(email.trim().toLowerCase());
            }
          });
          scope.$watch('gravatarOptions.secure', function(secure) {
            if(secure) {
              scope.baseUrl = 'https://secure';
            } else {
              scope.baseUrl = 'http://www';
            }
          });
          scope.$watch('gravatarOptions.fileType', function(fileType) {
            if(fileType && fileTypeRegexp.test(fileType)) {
              scope.fileExt = '.' + fileType;
            }
          });
          scope.$watch('gravatarOptions.size', function(size) {
            scope.options.s = (angular.isNumber(size) && size > 0) ? size : undefined;
            if(scope.options.s) {
              setImgAttrSize(scope.options.s);
            }
            generateParams();
          });
          scope.$watch('gravatarOptions.forceDefault', function(forceDefault) {
            scope.options.f = forceDefault ? 'y' : undefined;
            generateParams();
          });
          scope.$watch('gravatarOptions.defaultImage', function(defaultImage) {
            scope.options.d = defaultImage ? defaultImage : undefined;
            generateParams();
          });
          scope.$watch('gravatarOptions.rating', function(rating) {
            scope.options.r = ratingRegexp.test(rating) ? rating : undefined;
            generateParams();
          });
        }
      };
    }]);

}());