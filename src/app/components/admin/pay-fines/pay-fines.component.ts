import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
 selector: 'app-pay-fine',
 standalone: true,
 imports: [FormsModule, CommonModule],
 templateUrl: './pay-fines.component.html',
 styleUrls: ['./pay-fines.component.css']
})
export class PayFineComponent implements OnInit {
 fines: any[] = [];
 private apiUrl = 'https://localhost:44373/api/Fine';
 constructor(private http: HttpClient) {}
 ngOnInit(): void {
   this.fetchFines();
 }
 // ✅ Fetch all fines
 fetchFines() {
   const token = localStorage.getItem('token');
   if (!token) {
     console.error('No authentication token found!');
     return;
   }
   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
   this.http.get<any[]>(`${this.apiUrl}/all`, { headers }).subscribe({
     next: (data) => {
       this.fines = data;
     },
     error: (error) => {
       console.error("Error fetching fines:", error);
       alert("Failed to load fines. Please check your login status.");
     }
   });
 }
 // ✅ Pay Fine
 payFine(issueId: number) {

  const token = localStorage.getItem('token');

  if (!token) {

    console.error('No authentication token found!');

    return;

  }

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  this.http.post(`${this.apiUrl}/pay/${issueId}`, {}, { headers }).subscribe({

    next: (response: any) => {

      console.log("Fine Payment Response:", response); // Debugging

      if (response && response.message) {

        alert(response.message); // Show success message

      } else {

        alert("Fine payment processed, but no message received.");

      }

      this.fetchFines(); // Refresh the list

    },

    error: (error) => {

      console.error("Error paying fine:", error);

      // ✅ Display proper error messages based on response

      if (error.error && error.error.message) {

        alert(error.error.message);

      } else {

        alert("Failed to pay fine. Please check console for details.");

      }

    }

  });

} 
}