import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Page } from '../shared/common/contracts/page';
import { Filter } from '../shared/common/contracts/filters';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';

export class NavLink {
  name: string;
  url: string;

}

@Component({
  selector: 'vtf-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  user: User;
  tasks: Page<Task>;
  links: NavLink[] = [
    { name: 'Users', url: '/pages/users' },
    { name: 'Tasks', url: '/pages/tasks' },
  ]



  constructor(private router: Router, private taskService: TaskService) {
    this.user = JSON.parse(window.localStorage.getItem('user'));

    if (this.user.role == 'admin') {
      this.links = [
        { name: 'Users', url: '/pages/users' },
        { name: 'Tasks', url: '/pages/tasks' },
      ]
    } else {
      this.links = [
        { name: 'Tasks', url: '/pages/tasks' },
      ]
    }

    this.tasks = new Page({
      api: taskService.api,
      serverPaging: false,
      filters: [{
        field: 'title',
        value: null
      }]
    });

  }

  clearSearchBox() {
    if (document.getElementById('searchBar')) {
      document.getElementById('searchBar')['value'] = null;
    }
  }

  resetData() {

    this.tasks.clear();
    this.clearSearchBox();

  }

  ngOnInit() {
  }

  logOut() {
    window.localStorage.clear();
    this.router.navigate(['/signin']);
  }

  search(text: string) {
    if (!text || text.length < 3) {
      return;
    }
    this.tasks.filters.reset();
    this.tasks.filters.properties['title'].value = text;
    this.tasks.fetch();
  }

  onSelect(id) {
    this.router.navigate([`/pages/tasks`, id]);
    this.clearSearchBox();
  }



}
