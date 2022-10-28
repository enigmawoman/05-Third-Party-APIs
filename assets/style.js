// logic flow
// on init page loads and current date and time are displayed in the header and the timeblocks display with a sytle according to the time of day
    // 
//need the following functions
// - generate timeslots within the JS code to display in the HTML, this will allow for the timeslots to be easily adjusted going forward
// - need to make sure the timeslots are refreshed to displayed th correct styling according to time of day
// - need to create a function in order to save data to the time slots, using a button 'onClick' feasture
// - need a function that will load saved tasks from local storage once the time slots have been generated.

var calendarHours = {
    dayStart: 9,
    dayEnd: 17,
};

let currentDay = function() {
    document.querySelector("#currentDay").innerHTML =`
    <h5>${moment().format('MMMM Do YYYY, h:mm:ss a')}</h5>`;
    //$("#currentDay").text(currentDay);
};

init();

function init() {

    var dayOfWeek = moment().format('dddd');
    $("#dow").text(' 📅 ' + dayOfWeek + ' 📅 ');
    clock();
    //can also add in the time poller beneath this to update the time slots - as per Jasons example
};

function clock() {
    currentDay();
    setInterval(currentDay, 1000);
};

function generateCalSlots() {

};

function loadSavedItems() {

};

function saveItem() {

};

function calRefresh() {

};

// add the getItems into the for loop for generating the calendar slots

//build the bootstrap styles in HTML and then use those stylings to then use in the dynamic styling in the ger