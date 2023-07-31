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

@Component({
  selector: 'app-sub4',
  templateUrl: './sub4.component.html',
  styleUrls: ['./sub4.component.css']
})
export class Sub4Component implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'filename', 'date', 'department'];
  dataSource;
  assignedfile;
  category: CategoriesGroup[];
  category1: CategoriesGroup[];
  angFormcategory: FormGroup;

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

  // tslint:disable-next-line:max-line-length
  constructor(notifierService: NotifierService, private fb: FormBuilder, private modalService: NgbModal, private route: ActivatedRoute, private fileService: FileService, private router: Router) {
    this.angFormcategory = this.fb.group({
      cname: ['', Validators.required]
      });

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
  assign(depart) {
    this.fileService.assignFileSub4(this.assignId, this.assignedfile, this.departUser, depart).subscribe(
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
    this.route.params.subscribe(params => {
      this.id = params.id;
    });
  
    this.departUser = localStorage.getItem('archiving_depart');
  
    //get current sub folder files
    this.fileService.getCategoryFileSub4(this.id, this.departUser).subscribe(
      data => {
        this.files = data;
        this.dataSource = new MatTableDataSource<Files>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
  
      error => {
      }
    );

  }

  // tslint:disable-next-line:typedef
  deleteFile(fileid, filename){
    this.departUser = localStorage.getItem('archiving_depart');
    this.emailUser = localStorage.getItem('archiving_email');
    this.fileService.deleteFileSub4(fileid, filename, this.departUser, this.emailUser).subscribe(
      data => {
        this.notifier.notify('success', 'The file is deleted successfuly!');
        // window.location.href = '/page/' + this.id;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/sub4/' + this.id]);
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
    this.fileService.getCategoryFileSub4(catid, this.departUser).subscribe(
      data => {
        this.pagfiles = data;
      },
      error => {
      }
    );
  }

  //add category to sub1 table

  fileEvent(e){
  this.filedata = e.target.files[0];
  }

//

}
