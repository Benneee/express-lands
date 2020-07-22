import { HomeComponent } from "./home.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { extract } from "../core/helper";
import { AuthGuard } from "../auth/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "home",
    component: HomeComponent,
    data: { title: extract("Home") },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
