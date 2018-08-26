import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Page } from '../../shared/common/contracts/page';
import { Task } from '../../models/task';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'tm-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Page<Task>;
  users: Page<User>;
  status = ['todo', 'inProgress', 'inTesting', 'done']

  constructor(private userService: UserService, private taskService: TaskService) {

    this.users = new Page({
      api: userService.api,
      serverPaging: false,
      filters: [{
        field: 'status',
        value: "active"
      }]
    });

    this.users.fetch();
    this.tasks = new Page({
      api: taskService.api,
      filters: [{
        field: 'title',
        value: null
      }, {
        field: 'status',
        value: null
      }, {
        field: 'assigne',
        value: null
      }]
    });
    this.fetch();
  }

  ngOnInit() {
  }

  fetch() {
    this.tasks.fetch();
  }

  deletetask(id: number) {
    var isDelete = window.confirm('Are you sure want to delete ?')
    if (!isDelete) {
      return
    }
    this.tasks.isLoading = true;
    this.taskService.api.remove(id).then(() => {
      this.tasks.isLoading = false;
      this.fetch();
    });
  }

}
