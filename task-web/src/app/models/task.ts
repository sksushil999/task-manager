import { User } from "./user";

export class Task {
  id?: number = null;
  title?: string = "";
  description?: string = "";
  estimate?: string = "";
  status?: string = "todo";
  taskType?: string = "";
  password?: string = "";
  reporter: User = new User();
  assigne: User = new User();
  constructor() { }
}
