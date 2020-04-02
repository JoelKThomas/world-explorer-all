import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CountriesService } from './countries.service';

describe('CountriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule
    ],
  }));

  it('should be created', () => {
    const service: CountriesService = TestBed.get(CountriesService);
    expect(service).toBeTruthy();
  });
});
