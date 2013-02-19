var myApp = angular.module('myApp', []);

myApp.factory('Data', function(){
   return {message:"I'm from a service!"}
});

myApp.factory('Data2', function(){
    return {message:"Data2 service!"}
});

myApp.factory('Browsers', function(){
    var Browsers = {};
    Browsers.list = [
        {
            name: "chrome",
            quality: "awesome"
        },
        {
            name: "firefox",
            quality: "aight"
        },
        {
            name: "safari",
            quality: "awesome"
        },
        {
            name: "ie",
            quality: "sucky"
        }

    ];
    return Browsers;
})

myApp.filter('reverse', function(){
   return function(text){
       return text.split("").reverse().join("");
   };
});

function BrowsersCtrl($scope, Browsers)
{
    $scope.browsers = Browsers;
}

function FirstCtrl($scope, Data){
    $scope.data = Data;
}

function SecondCtrl($scope, Data2){
    $scope.data = Data2;
}
