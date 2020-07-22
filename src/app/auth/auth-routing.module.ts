import { LoginComponent } from "./login/login.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { extract } from "../core/helper";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    data: { title: extract("Login") },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AuthRoutingModule {}
