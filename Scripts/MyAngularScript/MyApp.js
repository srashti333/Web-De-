/// <reference path="../angular-route.min.js" />
/// <reference path="../angular.min.js" />


var app = angular.module("myApp", ['ngSanitize', 'ngRoute', 'ngPatternRestrict', 'ui.bootstrap']);

app.config(function($routeProvider) {


    $routeProvider.when('/test1', {
        templateUrl: '/Home/Index',
        controller: 'homeIndexCntrl'
    })
    //.when('/test2', {
    //    templateUrl: 'EmployeeGenerateForm.cshtml',
    //    controller: 'HomeCtrl'
    //})

    //.when('/test3', {
    //    templateUrl: 'test3.html',
    //    controller: 'ngtemplatectrl'
    //}).
    //    otherwise({
    //        redirectTo: '/test2'
    //    });
})
app.directive('ddTextCollapse', ['$compile', function($compile) {


    return {
        restrict: 'A',
        scope: true,
        link: function(scope, element, attrs) {


            /* start collapsed */
            scope.collapsed = false;


            /* create the function to toggle the collapse */
            scope.toggle = function() {
                scope.collapsed = !scope.collapsed;
            };


            /* wait for changes on the text */
            attrs.$observe('ddTextCollapseText', function(text) {


                /* get the length from the attributes */
                var maxLength = scope.$eval(attrs.ddTextCollapseMaxLength);


                if (text.length > maxLength) {
                    /* split the text in two parts, the first always showing */
                    var firstPart = String(text).substring(0, maxLength);
                    var secondPart = String(text).substring(maxLength, text.length);


                    /* create some new html elements to hold the separate info */
                    var firstSpan = $compile('<span>' + firstPart + '</span>')(scope);
                    var secondSpan = $compile('<span ng-if="collapsed">' + secondPart + '</span>')(scope);
                    var moreIndicatorSpan = $compile('<span ng-if="!collapsed">... </span>')(scope);
                    var lineBreak = $compile('<br ng-if="collapsed">')(scope);
                    var toggleButton = $compile('<span class="collapse-text-toggle" ng-click="toggle()">{{collapsed ? "Less" : "Read more"}}</span>')(scope);


                    element.empty();
                    element.append(firstSpan);
                    element.append(secondSpan);
                    element.append(moreIndicatorSpan);
                    element.append(lineBreak);
                    element.append(toggleButton);
                } else {
                    element.empty();
                    element.append(text);
                }
            });
        }
    };
}]);
app.controller('ngtemplatectrl', function($scope) {

    $scope.text = 'Hello';

});