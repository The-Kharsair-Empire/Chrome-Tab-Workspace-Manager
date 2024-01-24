import {Component, Input, Output} from '@angular/core';
import {MatDividerModule} from "@angular/material/divider";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";

@Component({
    selector: 'app-workspace-item',
    standalone: true,
    imports: [
        MatDividerModule,
        MatExpansionModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule
    ],
    templateUrl: './workspace-item.component.html',
    styleUrl: './workspace-item.component.scss'
})
export class WorkspaceItemComponent {
    @Input() workspaceName: string = "";
    // @Output()
    panelOpened: boolean = false;

    deleteWorkspace() {

    }

    openWorkspace() {
        chrome.runtime.sendMessage({action: 'openWorkspace', workspace: this.workspaceName}).then((response: {success: boolean}) => {
            // TODO emit the output and change the global active workspace? maybe using observable?
        });
    }
}
