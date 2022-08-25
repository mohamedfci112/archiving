import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  baseUrl = 'http://localhost:8080/archiving_php/';
  // baseUrl = 'https://unicoarchiving.000webhostapp.com//archiving_php/';

  constructor(private httpClient: HttpClient) { }

  // tslint:disable-next-line:typedef
  addFile(myFormData) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
      // tslint:disable-next-line:max-line-length
    return this.httpClient.post<any>(this.baseUrl + 'uploadfile.php', myFormData, {
      // tslint:disable-next-line:object-literal-shorthand
      headers: headers}).pipe(map(Users => {
    return Users;
    }));
  }
  // tslint:disable-next-line:typedef
  addCategory(name, department) {
    const user = localStorage.getItem('archiving_email');
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'addcategory.php', { name, department, user }).pipe(map(Users => {
    return Users;
    }));
  }
  // tslint:disable-next-line:typedef
  getCategory(department) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'getcategory.php', { department }).pipe(map(Data => {
    return Data;
    }));
  }
  // tslint:disable-next-line:typedef
  getCategoryGroup(department) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'getcategorygroup.php', { department }).pipe(map(Data => {
    return Data;
    }));
  }
  // tslint:disable-next-line:typedef
  getCategoryFile(id, department) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'getcategoryfile.php', { id, department }).pipe(map(Data => {
    return Data;
    }));
  }
  // tslint:disable-next-line:typedef
  deleteFile(id, filename, department, user) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'deleteFile.php', { id, filename, department, user }).pipe(map(Data => {
    return Data;
    }));
  }
  // tslint:disable-next-line:typedef
  getTrash(department) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'getTrash.php', { department }).pipe(map(Data => {
    return Data;
    }));
  }
  // tslint:disable-next-line:typedef
  PermanentlyDeleteFile(id, filename, department) {
    const user = localStorage.getItem('archiving_email');
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'PermanentlyDeleteFile.php', { id, filename, department, user }).pipe(map(Data => {
    return Data;
    }));
  }
  // tslint:disable-next-line:typedef
  restoreFile(id, filename, department) {
    const user = localStorage.getItem('archiving_email');
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'restoreFile.php', { id, filename, department, user }).pipe(map(Data => {
    return Data;
    }));
  }
  // tslint:disable-next-line:typedef
  getDepart(department) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'getDepartments.php', { department }).pipe(map(Data => {
    return Data;
    }));
  }
  // tslint:disable-next-line:typedef
  assignFile(id, filename, department, depart) {
    const user = localStorage.getItem('archiving_email');
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'assignFile.php', { id, filename, department, depart, user }).pipe(map(Data => {
    return Data;
    }));
  }
  // tslint:disable-next-line:typedef
  getAssignedFile(department): Observable<any> {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'getAssignFile.php', { department }).pipe(tap(Data => {
    return Data;
    }));
  }
  // tslint:disable-next-line:typedef
  getAssignedFileTo(department) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'getAssignFileTo.php', { department }).pipe(map(Data => {
    return Data;
    }));
  }
  // tslint:disable-next-line:typedef
  unAssignedFile(filename, depart, department) {
    const user = localStorage.getItem('archiving_email');
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'unassignFile.php', { filename, depart, department, user }).pipe(map(Data => {
    return Data;
    }));
  }
  // tslint:disable-next-line:typedef
  getHistory(department) {
    const user = localStorage.getItem('archiving_email');
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'gethistory.php', { department }).pipe(map(Data => {
    return Data;
    }));
  }
  // tslint:disable-next-line:typedef
  getSearch(department, word) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'search.php', { department, word }).pipe(map(Data => {
    return Data;
    }));
  }
  // tslint:disable-next-line:typedef
  automates(name, filename, category, doctype, tags, desc, datefrom, dateto, department) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'automates.php',
    { name, filename, category, doctype, tags, desc, datefrom, dateto, department }).pipe(map(Data => {
    return Data;
    }));
  }
}
