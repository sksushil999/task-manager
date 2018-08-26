import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AgmCoreModule } from '@agm/core';
import { SpinnerComponent } from './spinner/spinner.component';
import {
  MatCardModule,
  MatTableModule, MatExpansionModule,
  MatListModule, MatButtonModule,
  MatInputModule, MatSelectModule, MatFormFieldModule,
  MatToolbarModule, MatIconModule, MatMenuModule, MatTooltipModule, MatAutocompleteModule, MatNativeDateModule, MatDatepickerModule, MatChipsModule, MatPaginatorModule
} from '@angular/material';

import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './gaurds/login.guard';
import { UserGuard } from './gaurds/user.guard';
import { PagesComponent } from './pages/pages.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { ImgPreviewDirective } from './directives/img-preview.directive';
import { ErrorComponent } from './error/error.component';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import {
  Component,
  Input
} from '@angular/core';
import { UsersComponent } from './pages/users/users.component';
import { UserService } from './services/user.service';
import { TaskService } from './services/task.service';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './pages/users/user/user.component';
import { TaskComponent } from './pages/tasks/task/task.component';
import { TasksComponent } from './pages/tasks/tasks.component';


const MaterialModules = [
  MatFormFieldModule,
  MatInputModule, MatCardModule,
  MatTableModule,
  MatExpansionModule,
  MatListModule,
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatMenuModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatChipsModule,
  MatPaginatorModule,
  MatIconModule,
];


@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    UsersComponent,
    ImgPreviewDirective,
    ErrorComponent,
    UserComponent,
    LoginComponent,
    TaskComponent,
    TasksComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModules,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule

  ],

  providers: [
    LoginGuard,
    UserGuard,
    UserService,
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
