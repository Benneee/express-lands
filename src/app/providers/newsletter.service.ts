import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class NewsletterService {
  constructor(private http: HttpClient) {}

  addPushSubscriber(sub: any): Observable<any> {
    return this.http.post("/api/notifications", sub);
  }

  send(): Observable<any> {
    return this.http.post("/api/newsletter", null);
  }
}
