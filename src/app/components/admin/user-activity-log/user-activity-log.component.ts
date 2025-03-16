import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
 selector: 'app-user-activity-log',
 standalone: true,
 imports: [CommonModule, FormsModule],
 templateUrl: './user-activity-log.component.html',
 styleUrls: ['./user-activity-log.component.css']
})
export class UserActivityLogComponent implements OnInit {
 logs: any[] = [];
 searchUsername: string = '';
 private apiUrl = 'https://localhost:44373/api/UserActivityLog';
 constructor(private http: HttpClient) {}
 ngOnInit(): void {
   this.fetchAllLogs();
 }
 getAuthHeaders(): HttpHeaders {
   const token = localStorage.getItem('token');
   return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
 }
 fetchAllLogs(): void {
   const headers = this.getAuthHeaders();
   this.http.get<any[]>(`${this.apiUrl}/all`, { headers }).subscribe({
     next: (data) => (this.logs = data),
     error: (error) => console.error('Error fetching activity logs:', error)
   });
 }
 searchByUsername(): void {
   if (!this.searchUsername.trim()) {
     this.fetchAllLogs(); // Reload all logs if search is empty
     return;
   }
   const headers = this.getAuthHeaders();
   this.http.get<any[]>(`${this.apiUrl}/username/${this.searchUsername}`, { headers }).subscribe({
     next: (data) => (this.logs = data),
     error: (error) => console.error('Error fetching logs by username:', error)
   });
 }
 fetchBorrowedBooks(): void {
   const headers = this.getAuthHeaders();
   this.http.get<any[]>(`${this.apiUrl}/borrowed`, { headers }).subscribe({
     next: (data) => (this.logs = data),
     error: (error) => console.error('Error fetching borrowed books:', error)
   });
 }
 fetchReturnedBooks(): void {
   const headers = this.getAuthHeaders();
   this.http.get<any[]>(`${this.apiUrl}/returned`, { headers }).subscribe({
     next: (data) => (this.logs = data),
     error: (error) => console.error('Error fetching returned books:', error)
   });
 }
}