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
  addFileSub1(myFormData) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
      // tslint:disable-next-line:max-line-length
    return this.httpClient.post<any>(this.baseUrl + 'uploadfilesub1.php', myFormData, {
      // tslint:disable-next-line:object-literal-shorthand
      headers: headers}).pipe(map(Users => {
    return Users;
    }));
  }

  // tslint:disable-next-line:typedef
  addFileSub2(myFormData) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
      // tslint:disable-next-line:max-line-length
    return this.httpClient.post<any>(this.baseUrl + 'uploadfilesub2.php', myFormData, {
      // tslint:disable-next-line:object-literal-shorthand
      headers: headers}).pipe(map(Users => {
    return Users;
    }));
  }

  // tslint:disable-next-line:typedef
  addFileSub3(myFormData) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
      // tslint:disable-next-line:max-line-length
    return this.httpClient.post<any>(this.baseUrl + 'uploadfilesub3.php', myFormData, {
      // tslint:disable-next-line:object-literal-shorthand
      headers: headers}).pipe(map(Users => {
    return Users;
    }));
  }

  // tslint:disable-next-line:typedef
  addFileSub4(myFormData) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
      // tslint:disable-next-line:max-line-length
    return this.httpClient.post<any>(this.baseUrl + 'uploadfilesub4.php', myFormData, {
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

  //add sub1 folders
  addCategorySub1(name, parent, department) {
    const user = localStorage.getItem('archiving_email');
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'addcategorysub1.php', { name, parent, department, user }).pipe(map(Users => {
    return Users;
    }));
  }

  //add sub2 folders
  addCategorySub2(name, parent, department) {
    const user = localStorage.getItem('archiving_email');
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'addcategorysub2.php', { name, parent, department, user }).pipe(map(Users => {
    return Users;
    }));
  }

  //add sub3 folders
  addCategorySub3(name, parent, department) {
    const user = localStorage.getItem('archiving_email');
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'addcategorysub3.php', { name, parent, department, user }).pipe(map(Users => {
    return Users;
    }));
  }

  //add sub4 folders
  addCategorySub4(name, parent, department) {
    const user = localStorage.getItem('archiving_email');
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'addcategorysub4.php', { name, parent, department, user }).pipe(map(Users => {
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
  getCategorySub1(department, p) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'getcategorysub1.php', { department, p }).pipe(map(Data => {
    return Data;
    }));
  }

  // tslint:disable-next-line:typedef
  getCategorySub2(department, p) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'getcategorysub1.php', { department, p }).pipe(map(Data => {
    return Data;
    }));
  }

  // tslint:disable-next-line:typedef
  getCategorySub3(department, p) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'getcategorysub1.php', { department, p }).pipe(map(Data => {
    return Data;
    }));
  }

  // tslint:disable-next-line:typedef
  getCategorySub4(department, p) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'getcategorysub1.php', { department, p }).pipe(map(Data => {
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
  getCategoryGroupSub1(parent, department) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'getcategorygroupsub1.php', { parent, department }).pipe(map(Data => {
    return Data;
    }));
  }

  // tslint:disable-next-line:typedef
  getCategoryGroupSub2(parent, department) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'getcategorygroupsub2.php', { parent, department }).pipe(map(Data => {
    return Data;
    }));
  }

  // tslint:disable-next-line:typedef
  getCategoryGroupSub3(parent, department) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'getcategorygroupsub3.php', { parent, department }).pipe(map(Data => {
    return Data;
    }));
  }

  // tslint:disable-next-line:typedef
  getCategoryGroupSub4(parent, department) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'getcategorygroupsub4.php', { parent, department }).pipe(map(Data => {
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
  getCategoryFileSub1(id, department) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'getcategoryfilesub1.php', { id, department }).pipe(map(Data => {
    return Data;
    }));
  }

  // tslint:disable-next-line:typedef
  getCategoryFileSub2(id, department) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'getcategoryfilesub2.php', { id, department }).pipe(map(Data => {
    return Data;
    }));
  }

  // tslint:disable-next-line:typedef
  getCategoryFileSub3(id, department) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'getcategoryfilesub3.php', { id, department }).pipe(map(Data => {
    return Data;
    }));
  }

  // tslint:disable-next-line:typedef
  getCategoryFileSub4(id, department) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'getcategoryfilesub4.php', { id, department }).pipe(map(Data => {
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
  deleteFileSub1(id, filename, department, user) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'deleteFileSub1.php', { id, filename, department, user }).pipe(map(Data => {
    return Data;
    }));
  }

  // tslint:disable-next-line:typedef
  deleteFileSub2(id, filename, department, user) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'deleteFileSub2.php', { id, filename, department, user }).pipe(map(Data => {
    return Data;
    }));
  }

  // tslint:disable-next-line:typedef
  deleteFileSub3(id, filename, department, user) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'deleteFileSub3.php', { id, filename, department, user }).pipe(map(Data => {
    return Data;
    }));
  }

  // tslint:disable-next-line:typedef
  deleteFileSub4(id, filename, department, user) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'deleteFileSub4.php', { id, filename, department, user }).pipe(map(Data => {
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
  assignFileSub1(id, filename, department, depart) {
    const user = localStorage.getItem('archiving_email');
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'assignFileSub1.php', { id, filename, department, depart, user }).pipe(map(Data => {
    return Data;
    }));
  }

  // tslint:disable-next-line:typedef
  assignFileSub2(id, filename, department, depart) {
    const user = localStorage.getItem('archiving_email');
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'assignFileSub2.php', { id, filename, department, depart, user }).pipe(map(Data => {
    return Data;
    }));
  }

  // tslint:disable-next-line:typedef
  assignFileSub3(id, filename, department, depart) {
    const user = localStorage.getItem('archiving_email');
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'assignFileSub3.php', { id, filename, department, depart, user }).pipe(map(Data => {
    return Data;
    }));
  }

  // tslint:disable-next-line:typedef
  assignFileSub4(id, filename, department, depart) {
    const user = localStorage.getItem('archiving_email');
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'assignFileSub4.php', { id, filename, department, depart, user }).pipe(map(Data => {
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
  getCategoryAutomates(department) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'getcategoryautomates.php', { department }).pipe(map(Data => {
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

  // tslint:disable-next-line:typedef
  editCategory(oldC, newC, department) {
    const user = localStorage.getItem('archiving_email');
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'editcategory.php', { oldC, newC, department, user }).pipe(map(Users => {
    return Users;
    }));
  }

  // tslint:disable-next-line:typedef
  editCategorySub1(oldC, newC, department) {
    const user = localStorage.getItem('archiving_email');
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'editcategorysub1.php', { oldC, newC, department, user }).pipe(map(Users => {
    return Users;
    }));
  }

  // tslint:disable-next-line:typedef
  editCategorySub2(oldC, newC, department) {
    const user = localStorage.getItem('archiving_email');
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'editcategorysub2.php', { oldC, newC, department, user }).pipe(map(Users => {
    return Users;
    }));
  }

  // tslint:disable-next-line:typedef
  editCategorySub3(oldC, newC, department) {
    const user = localStorage.getItem('archiving_email');
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'editcategorysub3.php', { oldC, newC, department, user }).pipe(map(Users => {
    return Users;
    }));
  }

  // tslint:disable-next-line:typedef
  editCategorySub4(oldC, newC, department) {
    const user = localStorage.getItem('archiving_email');
    // tslint:disable-next-line:no-shadowed-variable
    return this.httpClient.post<any>(this.baseUrl + 'editcategorysub4.php', { oldC, newC, department, user }).pipe(map(Users => {
    return Users;
    }));
  }

}
