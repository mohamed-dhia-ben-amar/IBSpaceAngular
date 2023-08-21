import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagListDialogComponent } from './flag-list-dialog.component';

describe('FlagListDialogComponent', () => {
  let component: FlagListDialogComponent;
  let fixture: ComponentFixture<FlagListDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlagListDialogComponent]
    });
    fixture = TestBed.createComponent(FlagListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
