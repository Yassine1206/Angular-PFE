import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  profile: any;
  profileData$ = new BehaviorSubject<any>('');

  constructor(private http: HttpClient) {}

  private endpointUrl = environment.endPointUrl;

  signup(data: any) {
    return this.http.post<any>(this.endpointUrl + '/login', data);
  }

  login(data: any) {
    return this.http.post<any>(this.endpointUrl + '/login', data);
  }

  saveAuthData(profile: any) {
    localStorage.setItem('profile', JSON.stringify(profile));
    this.profileData$.next(profile);
  }

  getAuthData() {
    this.profile = localStorage.getItem('profile');
    return JSON.parse(this.profile!);
  }

  clearAuthData() {
    localStorage.removeItem('profile');
  }
}
