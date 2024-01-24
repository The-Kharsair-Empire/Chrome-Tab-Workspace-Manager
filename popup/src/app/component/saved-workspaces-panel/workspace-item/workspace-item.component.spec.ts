import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceItemComponent } from './workspace-item.component';

// @ts-ignore
describe('WorkspaceItemComponent', () => {
  let component: WorkspaceItemComponent;
  let fixture: ComponentFixture<WorkspaceItemComponent>;

  // @ts-ignore
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkspaceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  // @ts-ignore
  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
