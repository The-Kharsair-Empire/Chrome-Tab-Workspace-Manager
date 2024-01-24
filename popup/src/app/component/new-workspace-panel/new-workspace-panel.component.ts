///<reference types="chrome"/>
import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDividerModule} from "@angular/material/divider";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-new-workspace-panel',
  standalone: true,
    imports: [
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTooltipModule,
        MatDividerModule,
        NgForOf,
        NgIf,
        FormsModule
    ],
  templateUrl: './new-workspace-panel.component.html',
  styleUrl: './new-workspace-panel.component.scss'
})
export class NewWorkspacePanelComponent implements OnInit {
    openedTabs: openedTabData[] = []; // this is only useful if you are currently on untitled workspace

    newWorkspaceName: string = "";

    namingErrorMsg: string | null = null;


    @Input() activeWorkspace: string | null = null; // when browser start user should be on null workspace (no on any workspace)


    ngOnInit() {
        chrome.tabs.query({
            currentWindow: true
        }).then(tabs => {
            tabs.forEach(tab => {
                // @ts-ignore
                if (!tab.url.startsWith("chrome")){

                    const title = tab.title;
                    // @ts-ignore
                    const tabURL = new URL(tab.url);
                    const pathname = tabURL.hostname + tabURL.pathname;
                    this.openedTabs.push({
                        title: title,
                        fullUrl: tab.url,
                        displayUrl: pathname,
                        tabId: tab.id,
                        tabWindowId: tab.windowId
                    });
                }
            });
        });
    }



    // navigateTo(index: number, openedTab: openedTabData) {
    //     // @ts-ignore
    //     chrome.tabs.update(openedTab.tabId, {active: true}).then(r => {});
    //     chrome.windows.update(openedTab.tabWindowId, {focused: true}).then(r => {});
    // }
    //
    // removeTab(index: number, openedTab: openedTabData) {
    //     if (openedTab.tabId) {
    //         chrome.tabs.remove(openedTab.tabId).then(r => {
    //             this.openedTabs.splice(index, 1);
    //         });
    //     }
    // }

    createWorkspace() {
        this.namingErrorMsg = null;
        if (this.newWorkspaceName.trim().length === 0) {
            this.namingErrorMsg = 'Please enter a name for your workspace';
        } else if (this.openedTabs.length <= 0) {
            this.namingErrorMsg = 'No tab opened';
        } else {
            chrome.runtime.sendMessage({action: 'createWorkspace',
                workspaceName: this.newWorkspaceName.trim(),
                tabUrls: this.openedTabs.map(openedTab => openedTab.fullUrl) })
                .then((response: {success: boolean, message: string}) => {
                if (!response.success) {
                    this.namingErrorMsg = response.message;
                } else {
                    this.activeWorkspace = this.newWorkspaceName.trim();
                }
            });
        }
    }

    newWorkspace() {
        chrome.runtime.sendMessage({action: 'newUntitledWorkspace'}).then((response: {success: boolean, message: string}) => {
            if (response.success) {
                this.activeWorkspace = null;
            } else {
                console.error(`error: `, response.message);
            }
        })
    }

    onNewWorkspaceNameInputContentChanged() {
        this.namingErrorMsg = null;
    }

    truncateTabTitle(title: string | undefined) {
        if (title) {
            if (title.length > 30) {
                return title.substring(0, 30) + '...';
            } else {
                return title
            }
        } else {
            return 'unknown tab title';
        }
    }

    truncateDisplayedUrl(url: string | undefined) {
        if (url) {
            if (url.length > 60) {
                return url.substring(0, 30) + '...';
            } else {
                return url
            }
        } else {
            return 'unknown url';
        }
    }
}

interface openedTabData {
    title: string | undefined;
    displayUrl: string | undefined;
    fullUrl: string | undefined;
    tabId: number | undefined;
    tabWindowId: number;
}


