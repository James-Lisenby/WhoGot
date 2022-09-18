// It seems like event.js should handle interaction on the single event view.

let eventText;
let eventTitle;
let createNewEventBTN;
let deleteEventBTN;
let saveEventBTN;
let exportEventBTN;
let eventList;

if (window.location.pathname === '/events.js'){
    eventTitle = document.querySelector('.event-title');
    eventText = document.querySelector('.event-textarea');
    createNewEventBTN = document.querySelector('.create-new-event');
    deleteEventBTN = document.querySelector('.deleteEvent');
    saveEventBTN = document.querySelector('.saveEvent');
    exportEventBTN = document.querySelector('.exportEvent')
    eventList = document.querySelector('.list-container, list-group');
}

//const show = (elem) => {
    //elem.style.display = 'inline';
//};

//const hide = (elem) => {
  //  elem.style.display = 'none';
//};

let activeEvent = {};

const getEvents = () => 
fetch('/api/events', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
});

const createNewEvent = () =>
fetch('/api/events', {
    method: 'CREATE',
    headers: {
        'Content-Type': 'application/json',
    },
});

const deleteEvent = () =>
fetch('/api/events', {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    }, 
});

const saveEvent = () =>
fetch('/api/events', {
    method: 'SAVE',
    headers: {
        'Content-Type': 'application/json',
    },
});

const exportEvent = () => 
fetch('/api/events', {
    method: 'EXPORT',
    headers: {
        'Content-Type': 'application/json',
    },
});

//const renderActiveEvent = () => {
  //  hide(saveEventBTN);

  //  if (activeEvent.id) {
    //    eventTitle.setAttribute('readonly', true);
    //    eventText.setAttribute('readonly', true);
    //    eventTitle.value = activeEvent.title;
    //    eventText.value = activeEvent.text
  //  } else {
    //    eventTitle.removeAttribute('readonly');
   //     eventText.removeAttribute('readonly');
  //      eventTitle.value = '';
   //     eventText.value = '';
   // }
//};

const handleEventSave = () => {
    const createNewEvent = {
        title: eventTitle.value,
        text: eventText.value
    };
    saveEvent(createNewEvent).then(() => {
        getAndRenderEvents();
        renderActiveEvent();
    });
};

// Delete the clicked event
const handleEventDelete = (e) => {
    e.stopPropagation ();

    const event = e.target;
    const eventId = JSON.parse(event.parentElement.getAttribute('data-event')).id;

    if (activeEvent.id === eventId) {
        activeEvent = {};
    }

    deleteEvent(eventId).then(() => {
        getAndRenderEvents();
        renderActiveEvent();
    });
};

const handleNewEventView = (e) => {
    e.preventDefault();
    activeEvent = JSON.parse(e.target.parentElement.getAttribute('data-event'));
    renderActiveEvent()
};

const handleRenderSaveBtn = () => {
    if (!eventTitle.value.trim() || !eventText.value.trim()) {
        hide(saveEventBTN);
    } else {
        show(saveEventBTN);
    }
};

const renderEventList = async (events) => {
    let jsonEvents = await events.json();
    if (window.location.pathname === '/events') {
        eventList.forEach((el) => (el.innerHTML = ''));
    }

    let eventListItems = [];

    const createLi = (text, delBtn = true) => {
        const liEl = document.createElement('li');
        liEl.classList.add('list-group-item');

        const spanEl = document.createElement('span');
        spanEl.classList.add('list-item-title');
        spanEl.innerText = text;
        spanEl.addEventListener('click', handleNewEventView);

        liEl.append(spanEl);

        //const $exportEvent = $("<input>");
        //const $url = $(location.attr('href'))


         //$('.exportEvent').on ('click', funtion() {
           // $("body").append($exportEvent);
            //$exportEvent.val($url).select();
             //document.execCommand("copy");
            //$exportEvent.remove();
           // $("p").text("URL copied")
        //})

        // eventField

        // if / when no text is entered, 
        // don't allow any buttons to be clicked
        // show a message asking for the text to be entered  
        // final thoughts 
        // else {
            // do proceed if when text is entered
        //                                        }
         

    


        if (delBtn) {
            const delBtnEl = document.createElement('i');
            delBtnEl.classList.add(
                'fas',
                'fa-trash-alt',
                'float-right',
                'text-danger',
                'delete-event'       
            );

            delBtnEl.addEventListener('click', handleEventDelete);
            
            liEl.append(delBtnEl)
        }

        return liEl
    };

    if (jsonEvents.length === 0) {
        eventListItems.push(createLi('No saved events', false));    
    }

    jsonEvents.forEach((events) => {
        const li = createLi(events.title);
        li.dataset.event = JSON.stringify(events);

        eventListItems.push(li);

    }); 

    if (window.location.pathname === '/events'){
        eventListItems.forEach((events) => eventList[0].append(events)); 
    }

};

const getAndRenderEvents = () => getEvents().then(renderEventList);

if (window.location.pathname === '/events') {
    saveEventBTN.addEventListener('click', handleEventSave);
    createNewEventBTN.addEventListener('click', handleNewEventView);
    eventTitle.addEventListener('keyup', handleRenderSaveBtn);
    eventText.addEventListener('keyup', handleRenderSaveBtn);
}

getAndRenderEvents();