import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  submitted = false;
  showPassword = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: [
        '',
        Validators.required
      ],

      mobileNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{10}$')
        ]
      ],

      role: [
        '',
        Validators.required
      ],

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
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/
          )
        ]
      ]
    });


    const savedData = localStorage.getItem('userData');

    if (savedData) {
      this.registerForm.patchValue(JSON.parse(savedData));
    }

    this.registerForm.valueChanges.subscribe(value => {
      const { password, ...formDatawithoutPassword } = value;

      localStorage.setItem('userData', JSON.stringify(formDatawithoutPassword))
    })
  }

  get f() {
    return this.registerForm.controls;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {

    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    console.log(this.registerForm.value);


    const payload = {
      fullName: this.registerForm.value.fullName,
      mobileNumber: this.registerForm.value.mobileNumber,
      role: this.registerForm.value.role,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }

    this.authService.register(payload).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role)
        localStorage.setItem('user', JSON.stringify(response.user));

        this.router.navigate(['/dashboard']);
      }, error: (error) => {
        console.log(error);
      }
    })
  }

}