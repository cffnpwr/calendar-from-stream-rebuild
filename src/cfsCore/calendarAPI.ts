function getCalendarEvents(calendarId) {
    const res = Calendar.Events.list(calendarId, {
        'timeMin': new Date().toISOString(),
        'singleEvents': true,
        'orderBy': 'startTime'
    });
    const events = res.items;

    return events;
}

function updateEvent(calendarId, eventId, body) {
    Calendar.Events.patch(body, calendarId, eventId);
}

function deleteEvent(calendarId, eventId) {
    Calendar.Events.remove(calendarId, eventId);
}

function insertEvent(calendarId, body) {
    Calendar.Events.insert(body, calendarId);
}