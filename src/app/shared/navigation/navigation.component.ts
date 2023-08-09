import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FileService } from '../../services/file.service';
import { Categories } from '../../models/category';
import { NotifierService, NotifierOptions } from 'angular-notifier';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  category: Categories[];
  username;
  departUser;
  typeUser;
  admin = false;
  supervisor = false;
  viewer = false;
  angForm: FormGroup;
  angFormcategory: FormGroup;
  angFormFile: FormGroup;
  private readonly notifier: NotifierService;
  searchresults;

  // tslint:disable-next-line:max-line-length
  constructor(notifierService: NotifierService, private modalService: NgbModal, private fb: FormBuilder, private fileService: FileService, private userService: UserService, private router: Router) {
    this.notifier = notifierService;
    this.angForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      depart: ['', Validators.required]
      });

    this.angFormcategory = this.fb.group({
      cname: ['', Validators.required]
      });

    //
    this.angFormFile = this.fb.group({
      file: ['', Validators.required],
      name: ['', Validators.required],
      category: ['', Validators.required],
      dtype: ['', Validators.required],
      tages: ['', Validators.required],
      dec: ['', Validators.required],
      });
  }
  /* Variabe to store file data */
  filedata: any;
  fdate: any;
  searchfor = '';
  // tslint:disable-next-line:typedef
  search(e, content){
    if (e === ''){
      alert('Write any thing please!');
    }
    else{
      const word = e;
      this.departUser = localStorage.getItem('archiving_depart');
      this.fileService.getSearch(this.departUser, word).subscribe(
        data => {
          if (data.length === 0){
            this.notifier.notify('error', 'No files that contains this ' + word + ' !');
          }else{
            this.searchresults = data;
            this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
          }
        },

        error => {
          console.log(error);
        }
      );
    }
  }
  /* File onchange event */
  // tslint:disable-next-line:typedef
  fileEvent(e){
      this.filedata = e.target.files[0];
  }
  /* Upload button functioanlity */
// tslint:disable-next-line:typedef
addFile(angForm3)
{
  const year = new Date().getFullYear();
  const month = new Date().getMonth()+1;
  const day = new Date().getDate();
  this.fdate = year + '/' + month + '/' + day;
  //this.fdate = new Date().toLocaleDateString();
  const depart = localStorage.getItem('archiving_depart');
  const user = localStorage.getItem('archiving_email');
  const myFormData = new FormData();
  myFormData.append('file', this.filedata);
  myFormData.append('name', angForm3.value.name);
  myFormData.append('category', angForm3.value.category);
  myFormData.append('date', this.fdate);
  myFormData.append('dtype', angForm3.value.dtype);
  myFormData.append('tages', angForm3.value.tages);
  myFormData.append('dec', angForm3.value.dec);
  myFormData.append('depart', depart);
  myFormData.append('user', user);
  // tslint:disable-next-line:max-line-length
  // console.log(angForm3.value.file, angForm3.value.name, angForm3.value.category, angForm3.value.date, angForm3.value.dtype, angForm3.value.tages, angForm3.value.dec, depart, user);
  // tslint:disable-next-line:max-line-length
  this.fileService.addFile(myFormData)
  .pipe(first()).subscribe(
  data => {
    console.log(data);
    this.angFormcategory.reset();
    this.modalService.dismissAll();
    this.notifier.notify('success', 'The file is created successfuly!');
    // window.location.reload();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/viewfiles']);
  },

  error => {
    this.notifier.notify('error', 'The file is already exist!');
  });
}
  // tslint:disable-next-line:typedef
  postdata(angForm1)
  {
    // tslint:disable-next-line:max-line-length
    this.userService.userregistration(angForm1.value.name, angForm1.value.email, angForm1.value.password, angForm1.value.type, angForm1.value.depart)
    .pipe(first()).subscribe(
    data => {
      this.angForm.reset();
      this.modalService.dismissAll();
      this.notifier.notify('success', 'The user is created successfuly!');
      // window.location.href = '/';
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/']);
    },

    error => {
      this.notifier.notify('error', 'The user is already taken!');
    });
  }

  // tslint:disable-next-line:typedef
  addCategiry(angForm2)
  {
    const depart = localStorage.getItem('archiving_depart');
    // tslint:disable-next-line:max-line-length
    this.fileService.addCategory(angForm2.value.cname, depart)
    .pipe(first()).subscribe(
    data => {
      this.angFormcategory.reset();
      this.modalService.dismissAll();
      this.notifier.notify('success', 'The category is created successfuly!');
      // window.location.reload();
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/']);
    },

    error => {
      this.notifier.notify('error', 'The category is already exist!');
    });
  }

  // tslint:disable-next-line:typedef
  get email() { return this.angForm.get('email'); }
  // tslint:disable-next-line:typedef
  get password() { return this.angForm.get('password'); }
  // tslint:disable-next-line:typedef
  get name() { return this.angForm.get('name'); }
  // tslint:disable-next-line:typedef
  get type() { return this.angForm.get('type'); }
  // tslint:disable-next-line:typedef
  get depart() { return this.angForm.get('depart'); }
  // tslint:disable-next-line:typedef
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
  // tslint:disable-next-line:typedef
  openuser(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
  // tslint:disable-next-line:typedef
  openCategory(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  // tslint:disable-next-line:typedef
  logout(){
    this.userService.deleteToken();
    localStorage.removeItem('archiving_name');
    localStorage.removeItem('archiving_email');
    localStorage.removeItem('archiving_depart');
    localStorage.removeItem('archiving_user');
    window.location.href = '/login';
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('archiving_name');
    this.departUser = localStorage.getItem('archiving_depart');
    this.typeUser = localStorage.getItem('archiving_user');
    if (this.typeUser == '1'){
      this.admin = true;
    }
    else{
      this.admin = false;
    }
    if (this.typeUser == '0'){
      this.supervisor = true;
    }
    else{
      this.supervisor = false;
    }
    if (this.typeUser == '2'){
      this.viewer = true;
    }
    else{
      this.viewer = false;
    }
    this.fileService.getCategory(this.departUser).subscribe(
      data => {
        this.category = data;
      },

      error => {
      }
    );
    this.angForm.reset();
  }

}
