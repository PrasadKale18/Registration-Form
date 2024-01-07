import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { UserdataService } from '../services/userdata.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  loginform: any = FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private http: HttpClient, private services: UserdataService, private router: Router) { }

  ngOnInit() {
    this.loginform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],

    })
  }
  get email() {
    return this.loginform.get('email')
  }
  get password() {
    return this.loginform.get('password')
  }


  onSubmit() {
    if (this.loginform.invalid) {
      this.toastr.info("Please fill up all the fields!");
    } else {
      this.services.loginuser
      (this.loginform.value).subscribe((data: any) => {
        console.log(data);

        if (data && data.success) {
          console.log(data.success);
          this.toastr.success("Login Successfully");
          this.router.navigate(['/home']);
        } else {
          this.toastr.error("Login failed! Invalid Email or Password!");
        }
      });
    }
  }








}
