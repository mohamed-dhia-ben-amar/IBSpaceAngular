import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, catchError, throwError } from 'rxjs';
import { Comment, Post } from '../Interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private countryIDSubject: Subject<string> = new Subject<string>(); // Define a new Subject to emit CountryID changes
  private apiUrl: string = 'https://api.ib-space.com/api';
  private apiKey: string = localStorage.getItem("Token")!.toString()

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
    return this.http.post<any>(url, body, { headers }).pipe(
      catchError((error) => {
        return throwError('An error occurred while fetching post list.');
      })
    );
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

  GetListComment(postId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
      'Accept': '*/*',
    });

    const currentDate = new Date();
    const formattedDateTime = currentDate.toISOString();

    const body = {
      idPost: postId,
      last: formattedDateTime
    };

    return this.http.post<any>(`${this.apiUrl}/Post/GetListComment`, body, { headers });
  }

  AddPost(PostBody: string, countryID: string): Observable<any> {
    const formData = new FormData();
    formData.append('body', PostBody);
    formData.append('idCountry', countryID);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Accept': '*/*',
    });

    return this.http.post<any>(`${this.apiUrl}/Post`, formData, { headers }).pipe(
      catchError((error) => {
        console.error(error);
        return throwError('An error occurred while adding the post.');
      })
    );
  }

  AddCommentToPost(PostID: string, commentBody: string): Observable<any> {
    const formData = new FormData();
    formData.append('body', commentBody);
    formData.append('idPost', PostID);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Accept': '*/*',
    });

    return this.http.post<any>(`${this.apiUrl}/Post/comment`, formData, { headers }).pipe(
      catchError((error) => {
        console.error(error);
        return throwError('An error occurred while adding the comment.');
      })
    );
  }

  DeleteCommentFromPost(CommentID: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Accept': '*/*',
    });

    return this.http.delete<any>(`${this.apiUrl}/Post/DeleteComment?idComment=${CommentID}`, { headers }).pipe(
      catchError((error) => {
        console.error(error);
        return throwError('An error occurred while deleting the comment.');
      })
    );
  }

  DeletePost(PostID: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Accept': '*/*',
    });

    return this.http.delete<any>(`${this.apiUrl}/Post?idPost=${PostID}`, { headers }).pipe(
      catchError((error) => {
        console.error(error);
        return throwError('An error occurred while deleting the comment.');
      })
    );
  }

}
