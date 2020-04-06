import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PeopleComponent } from './people.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { PersonApiService } from '../../../core/services/person-api.service';
import { of } from 'rxjs';
import { Person } from '../../../core/models/person';
import { Pet } from '../../../core/models/pet';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;
  let personApiService: PersonApiService;
  let router: Router;
  
  let peopleTestData = require('../../../../test-data/people/data.json');
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],      
      declarations: [ PeopleComponent ],
      providers: [
        { provide: Router, useValue: {navigate: () => {}}},
        { provide: PersonApiService, useValue: {
          getAllPeople: () => of(peopleTestData)
        }}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;

    personApiService = TestBed.get(PersonApiService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load people', () => {
    spyOn(personApiService, 'getAllPeople')
    .and
    .callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    expect(personApiService.getAllPeople).toHaveBeenCalledWith();
    expect(component.people).toEqual(peopleTestData);
  });

  it('should have genders', () => {
    spyOn(personApiService, 'getAllPeople')
    .and
    .callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    expect(personApiService.getAllPeople).toHaveBeenCalledWith();
    expect(component.genders).toEqual(['Male', 'Female']);
  });

  it('should match cat name sorted for male owner', () => {
    spyOn(personApiService, 'getAllPeople')
    .and
    .callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    expect(personApiService.getAllPeople).toHaveBeenCalledWith();
    expect(component.people.length).toEqual(6);
    let catsWithMaleOwner = component.getPetsByOwnerGender('Male', 'cat');
    expect(catsWithMaleOwner[0].name).toEqual('Garfield');
    expect(catsWithMaleOwner[1].name).toEqual('Jim');
    expect(catsWithMaleOwner[2].name).toEqual('Max');
    expect(catsWithMaleOwner[3].name).toEqual('Tom');
  });

  it('should match cat name sorted for female owner', () => {
    spyOn(personApiService, 'getAllPeople')
    .and
    .callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    expect(personApiService.getAllPeople).toHaveBeenCalledWith();
    expect(component.people.length).toEqual(6);
    let catsWithMaleOwner = component.getPetsByOwnerGender('Female', 'cat');
    expect(catsWithMaleOwner[0].name).toEqual('Garfield');
    expect(catsWithMaleOwner[1].name).toEqual('Simba');
    expect(catsWithMaleOwner[2].name).toEqual('Tabby');
  });
  
});
