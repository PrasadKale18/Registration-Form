import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserdataService } from '../services/userdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  id: any
  constructor(private toastr: ToastrService, private http: HttpClient, private services: UserdataService, private router: Router) { }
  deleteuser(id: any) {
    this.services.deleteuser(id).subscribe((data) => {

      console.log(data);
      this.toastr.success('Log out successfully!');
      this.router.navigate(['/login']);
    },
      (error) => {
        console.error(error);
        alert('Failed to Log out!');
      }
    )
  }

}
