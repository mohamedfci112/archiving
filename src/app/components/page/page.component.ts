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



@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'filename', 'date', 'department'];
  dataSource;
  assignedfile;

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


// tslint:disable-next-line:max-line-length
constructor(notifierService: NotifierService, private modalService: NgbModal, private route: ActivatedRoute, private fileService: FileService, private router: Router) {
  this.notifier = notifierService;
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
  this.fileService.assignFile(this.assignId, this.assignedfile, this.departUser, depart).subscribe(
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
    //
    this.departUser = localStorage.getItem('archiving_depart');
    this.fileService.getCategoryFile(this.id, this.departUser).subscribe(
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
    this.fileService.deleteFile(fileid, filename, this.departUser, this.emailUser).subscribe(
      data => {
        this.notifier.notify('success', 'The file is deleted successfuly!');
        // window.location.href = '/page/' + this.id;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/page/' + this.id]);
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
    this.fileService.getCategoryFile(catid, this.departUser).subscribe(
      data => {
        this.pagfiles = data;
      },
      error => {
      }
    );
  }

}
