var config = {
  apiKey: "AIzaSyA0RO7oVlPqjI9bn5gSb9i92LE_eUQEQRQ",
    authDomain: "my-project-d62d6.firebaseapp.com",
    databaseURL: "https://my-project-d62d6.firebaseio.com",
    projectId: "my-project-d62d6",
    storageBucket: "my-project-d62d6.appspot.com",
    messagingSenderId: "940915317226"
};

// Create Variables that will be used With Moment to Calculate the Next Train Arrival Time and Minutes Away

var nextTrain = '';
var nextTrainFormatted = '';
var minutesAway = '';
var firstTimeConverted = '';
var currentTime = '';
var diffTime = '';
var tRemainder = '';
var minutesTillTrain = '';
var frequency = '';



firebase.initializeApp(config);
var database = firebase.database();
// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var startTime = moment($("#start-time-input").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequency-input").val().trim();

  firstTimeConverted = moment(startTime, "hh:mm").subtract(1, "years");
  currentTime = moment();
  diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  tRemainder = diffTime % +frequency;
  minutesTillTrain = +frequency - tRemainder;
  nextTrain = moment().add(minutesTillTrain, "minutes").format("hh:mm");
  //nextTrainFormatted = moment(nextTrain).format("hh:mm");
  
  // console.log(typeof frequency);
  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: destination,
    startTime: startTime,
    frequency: frequency,
    nextTrain: nextTrain,
    minutesTillTrain: minutesTillTrain
  };
  // Uploads train data to the database
  database.ref().push(newTrain);
  // Logs everything to console
  // console.log(newTrain.name);
  // console.log(newTrain.destination);
  // console.log(newTrain.startTime);
  // console.log(newTrain.frequency); 
  // console.log(newTrain.nextTrain);
  // console.log(newTrain.minutesTillTrain);
  // Alert
  // alert("Train successfully added");
  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-time-input").val("");
  $("#frequency-input").val("");
});
// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
  // Store everything into a variable.
  var newRow = {
    trainsName:childSnapshot.val().name,
    trainsDestination:childSnapshot.val().destination,
    firstTime:childSnapshot.val().startTime,
    trainsFrequency:childSnapshot.val().frequency,
    trainsNextTrain:childSnapshot.val().nextTrain,
    trainsMinutesTillTrain:childSnapshot.val().minutesTillTrain
  };
  // Employee Info
  // console.log(newRow.trainsName);
  // console.log(newRow.trainsDestination);
  // console.log(newRow.firstTime);
  // console.log(newRow.trainsFrequency);
// invoke the function to make a new row
  makeTrainRow (newRow);
  

// Definition of Function for creating new Train Table Row.
});
function makeTrainRow (row) {
  console.log(row);
  $("#train-table > tbody").append("<tr><td>" + row.trainsName + "</td><td>" + row.trainsDestination + "</td><td>" +
  row.trainsFrequency + "</td><td>" + row.trainsNextTrain + "</td><td>" + row.trainsMinutesTillTrain + "</td><td>");

  };
// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016
// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case