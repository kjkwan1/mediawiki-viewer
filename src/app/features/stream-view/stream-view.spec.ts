import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamView } from './stream-view';

describe('StreamView', () => {
  let component: StreamView;
  let fixture: ComponentFixture<StreamView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StreamView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreamView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
