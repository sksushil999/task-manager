import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Model } from '../../../shared/common/contracts/model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../models/task';
import { User } from '../../../models/user';
import { Page } from '../../../shared/common/contracts/page';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'tm-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  task: Model<Task>;
  taskForm: FormGroup;
  subscription: Subscription;
  users: Page<User>;


  constructor(private userService: UserService,
    private taskService: TaskService,
    private frmBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.users = new Page({
      api: userService.api,
      serverPaging: false,
      filters: [{
        field: 'status',
        value: "active"
      }]
    });

    this.users.fetch();

    this.task = new Model({
      api: taskService.api,
      properties: new Task()
    });

    this.initForm();


    this.subscription = activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id !== 'new') {
        this.getTask(id);
      }
    });

  }



  initForm() {
    this.taskForm = this.frmBuilder.group({
      title: ['', [Validators.required]],
      description: [''],
      estimate: [''],
      assigne: [''],
      status: [''],
    });
  }



  getTask(id: string) {
    this.task.fetch(id);
  }

  create() {
    if (!this.task.properties.title) {
      alert('enter title')
    }
    if (!this.task.properties.assigne.id) {
      this.task.properties.assigne.id = JSON.parse(localStorage.getItem('user')).id;
    }
    this.task.isProcessing = true;
    this.task.save().then((data) => {
      this.router.navigate(['/pages/tasks']);
    });

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
