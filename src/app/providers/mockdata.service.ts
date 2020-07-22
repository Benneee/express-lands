import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "./../core/base.service";
import { Injectable } from "@angular/core";

const routes = {
  dashboardResources: "dashboard",
};

@Injectable({
  providedIn: "root",
})
export class MockdataService extends BaseService<any> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getDashboardResources(): Observable<any> {
    return this.sendGet(this.baseUrl(routes.dashboardResources));
  }
}
