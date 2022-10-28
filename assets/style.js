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
    dayEnd: 20,
};



var calendarGrid = $('.container');



let currentDay = function() {
    document.querySelector("#currentDay").innerHTML =`
    <h5>${moment().format('MMMM Do YYYY, HH:mm:ss a')}</h5>`;

};



init();


function init() {

    generateCalSlots();
    calRefresh();
    

    var dayOfWeek = moment().format('dddd');
    $("#dow").text(' 📅 ' + dayOfWeek + ' 📅 ');
    clock();

    setInterval(calRefresh, 10000);
    
   
};



function clock() {
    currentDay();
    setInterval(currentDay, 1000);
};



function generateCalSlots() {

    

    for (var hour = calendarHours.dayStart; hour <= calendarHours.dayEnd; hour++) {

        var loadSavedItems = localStorage.getItem(hour);

        var timeBlocks = $('<div>');
        timeBlocks.addClass('row mb-3 text center time-block');
        timeBlocks.attr('hour-slot', hour);
        calendarGrid.append(timeBlocks);

        var timeOfDay = $('<div>').addClass('col-lg-2 themed-grid-col hour');
        timeOfDay.text(moment(hour, 'h').format('HHmm'));
        timeBlocks.append(timeOfDay);

        var calBlock = $('<div>').addClass('col-lg-9 cal-block themed-grid-col');
        //calBlock.attr('hour-slot', hour);
        var calInput = $('<textarea>').addClass('col-12 description');
        timeBlocks.append(calBlock);
        calBlock.append(calInput);
        calInput.val(loadSavedItems);

        //how do i get the text in the button to align center vertical without changing the size of the button
        var saveBtn = $('<div>').addClass('col-lg-1 themed-grid-col btn btn-primary saveBtn');
        saveBtn.text('💾  SAVE').addClass('font-weight-bold text-center');
        timeBlocks.append(saveBtn);
        saveBtn.on("click", saveItem);

    }

    //need to add in a getItems from local storage
};



function saveItem(event) {

  event.preventDefault();
 console.log($(this).parent().attr('hour-slot'));
 // need two variables hour and task to save to LS
 var hour = $(this).parent().attr('hour-slot');

 
 var task = $(this).siblings( ".cal-block" ).children().val();

 localStorage.setItem(hour, task);




    // var saveInput = calInput.val();

    //      if (saveInput === '') {
    //          window.confirm("You must input text!");
    //      } else {
    //          localStorage.setItem("calInput");
    //      };

    

};



function calRefresh() {
    var currentTime = moment().hour();
   //console.log(currentTime);
    

      $('.time-block').each(function (index, element) {

              var hour = $(element).attr('hour-slot');
              //console.log(hour);

              //console.log($(this));

              if (hour < currentTime) {
                $(this).addClass('past');
               //$('.cal-block').addClass('past');
    //             //$('container').children().addClass('past');
    //             // $(element).find('cal-block').addClass('past');

            } else if (hour == currentTime) {    
                    $(this).addClass('present');
    //              //$(element).find('cal-block').addClass('present');

              } else {
                     $(this).addClass('future');
                
    //              //$(element).find('cal-block').addClass('future');
              }
         });
        
    //     }
        

    //   var currentTime = moment().hour();
    //   console.log(currentTime);

    //   for (var hour = calendarHours.dayStart; hour <= calendarHours.dayEnd; hour++) {

    //     console.log(hour);

    //                 if (hour < currentTime) {
    //                      $('.cal-block').addClass('past');
    //                     // $('.time-block').children(1).addClass('past');
    //                       //$(element).find('cal-block').addClass('past');
        
    //                   } else if (hour == currentTime) {
    //                      $('.cal-block').addClass('present');
    //                     // $('.time-block').children(1).addClass('present');
    //                      // $(element).find('cal-block').addClass('present');
        
    //                   } else {
    //                      $('.cal-block').addClass('future');
    //                     // $('.time-block').children(1).addClass('future');
    //                     //  $(element).find('cal-block').addClass('future');
    //                   }
    //   }
    }

// add the getItems into the for loop for generating the calendar slots

//build the bootstrap styles in HTML and then use those stylings to then use in the dynamic styling in the g