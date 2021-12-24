// Compiled using calendar-from-stream-rebuild 1.0.0 (TypeScript 4.5.4)
var exports = exports || {};
var module = module || { exports: exports };
exports.insertEvent = exports.deleteEvent = exports.updateEvent = exports.getCalendarEvents = void 0;
function getCalendarEvents(calendarId) {
    const res = Calendar.Events.list(calendarId, {
        'timeMin': new Date().toISOString(),
        'singleEvents': true,
        'orderBy': 'startTime'
    });
    const events = res.items;
    return events;
}
exports.getCalendarEvents = getCalendarEvents;
function updateEvent(calendarId, eventId, body) {
    Calendar.Events.patch(body, calendarId, eventId);
}
exports.updateEvent = updateEvent;
function deleteEvent(calendarId, eventId) {
    Calendar.Events.remove(calendarId, eventId);
}
exports.deleteEvent = deleteEvent;
function insertEvent(calendarId, body) {
    Calendar.Events.insert(body, calendarId);
}
exports.insertEvent = insertEvent;
