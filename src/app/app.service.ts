import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Post, User } from './app-model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private clientId = '458808227161899'; // Your Instagram App client_id
  private redirectUri = 'https://localhost:4200/'; // Same as Instagram app settings
  private clientSecret = '2a84699cf327d52e4f62fdff10dc4a0d';

  constructor(private http: HttpClient) {}
  login(): void {
    const loginUrl = `https://www.instagram.com/oauth/authorize?client_id=${
      this.clientId
    }&redirect_uri=${encodeURIComponent(
      this.redirectUri
    )}&response_type=code&scope=instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish`;
    window.location.href = loginUrl; // Redirect to Instagram login
  }
  fetchAccessToken(authCode: string): Observable<any> {
    const tokenUrl = `https://api.instagram.com/api/oauth/access_token`;

    // Use HttpParams to encode the body as x-www-form-urlencoded
    const body = new HttpParams()
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret)
      .set('grant_type', 'authorization_code')
      .set('redirect_uri', this.redirectUri)
      .set('code', authCode);

    // Set headers for form-urlencoded data
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

    return this.http.post(tokenUrl, body.toString(), { headers });
  }
  fetchUserDetails(accessToken: string): Observable<any> {
    const userDetailsUrl = `https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`;

    return this.http.get<User>(userDetailsUrl);
  }

  fetchPostDetails(accessToken: string): Observable<any> {
    const userDetailsUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${accessToken}`;

    return this.http.get<Post>(userDetailsUrl);
  }
}
