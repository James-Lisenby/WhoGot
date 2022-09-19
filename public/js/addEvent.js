// Stores data from form input elements

// JSON.stringifys the data

// Sends POST req with json formatted data

const addEventFormHandler = async (event) => {
    event.preventDefault();
    debugger;

    // created newEvent objects

    // objects created

    // new constrants 

  
const name = document.quereySelector('#event_name').value.trim();
const place = document.quereySelector('#event_location').value.trim();
let time = document.quereySelector('#event_time').value.trim();
let date = document.quereySelector('#event_date').value.trim();

//concotinate date and time to match sql datetime format
time = `${date} ${time}:00`;

console.log(`new sql datetime = '${time}'`);
    
  // tests if fields are not null
    if (name && time && place) {
      const response = await fetch('/api/new-event', {
        method: 'POST',
        body: JSON.stringify({ name, time, place }),
        headers: { 'Content-Type': 'application/json' },
      });

      console.log(response);
      debugger;

  
      if (response.ok) {
        debugger;

        //this could be problematic. Make sure there is an event_id property in the response. it may need to be response.createdEvent.id
        document.location.replace(`'/event/${response.id}'`);
      } else {
        debugger;

        alert('Failed to create new event.');
      }
    }
  };
  
  document
  // new forms and eventhandlers
    .querySelector('#add-event-form')
    .addEventListener('submit', addEventFormHandler); 