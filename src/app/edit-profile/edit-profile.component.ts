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

  towns = [{ value: 'Hammam Lif' }, { value: 'Ezzahra' }];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      town: new FormControl('', [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
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

  get townInput() {
    return this.profileForm.get('town');
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
