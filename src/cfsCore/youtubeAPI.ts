function getStreamsDetailFromURLs(urlList) {
    let videoIdList = [];

    for (let _i = 0, urlList_1 = urlList; _i < urlList_1.length; _i++) {
        const url = urlList_1[_i];
        const channelId = getChannelIdFromURL(url);
        if (channelId) {
            videoIdList = videoIdList.concat(getFutureStreamList(channelId));
        }
    }

    const streamDetailList = getStreamsDetail(videoIdList);

    return streamDetailList;
}

function getChannelIdFromURL(url) {
    const channelId = url.match(/UC[\w-]{22}/)[0];

    if (YouTube.Channels.list('id', { 'id': channelId }))
        return channelId;

    return null;
}

function getFutureStreamList(channelId) {
    const res = YouTube.Search.list('id', {
        'channelId': channelId,
        'eventType': 'upcoming',
        'type': 'video',
        'order': 'date',
        'maxResults': 50
    });
    const strmList = [];
    const rsltCnt = res.pageInfo.totalResults;

    for (let i = 0; i < rsltCnt; i++)
        strmList.push(res.items[i].id.videoId);

    return strmList;
}

function getStreamsDetail(streamIdList) {
    const videoIds = streamIdList.join();
    const res = YouTube.Videos.list('id, snippet, liveStreamingDetails', { 'id': videoIds });
    const detailList = [];
    const rsltCnt = res.pageInfo.totalResults;

    for (let i = 0; i < rsltCnt; i++)
        if (res.items[i].snippet.liveBroadcastContent == 'upcoming')
            detailList.push({
                'who': res.items[i].snippet.channelTitle,
                'title': res.items[i].snippet.title,
                'url': 'https://www.youtube.com/watch?v=' + res.items[i].id,
                'startTime': res.items[i].liveStreamingDetails.scheduledStartTime
            });

    return detailList;
}
