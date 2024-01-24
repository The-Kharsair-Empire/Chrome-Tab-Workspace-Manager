import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWorkspacePanelComponent } from './new-workspace-panel.component';

// @ts-ignore
describe('NewWorkspacePanelComponent', () => {
  let component: NewWorkspacePanelComponent;
  let fixture: ComponentFixture<NewWorkspacePanelComponent>;

  // @ts-ignore
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewWorkspacePanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewWorkspacePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // @ts-ignore
  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
