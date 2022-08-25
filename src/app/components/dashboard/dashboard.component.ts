import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  departUser;
  dayfiles;
  monthfiles;
  yearfiles;
  allfiles;
  usercount;
  recentfiles;
  recentassignfiles;

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Drilling', 'Environmental', 'Finance', 'Lifting', 'NORM', 'QHSE'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0], label: 'Uploaded Files Per Department' },
  ];

   // Pie
   public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = ['Drilling', 'Environmental', 'Finance', 'Lifting', 'NORM', 'QHSE'];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'red', 'blue', 'yellow', 'green'],
    },
  ];
  constructor(private ds: DashboardService) { }

  ngOnInit(): void {
    this.departUser = localStorage.getItem('archiving_depart');
    this.ds.getDayFiles(this.departUser).subscribe(
      data => {
        this.dayfiles = data;
      },

      error => {
      }
    );
    //
    this.ds.getMonthFiles(this.departUser).subscribe(
      data => {
        this.monthfiles = data;
        console.log(this.monthfiles);
      },

      error => {
      }
    );
    //
    this.ds.getYearFiles(this.departUser).subscribe(
      data => {
        this.yearfiles = data;
      },

      error => {
      }
    );
    //
    this.ds.getAllFiles(this.departUser).subscribe(
      data => {
        this.allfiles = data;
      },

      error => {
      }
    );
    //
    this.ds.getRecentFiles(this.departUser).subscribe(
      data => {
        this.recentfiles = data;
      },

      error => {
      }
    );
    //
    this.ds.getRecentAssignedFiles(this.departUser).subscribe(
      data => {
        this.recentassignfiles = data;
      },

      error => {
      }
    );
    //
    this.ds.getUserCount(this.departUser).subscribe(
      data => {
        this.usercount = data;
        // tslint:disable-next-line:radix
        const driling = parseInt(this.usercount[0].num);
        // tslint:disable-next-line:radix
        const environment = parseInt(this.usercount[1].num);
        // tslint:disable-next-line:radix
        const finance = parseInt(this.usercount[2].num);
        // tslint:disable-next-line:radix
        const lifting = parseInt(this.usercount[3].num);
        // tslint:disable-next-line:radix
        const norm = parseInt(this.usercount[4].num);
        // tslint:disable-next-line:radix
        const qhse = parseInt(this.usercount[5].num);
        // this.pieChartData = [driling, environment, finance, lifting, norm, qhse];
        this.pieChartData.push(driling);
        this.pieChartData.push(environment);
        this.pieChartData.push(finance);
        this.pieChartData.push(lifting);
        this.pieChartData.push(norm);
        this.pieChartData.push(qhse);
      },
      error => {
      }
    );
    //
    this.ds.getUploadDepart(this.departUser).subscribe(
      data => {
        this.usercount = data;
        // tslint:disable-next-line:radix
        const bardriling = parseInt(this.usercount[0].num);
        // tslint:disable-next-line:radix
        const barenvironment = parseInt(this.usercount[1].num);
        // tslint:disable-next-line:radix
        const barfinance = parseInt(this.usercount[2].num);
        // tslint:disable-next-line:radix
        const barlifting = parseInt(this.usercount[3].num);
        // tslint:disable-next-line:radix
        const barnorm = parseInt(this.usercount[4].num);
        // tslint:disable-next-line:radix
        const barqhse = parseInt(this.usercount[5].num);
        this.barChartData[0].data = [bardriling, barenvironment, barfinance, barlifting, barnorm, barqhse];
      },
      error => {
      }
    );
  }

}
