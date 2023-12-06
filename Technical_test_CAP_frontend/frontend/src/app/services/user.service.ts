import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Token } from '../model/token';
import { tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  ruta_servidor = "http://localhost:8080/api";
  recurso = "users";

  constructor(private http:HttpClient) { }

  getUser(id: number) {
    return this.http.get<User>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  addUser(user: User) {
    return this.http.post<User>(this.ruta_servidor+"/"+this.recurso+"/register", user);
  }

  login(user: User) {
    return this.http.post<Token>(this.ruta_servidor+"/"+this.recurso+"/login",user).pipe(
      tap((res)=> {
        localStorage.setItem('token', res.jwtToken);
        localStorage.setItem('user_id', res.id.toString());
      })
    );
  }

  getUserById(id: number) {
    return this.http.get<User>(`${this.ruta_servidor}/${this.recurso}/${id}`);
  }

  getCurrentUserId(): number | null {
    let userId: string | null = localStorage.getItem('user_id');
    return userId != null ?  parseInt(userId) : null;
  }

  getCurrentToken(): string | null {
    let token: string | null = localStorage.getItem('token');
    return token != null ?  token : null;
  }

  logout(){
    localStorage.clear();
  }

}


//PLANTILLA