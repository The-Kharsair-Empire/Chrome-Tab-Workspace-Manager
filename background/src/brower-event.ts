export const load = () => {

    chrome.runtime.onInstalled.addListener((details) => {
        if (details.reason === "install") {
            console.log("Extension installed");
            // Perform actions on installation
        } else if (details.reason === "update") {
            console.log("Extension updated");
            // Perform actions on update
        }
    });

    chrome.runtime.onStartup.addListener(() => {
        console.log("extension service worker start up");
    });

    chrome.runtime.onSuspend.addListener(() => {

    });

    chrome.windows.onCreated.addListener(window => {
        chrome.storage.local.remove(["activeWorkspace"]).then();
        console.log('window created: ', window.id);
    });

    chrome.windows.onRemoved.addListener(windowId => {
        chrome.storage.local.remove(["activeWorkspace"]).then();
        console.log('window removed: ', windowId);
    });
};
// chrome.tabs.onCreated.addListener()