import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  profile: any;
  profileData$ = new BehaviorSubject<any>('');

  constructor(private http: HttpClient) {}

  private endpointUrl = environment.endPointUrl;

  signup(data: User): Observable<User> {
    return this.http.post<User>(this.endpointUrl + '/customer/insert', data);
  }

  login(data: any) {
    return this.http.post<any>(this.endpointUrl + '/customer/login', data);
  }
  editProfile(data: any) {
    return this.http.post<any>(this.endpointUrl + '/customer/update', data);
  }


  getCity() {
    return this.http.get<any>(this.endpointUrl + '/city/all');
  }

  saveAuthData(profile: any) {
    localStorage.setItem('profile', JSON.stringify(profile));
    this.profileData$.next(profile);
  }

  editAuthData(profile: any) {
    let profileObject = this.getAuthData();

    profileObject[0].name = profile.name;
    profileObject[0].address = profile.address;
    profileObject[0].city = profile.city;
    profileObject[0].phone = profile.phone;
    profileObject[0].email = profile.email;
    profileObject[0].password = profile.password;

    localStorage.setItem('profile', JSON.stringify(profileObject));
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
