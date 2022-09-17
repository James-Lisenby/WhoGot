
// NOTHING ON THIS PAGE HAS BEEN CHANGED TO FIT OUR PROJECT.

// Stores data from form input elements

// JSON.stringifys the data

// Sends POST req with json formatted data

// listens for 200 status response

const addeventFormHandler = async (event) => {
    event.preventDefault();

    // created newEvent objects

    // objects created

    // new constrants 

  
    const newEvent = {

       name: document.quereySelector('#event_name').value.trim(),
       place: document.quereySelector('#event_location').value.trim(),
       time: document.quereySelector('#event_time').value.trim(),
       date: document.quereySelector('#event_date').value.trim(),
       username: document.quereySelector('#event_host').value.trim(),
       itemName: document.quereySelector('#event_item').value.trim(),
    };

   

    
  // created a new function to sort the ids
    if (newEvent.name && newEvent.place && newEvent.time && newEvent.date && newEvent.username && newEvent.itemName) {
      // new api
      const response = await fetch('/api/new-event', {
        method: 'POST',
        // new const
        body: JSON.stringify({ newEventname }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to log in.');
      }
    }
  };
  
  document
  // new forms and eventhandlers
    .querySelector('.add-event-form')
    .addEventListener('submit', addEventFormHandler);

    // NOTHING ON THIS PAGE HAS BEEN CHANGED TO FIT OUR PROJECT. 