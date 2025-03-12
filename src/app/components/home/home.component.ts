import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
@Component({
 selector: 'app-home',
 imports:[CommonModule],
 templateUrl: './home.component.html',
 styleUrls: ['./home.component.css']
})
export class HomeComponent {
 isLoggedIn = false; // This should be dynamically updated based on authentication
 userRole:  string | null = null;
 constructor(private router: Router,private authService: AuthService) {}
 ngOnInit(): void {
    this.updateLoginStatus();
  }
  updateLoginStatus(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userRole = this.authService.getUserRole();
    console.log("Updated Role:", this.userRole);//temp
  }
  navigateTo(route: string): void {
    this.router.navigate([route]).then(() => {
      this.updateLoginStatus(); // Ensure navigation updates the UI
    });
  }
  logout(): void {
    this.authService.logout();
    this.updateLoginStatus();
    this.router.navigate(['/']);
  }
}
