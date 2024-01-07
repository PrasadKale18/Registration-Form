import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  
  constructor(private http:HttpClient){ }

  registeruser(user:any){
   return this.http.post('http://localhost:9000/user/register',user)
  }

  loginuser(user:any){
    return this.http.post('http://localhost:9000/user/login',user)
  }

  getuser(){
    return this.http.get('http://localhost:3000/posts')
  }

  deleteuser(id:any){
     return  this.http.delete('http://localhost:9000/user/deletedata/'+id)
  }
  
  updateuser(user:any,id:any){
    return this.http.put('http://localhost:9000/user/deletedata/'+id,user)
  }

 
}
