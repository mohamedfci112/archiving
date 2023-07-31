import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';
import { CategoriesGroup } from '../../models/categorygroup';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { NotifierService, NotifierOptions } from 'angular-notifier';
import { Router } from '@angular/router';


@Component({
  selector: 'app-viewfile',
  templateUrl: './viewfile.component.html',
  styleUrls: ['./viewfile.component.css']
})
export class ViewfileComponent implements OnInit {

  departUser;
  category: CategoriesGroup[];
  category1: CategoriesGroup[];
  angFormcategory: FormGroup;
  angFormFile: FormGroup;
  private readonly notifier: NotifierService;
  filedata: any;
  fdate: any;

  constructor(private fileService: FileService,private fb: FormBuilder, private modalService: NgbModal, private router: Router) {
    this.angFormcategory = this.fb.group({
      cname: ['', Validators.required]
      });
    //
    this.angFormFile = this.fb.group({
      file: ['', Validators.required],
      name: ['', Validators.required],
      category1: ['', Validators.required],
      dtype: ['', Validators.required],
      tages: ['', Validators.required],
      dec: ['', Validators.required],
      });
  }
  

  ngOnInit(): void {
    this.departUser = localStorage.getItem('archiving_depart');
    this.fileService.getCategoryGroup(this.departUser).subscribe(
      data => {
        this.category = data;
      },

      error => {
      }
    );

    this.fileService.getCategory(this.departUser).subscribe(
      data => {
        this.category1 = data;
      },

      error => {
      }
    );

  }

  // tslint:disable-next-line:typedef
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
  // tslint:disable-next-line:typedef
  openCategory(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
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
      this.ngOnInit();
      this.modalService.dismissAll();
      this.notifier.notify('success', 'The folder is created successfuly!');
    },

    error => {
      this.notifier.notify('error', 'The folder is already exist!');
    });
  }
  fileEvent(e){
    this.filedata = e.target.files[0];
}
  // tslint:disable-next-line:typedef
addFile(angForm3)
{
  this.fdate = new Date().toLocaleDateString();
  const depart = localStorage.getItem('archiving_depart');
  const user = localStorage.getItem('archiving_email');
  const myFormData = new FormData();
  myFormData.append('file', this.filedata);
  myFormData.append('name', angForm3.value.name);
  myFormData.append('category', angForm3.value.category1);
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
    this.angFormFile.reset();
    this.ngOnInit();
    this.modalService.dismissAll();
    this.notifier.notify('success', 'The file is created successfuly!');
    // window.location.reload();
    //this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    //this.router.onSameUrlNavigation = 'reload';
    //this.router.navigate(['/']);
  },

  error => {
    this.notifier.notify('error', 'The file is already exist!');
  });
}

}
