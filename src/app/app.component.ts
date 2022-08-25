import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'archivingsystem';
  login = false;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.login = this.userService.isLoggedIn();
  }
}
