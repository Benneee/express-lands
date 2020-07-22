import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "./../core/base.service";
import { Injectable } from "@angular/core";

const routes = {
  login: "login/",
};

export interface LoginCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService extends BaseService<any> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  login(payload: LoginCredentials): Observable<any> {
    return this.sendPost(this.baseUrl(routes.login), payload);
  }
}
