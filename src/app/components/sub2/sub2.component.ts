import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../../services/file.service';
import { Files } from '../../models/file';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { NotifierService, NotifierOptions } from 'angular-notifier';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '../../../../node_modules/@angular/forms';
import { CategoriesGroup } from '../../models/categorygroup';
import { first } from 'rxjs/operators';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-sub2',
  templateUrl: './sub2.component.html',
  styleUrls: ['./sub2.component.css']
})
export class Sub2Component implements OnInit, AfterViewInit {

  // we create an object that contains coordinates
  menuTopLeftPosition =  {x: 0, y: 0}

  // reference to the MatMenuTrigger in the DOM
  @ViewChild(MatMenuTrigger, {static: true}) matMenuTrigger: MatMenuTrigger;

  /**
   * Method called when the user click with the right button
   * @param event MouseEvent, it contains the coordinates
   * @param item Our data contained in the row of the table
   */

  displayedColumns: string[] = ['name', 'filename', 'date', 'department'];
  dataSource;
  assignedfile;
  category: CategoriesGroup[];
  category1: CategoriesGroup[];
  angFormcategory: FormGroup;
  angFormEditcategory: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  id;
  departUser: string;
  emailUser: string;
  files: Files[];
  pagfiles: Files[];
  departs;
  assignId;
  private readonly notifier: NotifierService;
  angFormFile: FormGroup;
  fdate: any;
  filedata: any;

  username;
  typeUser;
  admin = false;
  supervisor = false;
  viewer = false;

  cname11:any="";

// tslint:disable-next-line:max-line-length
constructor(notifierService: NotifierService, private fb: FormBuilder, private modalService: NgbModal, private route: ActivatedRoute, private fileService: FileService, private router: Router) {
  this.angFormcategory = this.fb.group({
    cname: ['', Validators.required]
    });
  //
  this.angFormEditcategory = this.fb.group({
    cname2: ['', [Validators.required,Validators.minLength(3)]],
    cname3: ['', Validators.required]
    });
  //
  this.notifier = notifierService;
  this.angFormFile = this.fb.group({
    file: ['', Validators.required],
    name: ['', Validators.required],
    category1: ['', Validators.required],
    dtype: ['', Validators.required],
    tages: ['', Validators.required],
    dec: ['', Validators.required],
    });
  }

  // tslint:disable-next-line:typedef
ngAfterViewInit() {

}
// tslint:disable-next-line:typedef
open(content, id, filename) {
  this.assignId = id;
  this.assignedfile = filename;
  this.fileService.getDepart(this.departUser).subscribe(
    data => {
      this.departs = data;
    },

    error => {
    }
  );
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
}
// tslint:disable-next-line:typedef
open1(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
}
// tslint:disable-next-line:typedef
openCategory(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
}
// tslint:disable-next-line:typedef
assign(depart) {
  this.fileService.assignFileSub2(this.assignId, this.assignedfile, this.departUser, depart).subscribe(
    data => {
      this.notifier.notify('success', 'The file is assigned to ' + depart + ' successfuly!');
    },

    error => {
      console.log(error.status);
      if (error.status === 400){
        this.notifier.notify('error', 'You assigned this file to (' + depart + ') before!!');
      }
      else if (error.status === 404){
        this.notifier.notify('error', 'Failed! try again or check your internet please...');
      }
    }
  );
}
// tslint:disable-next-line:typedef
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
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

  this.route.params.subscribe(params => {
    this.id = params.id;
  });

  this.departUser = localStorage.getItem('archiving_depart');
  
  //get folders
  this.fileService.getCategoryGroupSub3(this.id, this.departUser).subscribe(
    data => {
      this.category = data;
    },

    error => {
    }
  );

  //get current sub folder files
  this.fileService.getCategoryFileSub2(this.id, this.departUser).subscribe(
    data => {
      this.files = data;
      this.dataSource = new MatTableDataSource<Files>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },

    error => {
    }
  );

    // get categoreis current sub
    this.fileService.getCategorySub1(this.departUser, this.id).subscribe(
    data => {
      this.category1 = data;
    },

    error => {
    }
  );
}

// tslint:disable-next-line:typedef
deleteFile(fileid, filename){
  this.departUser = localStorage.getItem('archiving_depart');
  this.emailUser = localStorage.getItem('archiving_email');
  this.fileService.deleteFileSub2(fileid, filename, this.departUser, this.emailUser).subscribe(
    data => {
      this.notifier.notify('success', 'The file is deleted successfuly!');
      // window.location.href = '/page/' + this.id;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/sub2/' + this.id]);
    },

    error => {
      this.notifier.notify('error', 'Failed! check your internet please...');
    }
  );
}
// tslint:disable-next-line:typedef
pagFiles(){
  let catid;
  this.route.params.subscribe(params => {
    catid = params.id;
  });
  //
  this.departUser = localStorage.getItem('archiving_depart');
  this.fileService.getCategoryFileSub2(catid, this.departUser).subscribe(
    data => {
      this.pagfiles = data;
    },
    error => {
    }
  );
}

//add category to sub1 table
// tslint:disable-next-line:typedef
addCategiry(angForm2)
{
  const depart = localStorage.getItem('archiving_depart');
  // tslint:disable-next-line:max-line-length
  this.fileService.addCategorySub3(angForm2.value.cname, this.id, depart)
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
//

fileEvent(e){
this.filedata = e.target.files[0];
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
this.fileService.addFileSub3(myFormData)
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
//

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
      this.fileService.editCategorySub3(this.cname11, angForm3.value.cname2, depart)
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

}
