// Compiled using calendar-from-stream-rebuild 1.0.0 (TypeScript 4.5.4)
var exports = exports || {};
var module = module || { exports: exports };
//import { getStreamsDetailFromURLs } from './youtubeAPI';
//import { getCalendarEvents, updateEvent, deleteEvent, insertEvent } from './calendarAPI';
//import { CALENDAR_ID, CHANNEL_LIST } from './.env';
function main() {
    const EinY = exports.getStreamsDetailFromURLs(exports.CHANNEL_LIST);
    const EinC = exports.getCalendarEvents(exports.CALENDAR_ID);
    for (let _i = 0; _i < EinY.length; _i++) {
        const ey = EinY[_i];
        let isExist = false;
        for (let ecKey = 0; ecKey < EinC.length; ecKey++) {
            const ec = EinC[ecKey];
            if ('url' in ey && 'location' in ec) {
                if (ey['url'] == ec['location']) {
                    if (ey['title'] != ec['summary'] || ey['who'] != ec['description'] || new Date(ey['startTime']).valueOf() != new Date(ec['start']['dateTime']).valueOf()) {
                        const endTime = new Date(ey['startTime']);
                        endTime.setHours(endTime.getHours() + 1);
                        const body = {
                            'summary': ey['title'],
                            'description': ey['who'],
                            'start': {
                                'dateTime': ey['startTime']
                            },
                            'end': {
                                'dateTime': endTime.toISOString()
                            }
                        };
                        exports.updateEvent(exports.CALENDAR_ID, ec['id'], body);
                        Logger.log('[update] ' + ey['title']);
                    }else{
                      Logger.log('[exist] ' + ey['title']);
                    }
                    EinC.splice(ecKey, 1);
                    isExist = true;
                    break;
                }
            }
        }
        if (!isExist) {
            const endTime = new Date(ey['startTime']);
            endTime.setHours(endTime.getHours() + 1);
            const body = {
                'summary': ey['title'],
                'description': ey['who'],
                'location': ey['url'],
                'start': {
                    'dateTime': ey['startTime']
                },
                'end': {
                    'dateTime': endTime.toISOString()
                }
            };
            exports.insertEvent(exports.CALENDAR_ID, body);
            Logger.log('[insert] ' + ey['title']);
        }
    }
    for (let _a = 0; _a < EinC.length; _a++) {
        const ec = EinC[_a];
        exports.deleteEvent(exports.CALENDAR_ID, ec['id']);
        Logger.log('[delete] ' + ec['summary']);
    }
}
