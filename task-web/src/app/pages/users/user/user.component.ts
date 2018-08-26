import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Model } from '../../../shared/common/contracts/model';
import { Subscription } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/user';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'tm-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  user: Model<User>;
  userForm: FormGroup;
  subscription: Subscription;

  constructor(private userService: UserService,
    private frmBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.user = new Model({
      api: userService.api,
      properties: new User()
    });
    this.user.isProcessing = true;


    this.subscription = activatedRoute.params.subscribe(params => {
      if (params['id'].toLowerCase() != 'new') {
        this.user.properties.id = params['id'];
        this.fetch();
      } else {
        this.user.isProcessing = false;
      }
      this.initForm(params['id']);
    });

  }

  initForm(id) {
    let fileds: any = {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      status: ['', [Validators.required]]
    }
    if (id.toLowerCase() == 'new') {
      fileds.password = ['', [Validators.required]];
    } else {
      fileds.password = [''];

    }
    this.userForm = this.frmBuilder.group(fileds);
  }

  fetch(id?: number) {
    this.user.fetch(id || this.user.properties.id).catch(err => alert(JSON.stringify(err)))
  }

  create() {
    if (this.user.properties.id) {
      return this.user.update().then(() => {
        this.router.navigate(['/pages/users']);
      });
    }
    this.user.create().then(() => {
      this.router.navigate(['/pages/users']);
    });
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
