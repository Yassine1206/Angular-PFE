import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  profileForm!: FormGroup;
  hide = true;

  cities!: any;
  userData!: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAuthData();
    this.profileForm = this.formBuilder.group({
      name: new FormControl(this.userData.name, [Validators.required]),
      address: new FormControl(this.userData.Address, [Validators.required]),
      city: new FormControl(this.userData.city, [Validators.required]),
      phone: new FormControl(this.userData.phone, [Validators.required]),
      email: new FormControl(this.userData.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(this.userData.password, [Validators.required]),
    });

    this.getCities();
  }

  getAuthData() {
    this.userData = this.authService.getAuthData()[0];
    console.log(this.userData);
  }

  getCities() {
    this.authService.getCity().subscribe({
      next: (data: any) => {
        this.cities = data;
      },
    });
  }

  get form() {
    return this.profileForm.controls;
  }

  get nameInput() {
    return this.profileForm.get('name');
  }
  get addressInput() {
    return this.profileForm.get('address');
  }

  get cityInput() {
    return this.profileForm.get('city');
  }

  get phoneInput() {
    return this.profileForm.get('phone');
  }

  get emailInput() {
    return this.profileForm.get('email');
  }

  get passwordInput() {
    return this.profileForm.get('password');
  }

  onEditProfile(): void {
    let sentData = {
      no: this.userData.no,
      name: this.nameInput?.value,
      address: this.addressInput?.value,
      city: this.cityInput?.value,
      email: this.emailInput?.value,
      password: this.passwordInput?.value,
      phone: this.phoneInput?.value


    };


         this.authService.editProfile(sentData).subscribe({
      next: (data: any) => {
        console.log(data);
        this.authService.editAuthData(sentData);
        this.router.navigate(['/accueil']);

      },
    });
  }
}
