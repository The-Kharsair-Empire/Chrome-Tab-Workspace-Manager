///<reference types="chrome"/>
import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {NgIf} from "@angular/common";
import {MatTabGroup, MatTabsModule} from "@angular/material/tabs";
import {SavedWorkspacesPanelComponent} from "../saved-workspaces-panel/saved-workspaces-panel.component";
import {NewWorkspacePanelComponent} from "../new-workspace-panel/new-workspace-panel.component";
import {SettingsPanelComponent} from "../settings-panel/settings-panel.component";

@Component({
    selector: 'app-default-popup-page',
    standalone: true,
    imports: [
        NgIf,
        MatTabsModule,
        SavedWorkspacesPanelComponent,
        NewWorkspacePanelComponent,
        SettingsPanelComponent
    ],
    templateUrl: './default-popup-page.component.html',
    styleUrl: './default-popup-page.component.scss'
})
export class DefaultPopupPageComponent implements OnInit, AfterViewInit {

    savedWorkspaces: string[] = [];

    @ViewChild('matTabGroup') tabGroup!: MatTabGroup;

    activeWorkspace: string | null = null;

    tabsOfActiveWorkspace: string[] = [];

    constructor(private changeDetectorRef: ChangeDetectorRef) {

    }

    ngOnInit(): void {
        this.loadSavedWorkspaces().then(() => {
            // this.changeDetectorRef.detectChanges();
            // if (this.savedWorkspaces.length > 0) {
            //     this.tabGroup.selectedIndex = 0;
            // }
        });
        this.getActiveWorkspace().then(() => {
            if (this.activeWorkspace) {
                this.loadTabsOfActiveWorkspace().then();
            }

        })

    }

    async loadTabsOfActiveWorkspace(): Promise<void> {
        let response: {tabs: string[]} = await chrome.runtime.sendMessage({action: 'getTabsOfWorkspace', workspace: this.activeWorkspace});
        this.tabsOfActiveWorkspace = response.tabs;
    }

    async loadSavedWorkspaces(): Promise<void> {
        let response: {workspaceNames: string[]} = await chrome.runtime.sendMessage({action: 'getSavedWorkspace'});
        this.savedWorkspaces = response.workspaceNames;
    }

    async getActiveWorkspace(): Promise<void> {
        let response: {activeWorkspace: string} = await chrome.runtime.sendMessage({action: 'getActiveWorkspace'});
        if (response) {
            this.activeWorkspace = response.activeWorkspace;
        }
        console.log(response);

    }

    ngAfterViewInit() {
        //TODO set tab to my workspace if workspace exists
    }


    onTabChanged(index: number) {
        this.loadSavedWorkspaces().then(() => {});
    }
}


export interface workspaceDataInterface {
    name: string;
}
