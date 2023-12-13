// /date/
var date = new Date();
console.log(date);

//get date
var currentMonth = date.getMonth()
var currentDay = date.getDay()
var currentDate = date.getDate()
var currentYear = date.getFullYear()


console.log(currentDate)
console.log(currentMonth)
console.log(currentDay)
console.log(currentYear)

//array for months

var months = ["January",
"February",
"March",
"April",
"May",
"June",
"July",
"August",
"September",
"October",
"November",
"December"]

//put date in DOM

var title = document.getElementById("title");
title.innerHTML = months[currentMonth];

//update the cal

var habitTitle = document.getElementById("habitTitle");

habitTitle.onclick = function(){
   
    let habits = prompt("Add a task", habitTitle.innerHTML)

    if(habits.length == 0){
        habitTitle.innerHTML="Click to add a task";
    }else{
        habitTitle.innerHTML = habits;
    }

}
//total days issue


var daysInTheMonthList = [31,28,31,30,31,30,31,31,30,31,30,31]

var daysInThisMonth = daysInTheMonthList[currentMonth];

var daysCompleted = 0; 

var totalDays = document.getElementById("totalDays")
totalDays.innerHTML = "0/" + daysInThisMonth;



//set the caldendar days
var dayCount = 0;
var rowCount = 0; 
var days = document.getElementsByClassName("days")


for(var i = 0; i < days.length; i++ ){
    var day = days[rowCount].getElementsByClassName("day")
    for(var j=0; j < day.length; j++){
        if(dayCount == currentDate - 1){
            day[j].setAttribute("style", "border: 2px solid black")
            day[j].setAttribute("style", "color: rgb(233,1,144")
            
        }

        if(dayCount < daysInThisMonth){
            day[j].innerHTML = dayCount + 1;
            day[j].setAttribute("id","day" + (dayCount + 1));
            dayCount++;

        }else{
            day[j].innerHTML = "";
            day[j].setAttribute("style", "background-color:white")

        }
    }
    rowCount++;
}


//completed or not check
var completed = new Array(31);
for(let i = 0; i < dayCount; i++){
    var tempString = 
    "" + (currentMonth + 1) + "-" + (i + 1) + "-" + currentYear
    console.log("storing date: " + tempString)

    var tempDay = localStorage.getItem(tempString);
    console.log(tempDay);

    if(tempDay == null || tempDay == "false"){
        localStorage.setItem(tempString, "false");
    }else if( tempDay == "true"){
        daysCompleted++
    }
    totalDays.innerHTML = daysCompleted + "/" + daysInThisMonth
}
console.log("completed array" + completed)
console.log("total days completed" + daysCompleted)

for(let i = 0; i < currentDate; i++){
    var tempString = 
    "" + (currentMonth + 1) + "-" + (i + 1) + "-" + currentYear;
    console.log(tempString)

    var chosenDay = localStorage.getItem(tempString)

    console.log(i + 1 + ": " + chosenDay)
    var chosenDayDiv = document.getElementById("day" + (i + 1))
    if(chosenDay === "true"){
        chosenDayDiv.style.backgroundColor = "antiquewhite";

    }else if( chosenDay ==="false"){
        chosenDayDiv.style.backgroundColor = "white"
    }



}


//onclick listener for days

var dayDivs = document.querySelectorAll(".day")

for( let i = 0; i < currentDate; i ++ ){
   dayDivs [i].onclick = function(e){
    var num = e.target.innerText;

    var selectedDate = document.getElementById(e.target.id)
    var storageString = 
     "" + (currentMonth + 1) + "-" + num + "-" + currentYear;
    if(localStorage.getItem(storageString) === "false"){
        selectedDate.style.backgroundColor = "antiquewhite"
        localStorage.setItem(storageString, true)
        daysCompleted++
    }else if(localStorage.getItem(storageString) ==="true"){

        selectedDate.style.backgroundColor = "white"
        localStorage.setItem(storageString, false)
        daysCompleted--


    }
    totalDays.innerHTML = daysCompleted + "/" + dayCount;
    console.log(daysCompleted, currentDate)

    if(daysCompleted === currentDate){
        alert("keep it up!!")
    }




   } 

}
//input form for note

function showInputForm() {
    document.getElementById('inputForm').style.display = 'block';
  }
  function saveText() {
    const inputText = document.getElementById('textInput').value;
    if (inputText.trim() !== '') {
      const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
      existingNotes.push(inputText);
      localStorage.setItem('notes', JSON.stringify(existingNotes));
      displayStoredNotes();
      document.getElementById('inputForm').style.display = 'none';
    } else {
      alert('Please enter some text.');
    }
  }

  
  function displayStoredNotes() {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const displayArea = document.getElementById('displayArea');

   
    displayArea.innerHTML = '';

   
    storedNotes.forEach(note => {
      const noteElement = document.createElement('div');
      noteElement.textContent = `Note: ${note}`;
      displayArea.appendChild(noteElement);
    });
  }

  function clearNotes() {
    localStorage.removeItem('notes');
    displayStoredNotes(); // Update the display after clearing notes
  }

  
  document.getElementById('showFormButton').addEventListener('click', showInputForm);
  document.getElementById('saveButton').addEventListener('click', saveText);
  document.getElementById('clearNotesButton').addEventListener('click', clearNotes);



  displayStoredNotes();




//reset button

var resetButton = document.getElementById("resetButton")

resetButton.onclick = function (){

    for(let i = 0; i < dayCount ; i++){
    var tempString = "" + (currentMonth + 1) + "-" + (i + 1) + "-" + currentYear;
    console.log(tempString);
    localStorage.setItem(tempString, "false")
    var curDay = document.getElementById("day" + (i + 1));

    curDay.style.backgroundColor = "white";

    }

    daysCompleted = 0;
    totalDays.innerHTML = daysCompleted + "/" + daysInThisMonth


}