import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color } from 'ng2-charts';
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
    title: {
      text: 'Uploaded Files Per Department',
      display: true
    },
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
  public barChartLabels: Label[] = ['Drilling', 'Environmental', 'Finance', 'Lifting', 'NORM', 'QHSE', 'Production'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartColors: Color[] = [
    { backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'red', 'blue', 'yellow', 'green', 'gray'] }
  ]

  public barChartData: ChartDataSets[] = [
    { data: [0,0,0,0,0,0,0], label: "Departments" }
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
  public pieChartLabels: Label[] = ['Drilling', 'Environmental', 'Finance', 'Lifting', 'NORM', 'QHSE', 'Production'];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'red', 'blue', 'yellow', 'green', 'gray'],
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
        if(parseInt(this.usercount[0].drilling) > 0)
        {
        const driling = parseInt(this.usercount[0].drilling);
        this.pieChartData.push(driling);
        }
        else
        {
        const driling = 0;
        this.pieChartData.push(driling);
        }
        // tslint:disable-next-line:radix
        
        if(parseInt(this.usercount[0].environmental) > 0)
        {
          const environment = parseInt(this.usercount[0].environmental);
        this.pieChartData.push(environment);
        }
        else
        {
        const environment = 0;
        this.pieChartData.push(environment);
        }
        // tslint:disable-next-line:radix
        
        if(parseInt(this.usercount[0].finance) > 0)
        {
          const finance = parseInt(this.usercount[0].finance);
          this.pieChartData.push(finance);
        }
        else
        {
        const finance = 0;
        this.pieChartData.push(finance);
        }
        // tslint:disable-next-line:radix
        
        if(parseInt(this.usercount[0].lifting) > 0)
        {
          const lifting = parseInt(this.usercount[0].lifting);
          this.pieChartData.push(lifting);
        }
        else
        {
        const lifting = 0;
        this.pieChartData.push(lifting);
        }
        // tslint:disable-next-line:radix
        
        if(parseInt(this.usercount[0].norm) > 0)
        {
          const norm = parseInt(this.usercount[0].norm);
          this.pieChartData.push(norm);
        }
        else
        {
        const norm = 0;
        this.pieChartData.push(norm);
        }
        // tslint:disable-next-line:radix
        
        if(parseInt(this.usercount[0].qhse) > 0)
        {
          const qhse = parseInt(this.usercount[0].qhse);
          this.pieChartData.push(qhse);
        }
        else
        {
        const qhse = 0;
        this.pieChartData.push(qhse);
        }
        // tslint:disable-next-line:radix
        
        if(parseInt(this.usercount[0].production) > 0)
        {
          const production = parseInt(this.usercount[0].production);
          this.pieChartData.push(production);
        }
        else
        {
        const production = 0;
        this.pieChartData.push(production);
        }
        // this.pieChartData = [driling, environment, finance, lifting, norm, qhse,production];
      },
      error => {
      }
    );
    //
    this.ds.getUploadDepart(this.departUser).subscribe(
      data => {
        this.usercount = data;
        // tslint:disable-next-line:radix
        var bardriling;
        if(parseInt(this.usercount[0].drilling) > 0)
        {
          bardriling = parseInt(this.usercount[0].drilling);
        }
        else
        {
          bardriling = 0;
        }
        // tslint:disable-next-line:radix
        
        var barenvironment;
        if(parseInt(this.usercount[0].environmental) > 0)
        {
          barenvironment = parseInt(this.usercount[0].environmental);
        }
        else
        {
          barenvironment = 0;
        }
        // tslint:disable-next-line:radix
        
        var barfinance;
        if(parseInt(this.usercount[0].finance) > 0)
        {
          barfinance = parseInt(this.usercount[0].finance);
        }
        else
        {
          barfinance = 0;
        }
        // tslint:disable-next-line:radix
        
        var barlifting;
        if(parseInt(this.usercount[0].lifting) > 0)
        {
          barlifting = parseInt(this.usercount[0].lifting);
        }
        else
        {
          barlifting = 0;
        }
        // tslint:disable-next-line:radix
        
        var barnorm;
        if(parseInt(this.usercount[0].norm) > 0)
        {
          barnorm = parseInt(this.usercount[0].norm);
        }
        else
        {
          barnorm = 0;
        }
        // tslint:disable-next-line:radix
        
        var barqhse;
        if(parseInt(this.usercount[0].qhse) > 0)
        {
          barqhse = parseInt(this.usercount[0].qhse);
        }
        else
        {
          barqhse = 0;
        }

        // tslint:disable-next-line:radix
        
        var barproduction;
        if(parseInt(this.usercount[0].production) > 0)
        {
          barproduction = parseInt(this.usercount[0].production);
        }
        else
        {
          barproduction = 0;
        }

        this.barChartData[0].data = [bardriling, barenvironment, barfinance, barlifting, barnorm, barqhse, barproduction];
      },
      error => {
      }
    );
  }

}
