import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { UserdataService } from '../services/userdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  Registrationform: any = FormGroup;
  alldata: any
  buttonValueChange: Boolean = false
  userID: any
  popValue: Boolean = false
  deleteuserID: any
  constructor(private fb: FormBuilder, private toastr: ToastrService, private http: HttpClient, private services: UserdataService,private router: Router) { }

  ngOnInit() {
    this.Registrationform = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('[a-z A-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(6)]],

    }, { validator: this.passwordMatchValidator })
  }

  get username() {
    return this.Registrationform.get('username')
  }
  get email() {
    return this.Registrationform.get('email')
  }
  get password() {
    return this.Registrationform.get('password')
  }
  get confirmpassword() {
    return this.Registrationform.get('confirmpassword')
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmpassword');

    if (passwordControl && confirmPasswordControl) {
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }



  onSubmit() {

    if (this.Registrationform.invalid) {
      this.toastr.info("please fill up all the fields!")
    } else {
      this.services.registeruser(this.Registrationform.value).subscribe((data) => {
        console.log(data);
        this.toastr.success("Register Successfully!")
        this.router.navigate(['/home']);
      })
    }

  }


}
