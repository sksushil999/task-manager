import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Page } from '../../shared/common/contracts/page';
import { PageEvent } from '@angular/material';


@Component({
  selector: 'tm-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Page<User>;
  pageEvent: PageEvent;
  status = ['inactive', 'active']
  role: string = "";

  constructor(private userService: UserService) {
    this.role = JSON.parse(window.localStorage.getItem('user')).role;
    this.users = new Page({
      api: userService.api,
      filters: [{
        field: 'status',
        value: "active"
      }]
    });
    this.fetch();
  }

  ngOnInit() {
  }


  fetch() {
    this.users.fetch();
  }



  updateStatus(user: User) {
    this.users.isLoading = true;
    this.userService.api.update(user.id, user).then(() => {
      this.users.isLoading = false;
      this.fetch();
    }).catch(err => alert(JSON.stringify(err)))
  }

  changeStatus(user: User) {
    this.users.isLoading = true;
    this.userService.api.update(user.id, user).then(() => { this.users.isLoading = false; this.fetch(); });
  }

}
