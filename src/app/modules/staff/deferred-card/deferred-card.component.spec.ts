import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeferredCardComponent } from './deferred-card.component';

describe('DeferredCardComponent', () => {
  let component: DeferredCardComponent;
  let fixture: ComponentFixture<DeferredCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeferredCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeferredCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
