import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Model } from '../shared/common/contracts/model';
import { Router } from '@angular/router';

@Component({
  selector: 'tm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hide = true;


  constructor(private frmBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) {
      this.initForm();
     }

     initForm() {
      this.loginForm = this.frmBuilder.group({
        password: ['', [Validators.required]],
        email: ['', [Validators.required]],
      })
    }
    logIn() {
      this.userService.signIn.create(this.loginForm.value).then((data) => {
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('user', JSON.stringify(data));
        this.router.navigate(['/pages']);
      }).catch(err => alert(err));
    }

  ngOnInit() {
  }

}
