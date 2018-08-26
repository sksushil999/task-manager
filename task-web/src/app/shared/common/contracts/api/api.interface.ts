import { ServerPageInput } from './page-input';
import { ServerDataModel } from './server-data-model';
import { ServerPageModel } from './server-page-model';
import { Observable } from 'rxjs/Rx';
import { IGetParams } from './get-params.interface';

export interface IApi<TModel> {
  get(id: number): Promise<TModel>;
  simpleGet(input?: IGetParams): Promise<any>;
  search(input: ServerPageInput): Promise<ServerPageModel<TModel>>;
  create(model: TModel, path?: string): Promise<TModel>;
  update(id: number, model: TModel, input?: ServerPageInput, path?: string): Promise<TModel>;
  remove(id: number): Promise<TModel>;
  simpePost(model: any): Promise<TModel>;
  exportReport(input: ServerPageInput, path?: string, reportName?: string): Promise<TModel>;
}
