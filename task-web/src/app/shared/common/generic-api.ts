
import 'rxjs/Rx';
import { IApi, ServerDataModel, ServerPageInput, ServerPageModel } from './contracts/api';
import { ILocalStore } from './contracts/local-store-interface';
import * as _ from 'lodash';
import { IGetParams } from './contracts/api/get-params.interface';
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams, HttpClientModule } from '@angular/common/http';
import { Injector, Injectable, Type, ReflectiveInjector } from '@angular/core';
import { environment } from '../../../environments/environment';
declare let Reflect: any;


export class GenericApi<TModel> implements IApi<TModel> {

  private rootUrl: string;


  get(id: number): Promise<TModel> {
    return this.http.get<ServerDataModel<TModel>>(`${this.rootUrl}/${this.key}/${id}`, { headers: this.getHeaders() })
      .toPromise()
      .then((response) => {
        if (!response.isSuccess) {
          return this.handleError(response.message || response.code || 'failed');
        }
        return response.data;
      }).catch(this.handleError);
  }

  simpleGet(input?: IGetParams): Promise<TModel> {

    let url: string = `${this.rootUrl}/${this.key}`;
    let parms: HttpParams = null;

    if (input) {
      parms = input.serverPageInput ? this.getQueryParams(input.serverPageInput) : null;
      url = input.id ? `${url}/${input.id}` : url;
      url = input.path ? `${url}/${input.path}` : url;
      if (input.api)
        url = input.api;
    }
    return this.http.get<ServerDataModel<TModel>>(url, { headers: this.getHeaders(), params: parms })
      .toPromise()
      .then((response) => {
        if (!response.isSuccess) {
          return this.handleError(response.message || response.code || 'failed');
        }
        return response.data;
      })
      .catch(this.handleError);
  }
  search(input: ServerPageInput): Promise<ServerPageModel<TModel>> {
    let parms: HttpParams = this.getQueryParams(input);
    return this.http.get<ServerPageModel<TModel>>(`${this.rootUrl}/${this.key}`, { headers: this.getHeaders(), params: parms })
      .toPromise()
      .then((response) => {
        if (!response.isSuccess) {
          return this.handleError(response.message || response.code || 'failed');
        }
        return response;
      })
      .catch(this.handleError);
  }

  create(model: TModel, path?: string): Promise<TModel> {

    let url: string = `${this.rootUrl}/${this.key}`;
    url = path ? `${url}/${path}` : url;

    return this.http.post<ServerDataModel<TModel>>(url, model, { headers: this.getHeaders() })
      .toPromise()
      .then((response) => {
        if (!response.isSuccess) {
          return this.handleError(response.message || response.code || 'failed');
        }
        return response.data;
      })
      .catch(this.handleError);
  }

  exportReport(input: ServerPageInput, path: string = null, reportName: string = "downloaded_file"): Promise<any> {
    let parms: HttpParams = this.getQueryParams(input);
    let apiPath: string = path ? `${this.rootUrl}/${path}` : `${this.rootUrl}/${this.key}`;

    return this.http.get<Blob>(apiPath, { headers: this.getHeaders(), params: parms, responseType: 'blob' as 'json' }).toPromise()
      .then((resposne) => {
        // const url = window.URL.createObjectURL(resposne);

        // const link = this.downloadZipLink.nativeElement;
        // link.href = url;
        // link.download = 'archive.zip';
        // link.click();

        // window.URL.revokeObjectURL(url);
        // let contentType = resposne.headers.get("content-type") || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

        // // get the headers' content disposition
        // let cd = resposne.headers.get("content-disposition") || resposne.headers.get("Content-Disposition");

        // // get the file name with regex
        // let regex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        // let match = regex.exec(cd);

        // // is there a fiel name?
        // let fileName = match && match[1] || "report";
        // if (reportName)
        //   fileName = reportName;

        // // replace leading and trailing slashes that C# added to your file name
        // fileName = fileName.replace(/\"/g, "");

        // let blob = new Blob([resposne['_body']], { type: contentType });
        let blob = resposne;
        if (navigator.msSaveBlob) {
          navigator.msSaveBlob(blob, reportName);
        } else {
          let objectUrl = window.URL.createObjectURL(blob);
          // window.open(objectUrl);
          let a = document.createElement("a");
          a.href = objectUrl;
          a.download = reportName;
          a.click();
          URL.revokeObjectURL(objectUrl);
          document.body.appendChild(a);
          document.body.removeChild(a);
        }

        return true;


      })
      .catch(this.handleError);
  }

  simpePost(model: any): Promise<any> {
    return this.http.post<ServerDataModel<any>>(`${this.rootUrl}/${this.key}`, model, { headers: this.getHeaders() })
      .toPromise()
      .then((response) => {
        if (!response.isSuccess) {
          return this.handleError(response.message || response.code || 'failed');
        }
        return response.data;
      })
      .catch(this.handleError);
  }

  update(id: number, model: TModel, input?: ServerPageInput, path?: string): Promise<TModel> {
    let parms: HttpParams;
    if (input) {
      parms = this.getQueryParams(input);
    }
    let url = path ? `${this.rootUrl}/${this.key}/${path}` : `${this.rootUrl}/${this.key}/${id}`;
    return this.http.put<ServerDataModel<TModel>>(url, model, { headers: this.getHeaders(), params: parms })
      .toPromise()
      .then((response) => {
        if (!response.isSuccess) {
          return this.handleError(response.message || response.code || 'failed');
        }
        return response.data;
      })
      .catch(this.handleError);
  }

  remove(id: number): Promise<TModel> {
    return this.http.delete<ServerDataModel<TModel>>(`${this.rootUrl}/${this.key}/${id}`, { headers: this.getHeaders() })
      .toPromise()
      .then((response) => {
        if (!response.isSuccess) {
          return this.handleError(response.message || response.code || 'failed');
        }
        return response.data;
      })
      .catch(this.handleError);
  }



  private getHeaders(): HttpHeaders {

    const obj: any = {
      'Content-Type': 'application/json'
    };
    const token = window.localStorage.getItem('token');
    if (token) {
      obj['x-access-token'] = token;
    }
    const headers = new HttpHeaders(obj);
    return headers;
  }

  private handleError(error: any): Promise<any> {
    // console.log('error', error)
    if (error.status === 0) {
      return Promise.reject('There is no internet connection')
    };
    if (error.status) {
      if (error.status === 401) {
        window.onbeforeunload = function () {
          console.log("blank function do nothing")
        }
        return;
        // return Promise.reject('Your are logged Out');
      }
      return Promise.reject(error.statusText);
    }
    if ((error.message && error.message == "no user found") || error == "no user found") {
      localStorage.clear();
      window.location.href = '/';
    }
    return Promise.reject(error.message || error);
  }

  private getQueryParams(input: ServerPageInput): HttpParams {
    let params: HttpParams = new HttpParams();
    _.each(input, (value, key, obj) => {
      if (key === 'query') {
        _.each(value, (keyVal, keyKey) => {
          if (keyVal) {
            params = params.set(keyKey, keyVal);
          }
        });
      } else {
        params = params.set(key, value);
      }
    });
    return params;
  }

  constructor(
    private key: string,
    private http: HttpClient,
    private token?: string) {
    this.rootUrl = `${environment.apiUrls.api}/api`;
  }
}
