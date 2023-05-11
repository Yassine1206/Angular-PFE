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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  get emailInput() {
    return this.loginForm.get('email');
  }
  get passwordInput() {
    return this.loginForm.get('password');
  }

  onLogin(): void {
    let sentData = {
      email: this.emailInput?.value,
      password: this.passwordInput?.value,
    };
    this.authService.saveAuthData(sentData);

    /*     this.authService.login(sentData).subscribe({
      next: (data: any) => {
        console.log(data);
        this.authService.saveAuthData(sentData);

        this.router.navigate(['/accueil']);
      },
    }); */
  }
}
