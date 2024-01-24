import {Component, Input} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {WorkspaceItemComponent} from "./workspace-item/workspace-item.component";
import {MatExpansionModule} from "@angular/material/expansion";

@Component({
    selector: 'app-saved-workspaces-panel',
    standalone: true,
    imports: [
        MatCardModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        NgForOf,
        NgIf,
        WorkspaceItemComponent,
        MatExpansionModule,
    ],
    templateUrl: './saved-workspaces-panel.component.html',
    styleUrl: './saved-workspaces-panel.component.scss'
})
export class SavedWorkspacesPanelComponent {
    @Input() workspaces: string[] = [];
    // TODO: need a mechanism maybe an observable that takes in function an execute them?
    // TODO: update list of workspaces when added or deleted
}
