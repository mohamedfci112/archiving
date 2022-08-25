import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseUrl = 'http://localhost:8080/archiving_php/';
  // baseUrl = 'https://unicoarchiving.000webhostapp.com//archiving_php/';

  constructor(private httpClient: HttpClient) { }

  // tslint:disable-next-line:typedef
  getDayFiles(department) {
    const day = new Date().toLocaleDateString();
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'dashboardDay.php', { department, day }).pipe(map(Data => {
    return Data;
    }));
  }
  // tslint:disable-next-line:typedef
  getMonthFiles(department) {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const firstday = month + '/' + '1' + '/' + year;
    const lastday = month + '/' + '31' + '/' + year;
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'dashboardMonth.php', { department, firstday, lastday }).pipe(map(Data => {
    return Data;
    }));
  }
  // tslint:disable-next-line:typedef
  getYearFiles(department) {
    const year = new Date().getFullYear();
    const firstdate = '1' + '/' + '1' + '/' + year;
    const lastdate = '12' + '/' + '31' + '/' + year;
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'dashboardYear.php', { department, firstdate, lastdate }).pipe(map(Data => {
    return Data;
    }));
  }
  // tslint:disable-next-line:typedef
  getAllFiles(department) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'dashboardallfiles.php', { department }).pipe(map(Data => {
    return Data;
    }));
  }
  // tslint:disable-next-line:typedef
  getUserCount(department) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'dashboardUsercount.php', { department }).pipe(map(Data => {
    return Data;
    }));
  }
  // tslint:disable-next-line:typedef
  getUploadDepart(department) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'dashboardUploadedDepart.php', { department }).pipe(map(Data => {
    return Data;
    }));
  }
  // tslint:disable-next-line:typedef
  getRecentFiles(department) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'getRecentFiles.php', { department }).pipe(map(Data => {
    return Data;
    }));
  }
  // tslint:disable-next-line:typedef
  getRecentAssignedFiles(department) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'getRecentAssignFile.php', { department }).pipe(map(Data => {
    return Data;
    }));
  }
}
