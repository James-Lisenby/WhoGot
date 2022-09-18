
// NOTHING ON THIS PAGE HAS BEEN CHANGED TO FIT OUR PROJECT.

// Stores data from form input elements

// JSON.stringifys the data

// Sends POST req with json formatted data

const addeventFormHandler = async (event) => {
    event.preventDefault();

    // created newEvent objects

    // objects created

    // new constrants 

  
const name = document.quereySelector('#event_name').value.trim();
const place = document.quereySelector('#event_location').value.trim();
let time = document.quereySelector('#event_time').value.trim();
const date = document.quereySelector('#event_date').value.trim();

//concotinate date and time to match sql datetime format
time = `${date} ${time}:00`;

console.log(`datetime = ${time}`);
    
  // created a new function to sort the ids
    if (name && time && place) {
      // new api
      const response = await fetch('/api/new-event', {
        method: 'POST',
        // new const
        body: JSON.stringify({ name, time, place }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        //this could be problematic. Make sure there is an event_id property in the response.
        document.location.redirect(`'/event/${response.event_id}'`);
      } else {
        alert('Failed to create new event.');
      }
    }
  };
  
  document
  // new forms and eventhandlers
    .querySelector('.add-event-form')
    .addEventListener('submit', addEventFormHandler);

    // NOTHING ON THIS PAGE HAS BEEN CHANGED TO FIT OUR PROJECT. 