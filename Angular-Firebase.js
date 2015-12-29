/// <reference path="../bower_components/angular/angular.min.js" />
/// <reference path="../bower_components/angularfire/dist/angularfire.js" />
/// <reference path="../bower_components/firebase/firebase.js" />
/// <reference path="../bower_components/Watch.JS/examples/js/watch.js" />
var angularfiredemo = angular.module('angularfiredemo', ["firebase"])
    .controller('indexController', function ($scope, $firebaseObject) {
        $scope.targetObject = null;
        (function () {

            $scope.targetObject = {
                person: {
                    name: 'gd'
                }
            }

            watch($scope.targetObject, function () {
                alert("some attribute changes!");
            });

            

        })();


        $scope.firebaseref = new Firebase("https://secondconnect.firebaseio.com/");
        $scope.rows = [];
        //Approch-1 Automatic Binding
        //var syncObject = $firebaseObject($scope.firebaseref);
        //syncObject.$bindTo($scope, 'item');

        //Approch-2 REST API like Fetch data
        $scope.onconnectwithfirebase = function () {
            $firebaseObject($scope.firebaseref).$loaded().then(function (result) {
                debugger;
                //console.log(result.gg);
                //$scope.rows = result.sampleArray;
            });
        };

        $scope.onsavedata = function () {
            //$firebaseObject($scope.firebaseref).$save();
            var ref = new Firebase("https://secondconnect.firebaseio.com/persons/items");
            var newnode = ref.child('gdata');
            var newfbobject = $firebaseObject(newnode);

            //Remove entire node
            //newfbobject.$remove().then(function () {
            //    alert('done with remove');
            //});

            //Add new node
            newfbobject.firstName = "mantra";
            newfbobject.$save().then(function () {
                alert('pls Check it');
            });
        }


        $scope.onapplywatch = function () {
            $scope.targetObject.person.name = "mantra";
        }

    });