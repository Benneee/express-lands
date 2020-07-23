import { AuthService } from "./../../providers/auth.service";
import { Logger } from "./../../core/logger.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { finalize } from "rxjs/operators";
import { untilDestroyed } from "src/app/core/until-destroyed";
import { Credentials, CredentialsService } from "../credentials.service";
import { Router, ActivatedRoute } from "@angular/router";

const log = new Logger("Login");
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  loginForm: FormGroup;
  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private authService: AuthService,
    private credentialsService: CredentialsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  ngOnDestroy() {}

  initLoginForm() {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  submit() {
    log.debug("values: ", this.loginForm.value);
    this.isLoading = true;
    const payload = this.loginForm.value;
    const login$ = this.authService.login(payload);
    login$
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (res: any) => {
          if (res) {
            if (res.verification_status === true) {
              const credentials: Credentials = {
                id: res.id,
                username: res.username,
                name: res.name,
                notification_count: res.notification_count,
                verification_status: res.verification_status,
              };
              this.credentialsService.setCredentials(credentials);
              this.toastr.success("Login successful");
              this.router.navigate(
                [this.route.snapshot.queryParams.redirect || "/"],
                { replaceUrl: true }
              );
            } else {
              this.toastr.info("Kindly verify your account", "Login", {
                closeButton: true,
                disableTimeOut: true,
              });
            }
          }
        },
        (error) => {
          log.debug("error: ", error);
        }
      );
  }

  get controls() {
    return this.loginForm.controls;
  }
}
