import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  submitted = false;

  loading = false;

  showPassword = false;

  loginError = '';

  constructor(
    private fb: FormBuilder,
    private authService :AuthService,
    private router:Router
  ) {}

  ngOnInit(): void {

    this.loginForm = this.fb.group({

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],
    });

  }

  get f() {
    return this.loginForm.controls;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.submitted = true;
    this.loginError = '';
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.loginForm.value);

     const payload={
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
     }
    
this.authService.login(payload).subscribe({
  next: (response)=>{
    this.loading=false;
    localStorage.setItem('token', response.token);
    localStorage.setItem('role', response.role);
    localStorage.setItem('user', JSON.stringify(response.user))
    this.router.navigate(['/dashboard']);
  },
  error: (error)=>{
    this.loading=false;
    console.log(error);
    this.loginError = error.error.message;
    console.log(error)
  }
})

  }

}