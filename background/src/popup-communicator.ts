type ActionFunction = (request: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) => void;

interface FunctionRegistryInterface {
    getSavedWorkspace: ActionFunction;
    createWorkspace: ActionFunction;
    getActiveWorkspace: ActionFunction;
    setActiveWorkspace: ActionFunction;
    newUntitledWorkspace: ActionFunction
    getTabsOfWorkspace: ActionFunction;
    openWorkspace: ActionFunction;
    deleteWorkspace: ActionFunction;
    // TODO Declare your message handlers here

}

class FunctionRegistry implements FunctionRegistryInterface {
    getSavedWorkspace(request: {}, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void): void {
        chrome.storage.local.get(['savedWorkspaces']).then(result => {
            const workspaces = result['savedWorkspaces'];
            if (workspaces) {
                sendResponse({workspaceNames: workspaces});
            } else {
                console.log('no list of workspace when trying to get');
                chrome.storage.local.set({savedWorkspaces: []}).then(() => {
                    sendResponse({workspaceNames: []});
                })
            }
        });
    }
    createWorkspace(request: {workspaceName: string, tabUrls: string[]}, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void): void {
        const workspaceName = request.workspaceName;
        const tabUrls = request.tabUrls;
        console.log('create workspace invoked');
        chrome.storage.local.get([workspaceName]).then(result => {
            if (result[workspaceName]) {
                sendResponse({success: false, message: `workspace '${workspaceName}' already existed`});
            } else {
                console.log('workspace not exist, trying to create');
                chrome.storage.local.get(['savedWorkspaces']).then(result => {
                    console.log('get list of saved workspace');
                    const workspaces: string[] = result['savedWorkspaces'];
                    if (workspaces) {
                        console.log(`got it, add ${workspaceName} to workspace`);
                        workspaces.push(workspaceName);
                        chrome.storage.local.set({savedWorkspaces: workspaces}).then(() => {
                            chrome.storage.local.set({[workspaceName]: tabUrls}).then(() => {
                                chrome.storage.local.set({["activeWorkspace"]: workspaceName}).then(() => {
                                    sendResponse({success: true, message: 'workspace created and set as current workspace', workspace: workspaceName});
                                }).catch(err => {
                                    sendResponse({success: false, message: `failed to set active workspace`});
                                });
                            }).catch(err => {
                                sendResponse({success: false, message: `failed to save tabs`});
                            });
                        }).catch(err => {
                            sendResponse({success: false, message: `failed to update workspace list`});
                        });
                    } else {
                        console.log('no list of workspace');
                    }
                });

            }
        });
    }

    getActiveWorkspace(request: {}, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) {

        chrome.storage.local.get(["activeWorkspace"]).then(result => {
            if (result["activeWorkspace"]) {
                sendResponse({activeWorkspace: result["activeWorkspace"]});
            } else {
                sendResponse({activeWorkspace: null});
            }

        }).catch(err => {
            sendResponse({activeWorkspace: null});
        })

    }

    setActiveWorkspace(request: {workspaceName: string | null}, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) {
        // add current active workspace to cache, when user create a workspace or open a workspace, or when they want new workspace (set to null)
        let workspaceName: string | null;
        workspaceName = null;
        if (request.workspaceName) {
            workspaceName = request.workspaceName;
        }

        chrome.storage.local.set({["activeWorkspace"]: workspaceName}).then(() => {
            sendResponse({success: true});
        }).catch(err => {
            sendResponse({success: false, message: `error setting active workspace name to ${workspaceName}`});
            console.error("error setting active workspace name to ", workspaceName);
            console.error("error is ", err);
        });
    }

    newUntitledWorkspace(request: {}, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) {

        chrome.storage.local.remove(["activeWorkspace"]).then(() => {
            chrome.tabs.query({
                currentWindow: true
            }).then(tabs => {
                chrome.tabs.create({
                    url: 'https://www.google.com'
                }).then(() => {
                    tabs.forEach(tab => {
                        if (tab.id) {
                            chrome.tabs.remove(tab.id).then(r => {
                                console.log(`removing tab ${tab.title}`);
                            });
                        }
                    });
                }).then(str => {
                    console.log("sending successful new workspace response");
                    sendResponse({success: true, message: 'success'});
                }).catch(err => {
                    sendResponse({success: false, message: `error setting new untitled workspace`});
                });

            }).catch(err => {
                sendResponse({success: false, message: `error setting new untitled workspace`});
            });

        }).catch(err => {
            sendResponse({success: false, message: `error setting new untitled workspace`});
        });
    }

    getTabsOfWorkspace(request: {workspace: string}, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) {
        chrome.storage.local.get([request.workspace]).then(result => {
            if (result[request.workspace]) {
                const tabs = result[request.workspace];
                sendResponse({tabs: tabs});
            }
        });
    }

    openWorkspace(request: {workspace: string}, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) {
        chrome.storage.local.get([request.workspace]).then(result => {
            if (result[request.workspace]) {
                const workspaceTabs: string[] = result[request.workspace];
                chrome.tabs.query({
                    currentWindow: true
                }).then(tabs => {
                    workspaceTabs.forEach(cachedURL => {
                        chrome.tabs.create({url: cachedURL}).then();
                    });
                    tabs.forEach(tab => {
                        if (tab.id) {
                            chrome.tabs.remove(tab.id).then();
                        }
                    });

                }).then(() => {
                    sendResponse({success: true});
                });

            }
        });
    }

    deleteWorkspace(request: {workspace: string}, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) {
        chrome.storage.local.get(['savedWorkspaces']).then(request => {
            if (request['savedWorkspaces']) {
                // TODO implement it
            }
        })
    }
}

export const load = () => {

    let function_registry = new FunctionRegistry();

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        const action = request.action;
        // console.log('getting message: ', request);
        console.log('dispatching to function: ', action);

        // @ts-ignore
        const actionFunction: ActionFunction = function_registry[action];
        // console.log('getting function: ', actionFunction);
        if (typeof actionFunction === 'function') {
            actionFunction(request, sender, sendResponse);
        } else {
            console.error("function undefined:", action);
            sendResponse({error: "No such function"});
        }

        return true;
    });



};