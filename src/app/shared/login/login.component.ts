import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
  this.angForm = this.fb.group({
  email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
  password: ['', Validators.required]
  });
  }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  postdata(angForm1)
  {
  this.userService.userlogin(angForm1.value.email, angForm1.value.password)
  .pipe()
  .subscribe(
  data => {
    localStorage.setItem('user_id', data[0].id);
    localStorage.setItem('archiving_name', data[0].name);
    localStorage.setItem('archiving_email', data[0].email);
    localStorage.setItem('archiving_depart', data[0].department);
    localStorage.setItem('archiving_user', data[0].status);
    window.location.href = '/';
  },
  error => {
  alert('User name or password is incorrect');
  });
  }
  // tslint:disable-next-line:typedef
  get email() { return this.angForm.get('email'); }
  // tslint:disable-next-line:typedef
  get password() { return this.angForm.get('password'); }

}
