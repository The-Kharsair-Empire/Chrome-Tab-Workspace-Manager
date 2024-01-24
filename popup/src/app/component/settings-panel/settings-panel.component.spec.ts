import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPanelComponent } from './settings-panel.component';
// @ts-ignore
describe('SettingsPanelComponent', () => {
  let component: SettingsPanelComponent;
  let fixture: ComponentFixture<SettingsPanelComponent>;
// @ts-ignore
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
// @ts-ignore
  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
