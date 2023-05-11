import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  hide = true;

  towns = [{ value: 'Hammam Lif' }, { value: 'Ezzahra' }];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      town: new FormControl('', [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
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

  get townInput() {
    return this.signupForm.get('town');
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
    let sentData = {
      name: this.nameInput?.value,
      address: this.addressInput?.value,
      town: this.townInput?.value,
      phone: this.phoneInput?.value,
      email: this.emailInput?.value,
      password: this.passwordInput?.value,
    };
    this.authService.signup(sentData).subscribe({
      next: (data: any) => {
        console.log(data);
      },
    });
  }
}
