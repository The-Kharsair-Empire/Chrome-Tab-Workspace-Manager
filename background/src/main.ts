import * as browserEvent from "./brower-event"
import * as popupCommunicator from "./popup-communicator"

self.addEventListener('install', function(event) {
    console.log('install event invoked');
});

self.addEventListener('fetch', function(event) {
    console.log('fetch event invoked');
});

self.addEventListener('activate', function(event) {
    console.log('activate event invoked');
});

browserEvent.load();
popupCommunicator.load();