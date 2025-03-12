import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

@Component({

  selector: 'app-book-issues',

  imports: [FormsModule, CommonModule],

  templateUrl: './book-issues.component.html',

  styleUrls: ['./book-issues.component.css']

})

export class BookIssuesComponent implements OnInit {

  bookIssues: any[] = [];

  returnDate: { [key: number]: string } = {}; // Store return dates for each issue

  private apiUrl = 'https://localhost:44373/api/BookIssue';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    this.fetchBookIssues();

  }

  // Fetch all issued books

  fetchBookIssues() {

    const token = localStorage.getItem('token'); // Ensure token is stored after login

    if (!token) {

      console.error('No authentication token found!');

      return;

    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>(`${this.apiUrl}/all`, { headers }).subscribe({

      next: (data) => {

        this.bookIssues = data;

      },

      error: (error) => {

        console.error('Error fetching book issues:', error);

        alert('Failed to load issued books. Please check your login status.');

      }

    });

  }

  // Return a book

  returnBook(issueId: number) {

    const returnDate = this.returnDate[issueId];

    if (!returnDate) {

      alert('Please select a return date.');

      return;

    }

    const token = localStorage.getItem('token');

    if (!token) {

      console.error('No authentication token found!');

      return;

    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const returnDto = { IssueId: issueId, ReturnDate: returnDate };

    this.http.put(`${this.apiUrl}/return`, returnDto, { headers }).subscribe({

      next: () => {

        alert('Book returned successfully!');

        this.fetchBookIssues(); // Refresh the list

      },

      error: (error) => {

        console.error('Error returning book:', error);

        alert('Failed to return book. Please try again.');

      }

    });

  }

} 