import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
@Component({
 selector: 'app-update-profile',
 standalone: true,
 imports: [CommonModule, FormsModule],
 templateUrl: './update-profile.component.html',
 styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
 userId: number | null = null;
 userDetails: any = { fullName: '', email: '', password: '' };
 isLoading: boolean = true;
 errorMessage: string = '';
 private baseUrl = 'https://localhost:44373/api/User'; // ✅ API Base URL
 constructor(private http: HttpClient, private authService: AuthService) {}
 ngOnInit(): void {
   this.userId = this.authService.getUserId();
   if (this.userId !== null) {
     this.loadUserDetails();
   } else {
     this.isLoading = false;
     this.errorMessage = "User ID not found. Please log in again.";
     console.error(this.errorMessage);
   }
 }
 // ✅ Fetch user details directly from API
 loadUserDetails(): void {
   const headers = this.getAuthHeaders();
   if (!headers) return;
   this.http.get(`${this.baseUrl}/${this.userId}`, { headers }).subscribe({
     next: (user) => {
       this.userDetails = user;
       this.isLoading = false;
     },
     error: (error) => {
       this.isLoading = false;
       this.errorMessage = "Failed to load user details.";
       console.error("Error fetching user details:", error);
     }
   });
 }
 // ✅ Update user details directly via API call
 updateUserDetails(): void {
   if (!this.userId) {
     console.error("User ID not found.");
     return;
   }
   const updateData = {
     fullName: this.userDetails.fullName.trim(),
     email: this.userDetails.email.trim(),
     password: this.userDetails.password ? this.userDetails.password.trim() : null,
     role: this.userDetails.role
   };
   console.log("Sending update request:", JSON.stringify(updateData)); // ✅ Debugging
   const headers = this.getAuthHeaders();
   if (!headers) return;
   this.http.put(`https://localhost:44373/api/User/update/${this.userId}`, updateData).subscribe({
     next: (response) => {
       console.log("Update successful:", response);
       alert("User details updated successfully!");
     },
     error: (error) => {
       console.error("Update error:", error);
       alert("Failed to update details. Please try again.");
     }
   });
 }
 // ✅ Helper function to get authorization headers
 private getAuthHeaders(): HttpHeaders | null {
   const token = localStorage.getItem('token');
   if (!token) {
     console.error("No authentication token found. User must log in.");
     alert("You must be logged in to update your profile.");
     return null;
   }
   return new HttpHeaders({
     'Authorization': `Bearer ${token}`,
     'Content-Type': 'application/json'
   });
 }
}