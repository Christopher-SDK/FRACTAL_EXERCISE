import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../model/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide: boolean = true;
  registerForm!: FormGroup;

  constructor(
    private formBuilderLogin: FormBuilder,
    private formBuilderRegister: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    localStorage.clear();
    this.loadForm();
    this.loadFormRegister();
    document.addEventListener('DOMContentLoaded', () => {
      const container = document.getElementById('container');
      const registerBtn = document.getElementById('register');
      const loginBtn = document.getElementById('login');
      const registerUserButton = document.getElementById('registerUserButton');
      if (registerBtn) {
        registerBtn.addEventListener('click', () => {
          if (container) {
            container.classList.add("active");
          }
        });
      }

      if (registerUserButton) {
        registerUserButton.addEventListener('click', () => {
          if (container) {
            container.classList.add("active");
          }
        });
      }

      if (loginBtn) {
        loginBtn.addEventListener('click', () => {
          if (container) {
            container.classList.remove("active");
          }
        });
      }
    });
  }

  loadForm() {

    this.loginForm = this.formBuilderLogin.group(
      {
        userName: ["", [Validators.required, Validators.maxLength(20), Validators.minLength(4)]],
        password: ["", [Validators.required, Validators.maxLength(20), Validators.minLength(4)]]
      }
    );

  }

  loginUser() {
    const user: User = {
      id: 0,
      firstName: "",
      lastName: "",
      birthdate: new Date(),
      userName: this.loginForm.get("userName")!.value,
      password: this.loginForm.get("password")!.value,
      type: "ROLE_USUARIO"
    };

    this.userService.login(user).subscribe({
      next: (data) => {
        this.router.navigate(["/product"]); 
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'El usuario se logeó muy bien :)',
          timer: 2000,
          showConfirmButton: false
        });
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error en la autenticación del usuario: ' + err.error.message,
          timer: 2000,
          showConfirmButton: false
        });
      }
    });

  }


  cancel() {
    this.router.navigate(["/"]);
  }

  loadFormRegister() {

    this.registerForm = this.formBuilderRegister.group(
      {
        userName_Register: ["", [Validators.required, Validators.maxLength(20), Validators.minLength(4)]],
        password_Register: ["", [Validators.required, Validators.maxLength(20), Validators.minLength(4)]],
        userType: ["", [Validators.required]],
        firstName: ["", [Validators.required]],
        lastName: ["", [Validators.required]],
        birthdate: ["", [Validators.required]],
      }
    );

  }

  cancelar() {
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }

  registerUser() {
    const user_register: User = {
      id: 0,
      userName: this.registerForm.get("userName_Register")!.value,
      password: this.registerForm.get("password_Register")!.value,
      type: this.registerForm.get("userType")!.value,
      // Obtener los valores de los nuevos campos
      firstName: this.registerForm.get("firstName")!.value,
      lastName: this.registerForm.get("lastName")!.value,
      birthdate: this.registerForm.get("birthdate")!.value,
    };

    this.userService.addUser(user_register).subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'El usuario se registró correctamente',
          timer: 2000,
          showConfirmButton: false
        }); this.registerForm.reset();
      },
      error: (err) => {
        console.log(err.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error en el registro del usuario: ' + err.error.message,
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }

}
