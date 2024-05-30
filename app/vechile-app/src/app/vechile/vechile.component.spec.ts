import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VechileComponent } from './vechile.component';

describe('VechileComponent', () => {
  let component: VechileComponent;
  let fixture: ComponentFixture<VechileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VechileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VechileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
