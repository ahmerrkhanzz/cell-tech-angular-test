import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CategoryService {
  constructor(private _http: HttpClient) {}
  getCategories = () => {
    let url: string = "../../../assets/mock/categories.json";
    return this._http.get(url);
  };
}
