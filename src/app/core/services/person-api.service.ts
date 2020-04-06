import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'
import { Person } from '../models/person'

@Injectable({
  providedIn: 'root'
})

export class PersonApiService {
  url: string;

  constructor(private http: HttpClient) { 
    this.url = environment.baseUrl;
  }

  getAllPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.url + '/people.json');
  }

}
