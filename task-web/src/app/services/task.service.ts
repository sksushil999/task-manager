import { Injectable } from '@angular/core';
import { IApi } from '../shared/common/contracts/api';
import { GenericApi } from '../shared/common/generic-api';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';

@Injectable()
export class TaskService {

  api: IApi<Task>;

  constructor(http: HttpClient) {
    this.api = new GenericApi<Task>('tasks', http);
  }

}
