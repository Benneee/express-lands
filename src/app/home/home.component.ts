import { CredentialsService } from "./../auth/credentials.service";
import { Logger } from "./../core/logger.service";
import { MockdataService } from "./../providers/mockdata.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { finalize, sample } from "rxjs/operators";
import { untilDestroyed } from "../core/until-destroyed";
import { Router } from "@angular/router";

const log = new Logger("Home");

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoading = false;
  periods = ["This Year", "This Month", "This Week"];
  dataTitle: string;
  colorArray = ["#0F9CDA", "#FBFCFE", "FFFFFF"];
  bgColor: any;
  totalQuantity: any;
  totalExhausted: any;
  totalRemnant: any;
  mockData: any;
  cardsData: any;
  playData: any;
  workData: any;

  public keepOriginalOrder = (a, b) => a.key;

  constructor(
    private mockDataService: MockdataService,
    private toastr: ToastrService,
    private credentialsService: CredentialsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMockData();
  }

  ngOnDestroy(): void {}

  /**
   * dashboardId: "1"
   * totalCardsCount: 60709
   * totalCardsInActive: 7800
   * totalCardsInUse: 35386
   * totalPlayBudget: "839.50"
   * totalPlayBudgetBalance: "559.25"
   * totalPlayBudgetSpent: "724.41"
   * totalWorkBudget: "438.28"
   * totalWorkBudgetBalance: "38.48"
   * totalWorkBudgetSpent: "202.
   */

  getMockData() {
    this.isLoading = true;
    const mockData$ = this.mockDataService.getDashboardResources();
    mockData$
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (res: any) => {
          if (res) {
            this.mockData = res[0];
            // log.debug("data: ", this.mockData);
            const {
              totalCardsCount,
              totalCardsInActive,
              totalCardsInUse,
            } = this.mockData;
            this.cardsData = {
              totalCardsCount,
              totalCardsInActive,
              totalCardsInUse,
              bgColor: this.colorArray[0],
              dataTitle: "Cards Count",
              totalQuantityTitle: "Total Cards",
              totalExhaustedTitle: "Cards in-use",
              totalBalanceTitle: "In-active",
              balanceTile: "In-active",
              totalSpentTile: "In-use",
            };
            const {
              totalPlayBudget,
              totalPlayBudgetBalance,
              totalPlayBudgetSpent,
            } = this.mockData;
            this.playData = {
              totalPlayBudget,
              totalPlayBudgetBalance,
              totalPlayBudgetSpent,
              bgColor: this.colorArray[1],
              dataTitle: "Annual Play Budget",
              totalQuantityTitle: "Total Play (NGN)",
              totalExhaustedTitle: "Total Spent (NGN)",
              totalBalanceTitle: "Balance (NGN)",
              balanceTile: "Balance",
              totalSpentTile: "Total Spent",
            };
            const {
              totalWorkBudget,
              totalWorkBudgetBalance,
              totalWorkBudgetSpent,
            } = this.mockData;
            this.workData = {
              totalWorkBudget,
              totalWorkBudgetBalance,
              totalWorkBudgetSpent,
              bgColor: this.colorArray[2],
              dataTitle: "Annual Work Budget",
              totalQuantityTitle: "Total Work (NGN)",
              totalBalanceTitle: "Balance (NGN)",
              totalExhaustedTitle: "Total Spent (NGN)",
              balanceTile: "Balance",
              totalSpentTile: "Total Spent",
            };
            const dataArray = [this.cardsData, this.playData, this.workData];
            log.debug(dataArray);
          }
        },
        (error) => {
          log.debug("error: ", error);
        }
      );
  }

  logOut() {
    this.credentialsService.setCredentials();
    this.router.navigate(["login"]);
  }
}
