import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultPopupPageComponent } from './default-popup-page.component';

// @ts-ignore
describe('DefaultPopupPageComponent', () => {
  let component: DefaultPopupPageComponent;
  let fixture: ComponentFixture<DefaultPopupPageComponent>;

  // @ts-ignore
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultPopupPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultPopupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // @ts-ignore
  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
