'use strict';

describe('Directive: uiGravatar', function() {

  // load the directive's module
  beforeEach(module('ui.gravatar'));

  var element, $scope, $compile;

  beforeEach(inject(function(_$rootScope_, _$compile_) {
    $scope = _$rootScope_.$new();
    $compile = _$compile_;
    $scope.email = 'bob@example.com';
    $scope.options = {};
  }));

  describe('tests without options', function() {
    beforeEach(function() {
      element = $compile('<ui-gravatar gravatar-email="email"></ui-gravatar>')($scope);
    });
    it('should create an img tag with a valid gravatar url', function() {
      element = $compile('<ui-gravatar gravatar-email="email"></ui-gravatar>')($scope);
      $scope.$digest();
      expect(element.attr('src')).toBe('http://www.gravatar.com/avatar/4b9bb80620f03eb3719e0a061c14283d');
    });
    it('should set width and height of an img tag to 80', inject(function(DEFAULT_IMG_SIZE) {
      element = $compile('<ui-gravatar email="email"></ui-gravatar>')($scope);
      $scope.$digest();
      expect(element.attr('width')).toBe(String(DEFAULT_IMG_SIZE));
      expect(element.attr('height')).toBe(String(DEFAULT_IMG_SIZE));
    }));
  });

  describe('tests with options', function() {
    beforeEach(function() {
      element = $compile('<ui-gravatar gravatar-email="email" gravatar-options="options"></ui-gravatar>')($scope);
    });
    it('should append a file-type extension if a valid fileType is set ', function() {
      $scope.options.fileType = 'png';
      $scope.$digest();
      expect(element.attr('src')).toBe('http://www.gravatar.com/avatar/4b9bb80620f03eb3719e0a061c14283d.png');
    });
    it('should not append a file-type extension if an invalid fileType is set ', function() {
      $scope.options.fileType = 'jpega';
      $scope.$digest();
      expect(element.attr('src')).toBe('http://www.gravatar.com/avatar/4b9bb80620f03eb3719e0a061c14283d');
    });
    it('should create an img tag with a valid secure gravatar url if secure is set to true', function() {
      $scope.options.secure = true;
      $scope.$digest();
      expect(element.attr('src')).toBe('https://secure.gravatar.com/avatar/4b9bb80620f03eb3719e0a061c14283d');
    });
    it('should append an s GET parameter and set width and height of an img tag with given value if size is set', function () {
      $scope.options.size = 200;
      $scope.$digest();
      expect(element.attr('src')).toBe('http://www.gravatar.com/avatar/4b9bb80620f03eb3719e0a061c14283d?s=200');
      expect(element.attr('width')).toBe('200');
      expect(element.attr('height')).toBe('200');
    });
    it('should append a d GET parameter if default is set', function () {
      $scope.options.defaultImage = 'identicon';
      $scope.$digest();
      expect(element.attr('src')).toBe('http://www.gravatar.com/avatar/4b9bb80620f03eb3719e0a061c14283d?d=identicon');
    });
    it('should append a f=y GET parameter if force-default is set to true', function() {
      $scope.options.forceDefault = true;
      $scope.$digest();
      expect(element.attr('src')).toBe('http://www.gravatar.com/avatar/4b9bb80620f03eb3719e0a061c14283d?f=y');
    });
    it('should append a r=pg GET parameter if rating is set to pg', function() {
      $scope.options.rating = 'pg';
      $scope.$digest();
      expect(element.attr('src')).toBe('http://www.gravatar.com/avatar/4b9bb80620f03eb3719e0a061c14283d?r=pg');
    });
    it('should not append a r=da GET parameter if rating is set to da coz it is invalid', function() {
      $scope.options.rating = 'da';
      $scope.$digest();
      expect(element.attr('src')).toBe('http://www.gravatar.com/avatar/4b9bb80620f03eb3719e0a061c14283d');
    });
    it('should work with combinations of options', function () {
      $scope.options.size = 200;
      $scope.options.defaultImage = 'monsterid';
      $scope.options.forceDefault = true;
      $scope.$digest();
      expect(element.attr('src')).toContain('http://www.gravatar.com/avatar/4b9bb80620f03eb3719e0a061c14283d?');
      expect(element.attr('src')).toContain('f=y');
      expect(element.attr('src')).toContain('d=monsterid');
      expect(element.attr('src')).toContain('s=200');

      $scope.options.secure = true;
      $scope.options.size = 100;
      $scope.options.defaultImage = 'mm';
      $scope.options.forceDefault = false;
      $scope.options.rating = 'x';
      $scope.$digest();
      expect(element.attr('src')).toContain('https://secure.gravatar.com/avatar/4b9bb80620f03eb3719e0a061c14283d?');
      expect(element.attr('src')).not.toContain('f=y');
      expect(element.attr('src')).toContain('d=mm');
      expect(element.attr('src')).toContain('s=100');
      expect(element.attr('src')).toContain('r=x');
    });
  });
});