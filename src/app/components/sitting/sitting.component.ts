import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NotifierService, NotifierOptions } from 'angular-notifier';


@Component({
  selector: 'app-sitting',
  templateUrl: './sitting.component.html',
  styleUrls: ['./sitting.component.css']
})
export class SittingComponent implements OnInit {

  userid;
  username;
  useremail;
  userdepart;
  angForm: FormGroup;
  private readonly notifier: NotifierService;

  constructor(notifierService: NotifierService, private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.angForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
      });
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.userid = localStorage.getItem('user_id');
    this.username = localStorage.getItem('archiving_name');
    this.useremail = localStorage.getItem('archiving_email');
    this.userdepart = localStorage.getItem('archiving_depart');
  }
  // tslint:disable-next-line:typedef
  postdata(angForm1)
  {
  this.userService.changepassword(this.userid, angForm1.value.currentPassword, angForm1.value.newPassword)
  .pipe()
  .subscribe(
  data => {
    this.notifier.notify('success', 'The password is changed successfuly!');
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/']);
  },
  error => {
    this.notifier.notify('error', 'Failed! your old password is wrong!!...');
  });
  }

}
