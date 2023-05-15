import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  hide = true;

  cities!: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCities();

    this.signupForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  getCities() {
    this.authService.getCity().subscribe({
      next: (data: any) => {
        this.cities = data;
      },
    });
  }

  get form() {
    return this.signupForm.controls;
  }

  get nameInput() {
    return this.signupForm.get('name');
  }
  get addressInput() {
    return this.signupForm.get('address');
  }

  get cityInput() {
    return this.signupForm.get('city');
  }

  get phoneInput() {
    return this.signupForm.get('phone');
  }

  get emailInput() {
    return this.signupForm.get('email');
  }

  get passwordInput() {
    return this.signupForm.get('password');
  }

  onSignup(): void {
    let sentData: User = {
      name: this.nameInput?.value,
      address: this.addressInput?.value,
      city: this.cityInput?.value,
      phone: this.phoneInput?.value,
      email: this.emailInput?.value,
      password: this.passwordInput?.value,
    };
    this.authService.signup(sentData).subscribe({
      next: (data: any) => {
        console.log(data);
        this.router.navigate(['/accueil']);
      },
    });
  }
}
