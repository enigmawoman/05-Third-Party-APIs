// logic flow
// on init page loads and current date and time are displayed in the header and the timeblocks display with a sytle according to the time of day and the calendar brings in any stored events from local storage
    
// need the following functions
// - generate timeslots within the JS code to display in the HTML, this will allow for the timeslots to be easily adjusted going forward
// - need to make sure the timeslots are refreshed to display the correct styling according to time of day and load in 
// - need to create a function in order to save data to the time slots, using a button 'onClick' feasture
// - need a function that will load saved tasks from local storage once the time slots have been generated.


// defining the hours to be included within the calendar into a variable
var calendarHours = {
    dayStart: 9,
    dayEnd: 17,
};


// setting a variable to define the parent div in the HTML that the calendar code will be a child of
var calendarGrid = $('.container');


// setting a variable and a function to write the time to the calendar using moment.js
let currentDay = function() {
    document.querySelector("#currentDay").innerHTML =`
    <h5>${moment().format('MMMM Do YYYY, HH:mm:ss a')}</h5>`;

};


// calling the init function
init();

// the init function, this will run on page load and refresh and will refresh every 10secs
function init() {
    //calling the function to generate the calendar slots
    generateCalSlots();
    // calling the function to refresh the calendar
    calRefresh();
    
    // setting a variable to display the day of the week and calling the clockfunction
    var dayOfWeek = moment().format('dddd');
    $("#dow").text(' 📅 ' + dayOfWeek + ' 📅 ');
    clock();
    //refreshing the calendar every 10secs
    setInterval(calRefresh, 10000);
    
   
};


// this function calls the current day function and sets an interval to refresh the moment.js every 1sec, so that the secs on the clock display as running
function clock() {
    currentDay();
    setInterval(currentDay, 1000);
};


// this function defines how the calendar slots will generate
function generateCalSlots() {

    // setting a for loop that will generate a calendar slot for each timeblock(hour) set in the var calendar hours

    for (var hour = calendarHours.dayStart; hour <= calendarHours.dayEnd; hour++) {

        //pulling in saved calendar items from local storage
        var loadSavedItems = localStorage.getItem(hour);

        // this variable is creating the outer div for each timeblock(hour) of the day
        var timeBlocks = $('<div>');
        // using bootstrap tp define the styling for the block and adding classes
        timeBlocks.addClass('row mb-3 text center time-block');
        // giving this var an attribute of 'hour-slot' and attaching the timeblock hour to it
        timeBlocks.attr('hour-slot', hour);
        // appending this variable to the parent div calendarGrid (.container)
        calendarGrid.append(timeBlocks);

        // creating a div for the time of day to sit in on the LHS and adding the bootstrap styling to it
        var timeOfDay = $('<div>').addClass('col-lg-2 d-inline p-2 hour');
        // writing the time to the newly created div, using JS moment to write the time in hh:mm format
        timeOfDay.text(moment(hour, 'h').format('HHmm'));
        // this will var will be a child of the parent div 'timeBlocks'
        timeBlocks.append(timeOfDay);

        // creating an outer div for the 'task part of the calendar', using bootstrap to style
        var calBlock = $('<div>').addClass('col-lg-9 cal-block themed-grid-col');

        // creating an inner div and adding a textarea box, so that users can type in the task they wish to add to the hour
        var calInput = $('<textarea>').addClass('col-lg-12 description');
        
        // calBlock will be a child of the parent div'timeBlocks'
        timeBlocks.append(calBlock);

        // calInput will be a child of the parent div 'calBlock'
        calBlock.append(calInput);
        // this will write the value of the loadSavedItems variable to the calInput text area on generation, if there is something saved in local storage for that hour 
        calInput.val(loadSavedItems);

       

        //creating a div in which to create a save button using the bootstrap syntax
        var saveBtn = $('<div>').addClass('col-lg-1 themed-grid-col btn btn-primary saveBtn');
        // writing the following into the new div using bootstrap styling
        saveBtn.text('💾  SAVE').addClass('font-weight-bold text-center');
        // saveBtn will be a child of the parent 'timeBlocks'
        timeBlocks.append(saveBtn);
        // on mouse click of the save button, the saveItem function will run
        saveBtn.on("click", saveItem);

    }
};


// this function will execute when the save button is click with a mouse, and will save the text written into the textarea(calInput)
function saveItem(event) {
    // running prevent default to make sure the text area doesnt clear when the button is clicked
  event.preventDefault();

  //console logging to check the hour slot is being called
 console.log($(this).parent().attr('hour-slot'));
 //console logging to check the value of the calInput is being called
 console.log($(this).siblings( ".cal-block" ).children().val());

 // as we know from the console log we can see the hour slot and value of the calInput, so we can set them as variables
 var hour = $(this).parent().attr('hour-slot');

 var task = $(this).siblings( ".cal-block" ).children().val();

 // now we can take these two variables and add them to local storage as a key, value pair
 localStorage.setItem(hour, task);

};

// this function will refresh the calendar to update the colour coding depending on the current time
function calRefresh() {
    //setting a var to pull in the current time, the hour in this case, using moment.js
    var currentTime = moment().hour();
    
    // for each cal-block created, the following function will run
      $('.cal-block').each(function (index, element) {
            
            // setting a var to get the hour written to the attribute 'hour-slot'
              var hour = $(element).parent().attr('hour-slot');
              // checking to see hours are being pulled in for each time block
              console.log(hour);

            // by console logging 'this', we can check for each timeblock in the loop, that the correct class is being attributed to the time block.
              console.log($(this));

              // so if the current hour is greater than the timeblock hour, then the class past will be attributed
              if (hour < currentTime) {
                $(this).addClass('past');
              
            // so if the current hour equals the timeblock hour, then the class present will be attributed
            } else if (hour == currentTime) {    
                    $(this).addClass('present');
  
                // so if the current hour is less than the timeblock hour, then the class future will be attributed
              } else {
                     $(this).addClass('future');
              }
         });
        
    };




