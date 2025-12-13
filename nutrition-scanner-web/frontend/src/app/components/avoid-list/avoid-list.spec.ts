import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvoidList } from './avoid-list';

describe('AvoidList', () => {
  let component: AvoidList;
  let fixture: ComponentFixture<AvoidList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvoidList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvoidList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
