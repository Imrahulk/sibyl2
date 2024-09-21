import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AppService } from './app.service';
import { debug } from 'console';
import { User, Post } from './app-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  clientId = '458808227161899'; // Add your Instagram App client_id
  redirectUri = 'https://localhost:4200/'; // Set the same as Instagram app settings
  clientSecret = '2a84699cf327d52e4f62fdff10dc4a0d'; // Add your Instagram client_secret

  authCode: string | null = null;
  accessToken: string | null = null;
  postData: Post[] = [];
  user: User | null = null;

  constructor(
    private instagramService: AppService,
    private route: ActivatedRoute
  ) {
    // Capture the auth code from the URL if present
    this.route.queryParams.subscribe((params) => {
      this.authCode = params['code'] || null;
    });
  }

  login() {
    this.instagramService.login(); // Call login from service
  }

  fetchAccessToken() {
    if (!this.authCode) {
      return;
    }

    this.instagramService
      .fetchAccessToken(this.authCode)
      .subscribe((response: any) => {
        this.accessToken = response.access_token;
      });
  }

  fetchUserDetails() {
    if (!this.accessToken) {
      return;
    }

    this.instagramService
      .fetchUserDetails(this.accessToken)
      .subscribe((response: any) => {
        debugger;
        this.user = response;
      });
  }

  fetchPostDetails() {
    if (!this.accessToken) {
      return;
    }

    this.instagramService
      .fetchPostDetails(this.accessToken)
      .subscribe((response: any) => {
        debugger;
        this.postData = response.data;
        console.log(this.postData);
      });
  }
}
