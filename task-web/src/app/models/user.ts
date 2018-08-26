import { LocationModel } from "./location.model";

export class User {
  id?: number = null;
  name?: string = "";
  token?: string = "";
  status?: string = "active";
  email?: string = "";
  role?: string = "";
  password?: string = "";

  constructor() { }
}
