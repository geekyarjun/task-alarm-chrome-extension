
// listener for alarm, execute when an alarm has elasped
chrome.alarms.onAlarm.addListener((alarm) => {
    console.log("alarm", alarm);
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'notification32.png',
        title: 'Alarm',
        message: alarm.name,
        buttons: [{
            title: 'Keep it Flowing.'
        }],
        priority: 0
    });
    const audio = new Audio('./Old-alarm-clock-sound.mp3');
    audio.play();
})

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     console.log('tabId, changeInfo, tab', tabId, changeInfo, tab);
//     chrome.storage.sync.get('alarmData', (storage) => {
//         console.log('storage', storage);

//         if (storage.alarmData.length) {

//         } else {

//         }
//     });
// })