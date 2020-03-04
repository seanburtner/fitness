import { TestBed } from '@angular/core/testing';

import { RoutineEditorService } from './routine-editor.service';

describe('RoutineEditorService', () => {
  let service: RoutineEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutineEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
