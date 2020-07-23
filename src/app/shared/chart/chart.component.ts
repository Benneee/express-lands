import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.scss"],
})
export class ChartComponent implements OnInit {
  periods = ["This Year", "This Month", "This Week"];

  @Input() title: string;
  @Input() totalQuantity: any;
  @Input() totalExhausted: any;
  @Input() totalRemnant: any;
  @Input() bgColor: any;
  @Input() imgSrc: string;
  @Input() totalQuantityTitle: string;
  @Input() totalExhaustedTitle: string;
  @Input() totalBalanceTitle: string;
  @Input() balanceTile: string;
  @Input() totalSpentTile: string;

  constructor() {}

  ngOnInit(): void {}
}
