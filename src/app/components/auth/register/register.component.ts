import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
@Component({
 selector: 'app-register',
 standalone: true,
 imports:[CommonModule,FormsModule],
 templateUrl: './register.component.html',
 styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 registerData = {
   fullName: '',
   email: '',
   password: '',
   role: 'User' // Default role
 };
 constructor(private router: Router, private authService: AuthService) {} // ✅ Inject AuthService
 OnRegister(): void {
   this.authService.register(this.registerData).subscribe({
     next: (response) => {
       console.log('Registration successful:', response);
       alert('Registration successful. Please log in.');
       this.router.navigate(['/login']); // ✅ Redirect to login page after success
     },
     error: (error) => {
       console.error('Registration failed:', error);
       alert('Registration failed. Please try again.');
     },
   });
 }
}