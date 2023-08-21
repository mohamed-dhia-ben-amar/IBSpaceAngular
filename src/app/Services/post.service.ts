import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Post } from '../Interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private countryIDSubject: Subject<string> = new Subject<string>(); // Define a new Subject to emit CountryID changes
  private apiUrl: string = 'https://api.ib-space.com/api';
  private apiKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI2NGFkNGM5NDdhMGI5NWY5MTE1NmI5YzIiLCJqdGkiOiI1YmEwY2MxNi1kODkxLTQzZTYtYjcyMi0yZDgxZjgxN2IwNTciLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJ1c2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiI2NGFkNGM5NDdhMGI5NWY5MTE1NmI5YzIiLCJleHAiOjE3NTQ3NDE3Nzd9.2evS1ZCTdJ3FZytOd9sc7AXuSINTVEGaesXJuuJne4g';

  constructor(
    private http: HttpClient
  ) { }

  getPostListByCountry(idCountry: string): Observable<any> {
    // Set the headers with the API key
    const url = `${this.apiUrl}/Post/GetPostCountrys`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
      'Accept': '*/*',
    });

    const body = {
      idCountry: idCountry,
      lastIlan: null,
      lastFetchedPostTimeOther: null,
      lastFetchedPostTimeMine: null
    };

    // Make the POST request
    return this.http.post<any>(url, body, { headers });
  }

  setCountryID(countryID: string): void {
    this.countryIDSubject.next(countryID); // Emit the new CountryID through the Subject
  }

  get countryIDChanged(): Observable<string> {
    return this.countryIDSubject.asObservable(); // Expose the Subject as an Observable
  }

  getPostById(postId: string): Observable<Post> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Accept': '*/*'
    });

    return this.http.post<Post>(`${this.apiUrl}/Post/getPostbyId?idPost=${postId}`, null, { headers });
  }
}
