let createNewEventBTN;
let deleteEventBTN;
let saveEventBTN;
let exportEventBTN;

if (window.location.pathname === '/events.js'){
    createNewEventBTN = document.querySelector('.create-new-event');
    deleteEventBTN = document.querySelector('.deleteEvent');
    saveEventBTN = document.querySelector('.saveEvent');
    exportEventBTN = document.querySelector('.exportEvent')
}

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

const renderActiveEvent = () => {
    hide(saveEventBTN);

    if (activeEvent.id) {
        eventTitle.setAttribute('readonly', true);
        eventText.setAttribute('readonly', true);
        eventTitle.value = activeEvent.title;
        eventText.value = activeEvent.text
    } else {
        eventTitle.removeAttribute('readonly');
        eventText.removeAttribute('readonly');
        eventTitle.value = '';
        eventText.value = '';
    }
};

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
    if (window.location.pathname = '/events') {
        eventList.forEach((el) => (el.innerHTML = ''));
    }

    let eventListItems = [];

    const createLi = (text, delBtn = true) => {
        const liEl = document.createElement('li');
        liEl.classList.add('list-group-item');

        const spaEl = document.createElement('span');
        spanEl.classList.add('list-item-title');
        spanEl.innerText = text;
        spanEl.addEventListener('click', handleNewEventView);

        liEl.append(spanEl);

        if (delBtn) {
            const delBtnEl = document.createElement('i');
            delBtnEl.classList.add(
                //placeholder
                //placeholder
                //placeholder
                //placeholder

            );

            delBtnEl.addEventListener('click', handleEventDelete);
            
            liEl.append(delBtnEl)
        }

        return liEl
    };

    if (jsonEvents.lenght === 0) {
        eventListItems.push(createLi('No saved events', false));    
    }

    jsonEvents.forEach((events) => {
        const li = createli(events.title);
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