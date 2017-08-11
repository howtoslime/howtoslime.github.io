// Tala om att det är en Angular-app med firebase
var app = angular.module("app", ["firebase"]);

// Rätt inställning för att Firebase ska fungera. Varje Firebase-konto har olika inställningar
// så se till att lägga dina egna här!
  var config = {
    apiKey: "AIzaSyC912R6zrcdWm6bUwgQ0v4Ux4D24swWwG0",
    authDomain: "hemsida-ff4b0.firebaseapp.com",
    databaseURL: "https://hemsida-ff4b0.firebaseio.com",
    projectId: "hemsida-ff4b0",
    storageBucket: "hemsida-ff4b0.appspot.com",
    messagingSenderId: "762867436891"
  };
  firebase.initializeApp(config);

// Vi skapar en kommentarer-fabrik som hämtar blogg-inlägg från firebase
app.factory("kommentarer", function($firebaseArray) {
    // skapa en referens till var i databasen kommentarerna finns
    var ref = firebase.database().ref().child("kommentarer");
    return $firebaseArray(ref);
  }
);

// Här i "controllern" så kan vi bestämma vad som ska hända med vår HTML
app.controller("KommentarCtrl", function($scope, kommentarer) {
    // Vi gör så att vi kan komma åt inläggen i kommentarer-fabriken med ng-model
    $scope.kommentarer = kommentarer;

    $scope.kommentar = {
        text: "",
        skribent: ""
    };
    // Vi skapar en funktion som vi kan köra i ng-submit för att skicka kommentaren till databasen
    $scope.addComment = function() {
        // Här lägger vi till vårt inlägg ($scope.kommentar) till listan med inlägg.
        // Det sparas automatiskt i Firebase-databasen.
        $scope.kommentarer.$add($scope.kommentar);

        // Tömmer texten i textfälten
        $scope.kommentar = {
            text: "",
            skribent: ""
        };
    };
  }
);