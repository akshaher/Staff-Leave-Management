import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ForkService } from 'src/app/core/services/forkJoin.service';
import { NgIf, NgClass } from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, NgIf, NgClass, RouterLink]
})
export class LoginComponent implements OnInit {

  loginForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  showPassword = false;
  loginError = '';

  name$=this.authService.name$;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private fork:ForkService 
  ) { }


  ngOnInit(): void {
    this.fork.getDashboardData().subscribe((res)=>{
      console.log(res);
      
    })
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

  updateName(){
    this.authService.updateName(this.loginForm.value.email);
    console.log("name:", this.loginForm.value.email);
  }

  onSubmit(): void {
    this.updateName();
    this.submitted = true;
    this.loginError = '';
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.loginForm.value);

    const payload = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    this.authService.login(payload).subscribe({
      next: (response) => {
        this.loading = false;
        console.log(response);
        
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
        this.loginError = error.error.message;
        console.log(error)
      }
    })

  }

}