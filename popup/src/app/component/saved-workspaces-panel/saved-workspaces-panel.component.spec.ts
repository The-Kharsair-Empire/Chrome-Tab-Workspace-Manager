import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedWorkspacesPanelComponent } from './saved-workspaces-panel.component';

describe('SavedWorkspacesPanelComponent', () => {
  let component: SavedWorkspacesPanelComponent;
  let fixture: ComponentFixture<SavedWorkspacesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedWorkspacesPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavedWorkspacesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
