import { Component, OnInit, ViewChild } from '@angular/core';
import { FileService } from '../../services/file.service';
import { CategoriesGroup } from '../../models/categorygroup';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { NotifierService, NotifierOptions } from 'angular-notifier';
import { Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';
import { AlertPromise } from '../../../../node_modules/@types/selenium-webdriver';


@Component({
  selector: 'app-viewfile',
  templateUrl: './viewfile.component.html',
  styleUrls: ['./viewfile.component.css']
})
export class ViewfileComponent implements OnInit {

  // we create an object that contains coordinates
  menuTopLeftPosition =  {x: 0, y: 0}

  // reference to the MatMenuTrigger in the DOM
  @ViewChild(MatMenuTrigger, {static: true}) matMenuTrigger: MatMenuTrigger;

  /**
   * Method called when the user click with the right button
   * @param event MouseEvent, it contains the coordinates
   * @param item Our data contained in the row of the table
   */
  
  departUser;
  username;
  typeUser;
  admin = false;
  supervisor = false;
  viewer = false;
  
  category: CategoriesGroup[];
  category1: CategoriesGroup[];
  angFormcategory: FormGroup;
  angFormEditcategory: FormGroup;
  angFormFile: FormGroup;
  private readonly notifier: NotifierService;
  filedata:string  []  =  [];
  fdate: any;
  cname1:any="";
  cname11:any="";

  constructor(notifierService: NotifierService, private fileService: FileService,private fb: FormBuilder, private modalService: NgbModal, private router: Router) {
    this.notifier = notifierService;
    
    this.angFormcategory = this.fb.group({
      cname: ['', Validators.required]
      });
    //
    this.angFormEditcategory = this.fb.group({
      cname2: ['', Validators.required],
      cname3: ['', Validators.required]
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


  onRightClick(event: MouseEvent, item) 
  {
    // preventDefault avoids to show the visualization of the right-click menu of the browser
    event.preventDefault();

    // we record the mouse position in our object
    this.menuTopLeftPosition.x = event.clientX;
    this.menuTopLeftPosition.y = event.clientY;

    // we open the menu
    // we pass to the menu the information about our object
    this.matMenuTrigger.menuData = {item: item}

    // we open the menu
    this.matMenuTrigger.openMenu();
  }

  // tslint:disable-next-line:typedef
  openEditCategory(content3, folderName) {
  this.cname11 = folderName;

  this.modalService.open(content3, {ariaLabelledBy: 'modal-basic-title'});
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

  //add category to sub1 table
  // tslint:disable-next-line:typedef
  editCategory(angForm3)
  {
    const depart = localStorage.getItem('archiving_depart');

    if(angForm3.value.cname2.length < 4)
    {
      this.notifier.notify('error', 'The folder name must be at least 4 letters!');
    }
    else
    {
      // tslint:disable-next-line:max-line-length
      this.fileService.editCategory(this.cname11, angForm3.value.cname2, depart)
      .pipe(first()).subscribe(
      data => {
        this.angFormEditcategory.reset();
        this.ngOnInit();
        this.modalService.dismissAll();
        this.notifier.notify('success', 'The folder is edited successfuly!');
      },

      error => {
        //console.log(error.status);
        if(error.status == 400)
        {
        this.notifier.notify('error', 'The folder name is already exist before!');
        }
        else if(error.status == 404)
        {
          this.notifier.notify('error', 'The folder name is not exist!');
        }
      });
    }
  }


  fileEvent(e){
    for (var i =  0; i <  e.target.files.length; i++)
    {  
      this.filedata.push(e.target.files[i]);
    }
}
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

  for  (var i =  0; i <  this.filedata.length; i++)
  {  
    myFormData.append("file[]",  this.filedata[i]);
  }

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
