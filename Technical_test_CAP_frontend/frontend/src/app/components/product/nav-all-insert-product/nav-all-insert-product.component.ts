import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav-all-insert-product',
  templateUrl: './nav-all-insert-product.component.html',
  styleUrl: './nav-all-insert-product.component.css'
})
export class NavAllInsertProductComponent {
  constructor(private userService: UserService, private router: Router) {}

  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.logout();
        Swal.fire('Logged Out!', 'You have been logged out.', 'success');
        this.router.navigate(['/home']);
      }
    });
  }

  logoutHome() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out and return to home',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.logout();
        Swal.fire('Logged Out!', 'You have been logged out.', 'success');
        this.router.navigate(['/home']);
      }
    });
  }

  userLogged() {
    return this.userService.getCurrentUserId() == null ? false : true;
  }
}
