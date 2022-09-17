
// NOTHING ON THIS PAGE HAS BEEN CHANGED TO FIT OUR PROJECT.

// Stores data from form input elements

// JSON.stringifys the data

// Sends POST req with json formatted data

// listens for 200 status response

const addFoodFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#food-name-add-food').value.trim();
    const quantity = document.querySelector('#quantity-add-food').value.trim();
  
    if (name && quantity) {
      const response = await fetch('/api/fooditem', {
        method: 'POST',
        body: JSON.stringify({ name, quantity }),
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
    .querySelector('.add-food-form')
    .addEventListener('submit', addFoodFormHandler);

    // NOTHING ON THIS PAGE HAS BEEN CHANGED TO FIT OUR PROJECT. 