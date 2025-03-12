import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../services/user.service';

import { AuthService } from '../../../services/auth.service'; // Import AuthService

import { CommonModule } from '@angular/common';

// ✅ Define BookRequest interface for better type safety

interface BookRequest {

  requestId: number;

  title: string;

  status: string;

}

@Component({

  selector: 'app-my-requests',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './my-requests.component.html',

  styleUrls: ['./my-requests.component.css']

})

export class MyRequestsComponent implements OnInit {

  userRequests: BookRequest[] = [];  // ✅ Now typed properly

  userId: number | null = null;

  isLoading: boolean = true;  // ✅ Loading state

  errorMessage: string = '';  // ✅ Error handling

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {

    // ✅ Get the logged-in user's ID from AuthService

    this.userId = this.authService.getUserId();

    if (this.userId !== null) {

      this.fetchUserRequests();  // ✅ Call the function to load requests

    } else {

      this.isLoading = false;

      this.errorMessage = "User ID not found. Please log in again.";

      console.error(this.errorMessage);

    }

  }

  fetchUserRequests(): void {

    if (this.userId === null) {

      this.errorMessage = "User ID is missing. Cannot fetch requests.";

      this.isLoading = false;

      console.error(this.errorMessage);

      return;

    }

    this.userService.getUserRequests(this.userId).subscribe({

      next: (requests) => {

        console.log("API Response:", requests); // ✅ Debugging

        this.userRequests = (requests as BookRequest[]).map((request) => ({

          ...request,

          title: request.title ?? "Unknown" // ✅ Ensures title is always present

        }));

        this.isLoading = false;

      },

      error: (error) => {

        this.isLoading = false;

        this.errorMessage = "Error fetching requests. Please try again later.";

        console.error("Error fetching requests:", error);

      }

    });

  }

} 