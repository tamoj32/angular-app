import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PersonApiService } from './person-api.service';
import { of } from 'rxjs';

describe('PersonApiService', () => {
  let service: PersonApiService;
  let peopleTestData = require('../../../test-data/people/data.json');
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: PersonApiService, useValue: { getAllPeople: () => of(peopleTestData)}}
      ]
    });

    service = TestBed.get(PersonApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getAllPeople function', () => {
    expect(service.getAllPeople).toBeTruthy();
  });

  it('getAllPeople() should return data', () => {
    let response;

    spyOn(service, 'getAllPeople')
    .and
    .callThrough();

    service.getAllPeople().subscribe(res => {
        response = res;
      });

      expect(response).toEqual(peopleTestData);

  });
  
});
