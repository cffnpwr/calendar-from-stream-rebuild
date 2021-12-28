function main() {
    const EinY = getStreamsDetailFromURLs(CHANNEL_LIST);
    const EinC = getCalendarEvents(CALENDAR_ID);

    for (let i = 0; i < EinY.length; i++) {
        const ey = EinY[i];
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

                        updateEvent(CALENDAR_ID, ec['id'], body);
                        Logger.log('[update] ' + ey['title']);
                    } else {
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

            insertEvent(CALENDARiD, body);
            Logger.log('[insert] ' + ey['title']);
        }
    }
    for (let i = 0; i < EinC.length; i++) {
        const ec = EinC[i];

        deleteEvent(CALENDAR_ID, ec['id']);
        Logger.log('[delete] ' + ec['summary']);
    }
}
