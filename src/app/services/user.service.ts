// import { Injectable } from '@angular/core';

// import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { Observable } from 'rxjs';

// @Injectable({

//   providedIn: 'root'

// })

// export class UserService {

//   private baseUrl = 'https://localhost:44373/api/BookRequest'; // Correct API URL

//   constructor(private http: HttpClient) {}

//   getUserRequests(userId: number): Observable<any> {

//     const token = localStorage.getItem('token'); // ✅ Retrieve token from local storage

//     if (!token) {

//       console.error("No token found. User must log in.");

//       return new Observable(observer => {

//         observer.error("No authentication token found.");

//         observer.complete();

//       });

//     }

//     const headers = new HttpHeaders({

//       'Authorization': `Bearer ${token}`,  // ✅ Add token to request headers

//       'Content-Type': 'application/json'

//     });

//     return this.http.get(`${this.baseUrl}/user/${userId}`, { headers });

//   }

// } 

// import { Injectable } from '@angular/core';

// import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { Observable } from 'rxjs';

// @Injectable({

//   providedIn: 'root'

// })

// export class UserService {

//   private baseUrl = 'https://localhost:44373/api'; // ✅ Ensure API base URL is correct

//   constructor(private http: HttpClient) {}

//   // ✅ Get Book Requests for Logged-in User

//   getUserRequests(userId: number): Observable<any> {

//     const token = localStorage.getItem('token'); // ✅ Retrieve token from local storage

//     if (!token) {

//       console.error("No token found. User must log in.");

//       return new Observable(observer => {

//         observer.error("No authentication token found.");

//         observer.complete();

//       });

//     }

//     const headers = new HttpHeaders({

//       'Authorization': `Bearer ${token}`,  // ✅ Add token to request headers

//       'Content-Type': 'application/json'

//     });

//     return this.http.get(`${this.baseUrl}/BookRequest/user/${userId}`, { headers });

//   }

//   // ✅ Get all available books

//   getAvailableBooks(): Observable<any> {

//     return this.http.get(`${this.baseUrl}/Book/all`);

//   }

//   // ✅ Request a book

//   requestBook(requestData: any): Observable<any> {

//     const token = localStorage.getItem('token');

//     if (!token) {

//       console.error("No token found. User must log in.");

//       return new Observable(observer => {

//         observer.error("No authentication token found.");

//         observer.complete();

//       });

//     }

//     const headers = new HttpHeaders({

//       'Authorization': `Bearer ${token}`,

//       'Content-Type': 'application/json'

//     });

//     return this.http.post(`${this.baseUrl}/BookRequest/request`, requestData, { headers });

//   }

// } 

// ...................................................................

// import { Injectable } from '@angular/core';

// import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { Observable } from 'rxjs';

// @Injectable({

//   providedIn: 'root'

// })

// export class UserService {

//   private baseUrl = 'https://localhost:44373/api'; // ✅ Ensure API base URL is correct

//   constructor(private http: HttpClient) {}

//   // ✅ Get Authentication Headers (Helper Function)

//   private getAuthHeaders(): HttpHeaders | null {

//     const token = localStorage.getItem('token');

//     if (!token) {

//       console.error("No authentication token found. User must log in.");

//       return null;

//     }

//     return new HttpHeaders({

//       'Authorization': `Bearer ${token}`,

//       'Content-Type': 'application/json'

//     });

//   }

//   // ✅ Get Book Requests for Logged-in User

//   getUserRequests(userId: number): Observable<any> {

//     const headers = this.getAuthHeaders();

//     if (!headers) {

//       return new Observable(observer => {

//         observer.error("No authentication token found.");

//         observer.complete();

//       });

//     }

//     return this.http.get(`${this.baseUrl}/BookRequest/user/${userId}`, { headers });

//   }

//   // ✅ Get all available books

//   getAvailableBooks(): Observable<any> {

//     const headers = this.getAuthHeaders();

//     if (!headers) {

//       return new Observable(observer => {

//         observer.error("No authentication token found.");

//         observer.complete();

//       });

//     }

//     return this.http.get(`${this.baseUrl}/Book/all`, { headers });

//   }

//   // ✅ Request a book

//   requestBook(requestData: any): Observable<any> {

//     const headers = this.getAuthHeaders();

//     if (!headers) {

//       return new Observable(observer => {

//         observer.error("No authentication token found.");

//         observer.complete();

//       });

//     }

//     return this.http.post(`${this.baseUrl}/BookRequest/request`, requestData, { headers });

//   }

// } 

// ..................................................................................
// import { Injectable } from '@angular/core';

// import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { Observable, throwError } from 'rxjs';

// @Injectable({

//   providedIn: 'root'

// })

// export class UserService {

//   private baseUrl = 'https://localhost:44373/api'; // ✅ Ensure API base URL is correct

//   constructor(private http: HttpClient) {}

//   // ✅ Get Authentication Headers (Helper Function)

//   private getAuthHeaders(): HttpHeaders {

//     const token = localStorage.getItem('token');

//     if (!token) {

//       console.error("No authentication token found. User must log in.");

//       throw throwError(() => new Error("No authentication token found."));

//     }

//     return new HttpHeaders({

//       'Authorization': `Bearer ${token}`,

//       'Content-Type': 'application/json'

//     });

//   }

//   // ✅ Get Book Requests for Logged-in User

//   getUserRequests(userId: number): Observable<any> {

//     return this.http.get(`${this.baseUrl}/BookRequest/user/${userId}`, { headers: this.getAuthHeaders() });

//   }

//   // ✅ Get all available books

//   getAvailableBooks(): Observable<any> {

//     return this.http.get(`${this.baseUrl}/Book/all`, { headers: this.getAuthHeaders() });

//   }

//   // ✅ Request a book

//   requestBook(requestData: any): Observable<any> {

//     return this.http.post(`${this.baseUrl}/BookRequest/request`, requestData, { headers: this.getAuthHeaders() });

//   }

// } 

// ...................................................................
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
@Injectable({
 providedIn: 'root'
})
export class UserService {
 private baseUrl = 'https://localhost:44373/api'; // ✅ Ensure API base URL is correct
 constructor(private http: HttpClient) {}
 // ✅ Get Authentication Headers (Helper Function)
 private getAuthHeaders(): HttpHeaders {
   const token = localStorage.getItem('token');
   if (!token) {
     console.error("No authentication token found. User must log in.");
     throw throwError(() => new Error("No authentication token found."));
   }
   return new HttpHeaders({
     'Authorization': `Bearer ${token}`,
     'Content-Type': 'application/json'
   });
 }
 // ✅ Get Book Requests for Logged-in User
 getUserRequests(userId: number): Observable<any> {
   return this.http.get(`${this.baseUrl}/BookRequest/user/${userId}`, { headers: this.getAuthHeaders() });
 }
 // ✅ Get all available books
 getAvailableBooks(): Observable<any> {
   return this.http.get(`${this.baseUrl}/Book/all`, { headers: this.getAuthHeaders() });
 }
 // ✅ Request a book
 requestBook(requestData: any): Observable<any> {
   return this.http.post(`${this.baseUrl}/BookRequest/request`, requestData, { headers: this.getAuthHeaders() });
 }
 // ✅ Search books by title and category
 searchBooks(title: string | null, category: string | null): Observable<any> {
   let params: any = {};
   if (title) params.title = title;
   if (category) params.category = category;
   return this.http.get(`${this.baseUrl}/Book/search`, {
     headers: this.getAuthHeaders(),
     params: params
   });
 }
 // ✅ Get User Details for Profile Update
//  getUserById(userId: number): Observable<any> {
//  return this.http.get(`${this.baseUrl}/User/${userId}`, { headers: this.getAuthHeaders() });
// }

}
