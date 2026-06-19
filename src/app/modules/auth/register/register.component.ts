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
  loading:boolean=false;
  loginError:boolean=false;

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
      department:[
        '', [Validators.required]
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
     this.loading=true;

    console.log(this.registerForm.value);


    const payload = {
      fullName: this.registerForm.value.fullName,
      mobileNumber: this.registerForm.value.mobileNumber,
      role: this.registerForm.value.role,
      email: this.registerForm.value.email,
      department: this.registerForm.value.department,
      password: this.registerForm.value.password
    }

    this.authService.register(payload).subscribe({
      next: (response) => {
        this.loading=false;
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);

        this.router.navigate(['/dashboard']);
      }, error: (error) => {
        if(error.error.message == "Email already exists"){
          this.registerForm.get('email')?.setErrors({
            emailExists : true
          })

        }
        console.log(error);
        this.loginError=true;
        this.loading=false;
        this.loginError = error.error.message;

      }
    })
  }

}