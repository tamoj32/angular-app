import { Component, OnInit } from '@angular/core';
import { PersonApiService } from '../../../core/services/person-api.service';
import { Person } from '../../../core/models/person';
import { Pet } from '../../../core/models/pet';
import { ValueTransformer } from '@angular/compiler/src/util';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  people: Person[];
  genders: String[];

  constructor(private personApiService: PersonApiService) { }

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople() {
    this.personApiService.getAllPeople().subscribe(
      (data: Person[]) => {
        this.genders = data.map(item => item.gender).filter((value, index, self)=> self.indexOf(value) === index)
        this.people = data;
      }
    );
  }

  getPetsByOwnerGender(gender, type){
    let pets = new Array<Pet>();
    this.people.forEach(function (person) {
      if(person.gender === gender && person.pets != null){
        let petList = person.pets.filter((value)=> value.type.toLowerCase() === type); 
        pets.push(...petList);
      }
    });
    return this.sortPetsByName(pets);
  }

  sortPetsByName(pets){
    const sorted = pets.sort((t1: Pet, t2: Pet) => {
      if(t1.name > t2.name){
        return 1;
      }
      if(t1.name < t2.name){
        return -1;
      }
      return 0;
    })
    return sorted;
  }
}
