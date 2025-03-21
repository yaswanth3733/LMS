
import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { AuthService } from '../../../services/auth.service';

@Component({

  selector: 'app-login',

  standalone: true,

  imports: [CommonModule, FormsModule],

  templateUrl: './login.component.html',

  styleUrls: ['./login.component.css']

})

export class LoginComponent {

  loginData = {

    email: '',

    password: ''

  };

  constructor(private router: Router, private authService: AuthService) {}

  onLogin(): void {

    this.authService.login(this.loginData).subscribe({

      next: (response) => {

        console.log('Login successful:', response);

        alert('Login successful.');

      
        // if (response.role === 'Admin') {

        //   this.router.navigate(['/admin-dashboard']); // Redirect admin

        // } else {

          this.router.navigate(['/']); // Redirect normal users

      // }

      },

      error: (error) => {

        console.error('Login failed:', error);

        alert('Invalid email or password.');

      }

    });

  }

} 