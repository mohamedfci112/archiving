import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FileService } from '../../services/file.service';
import { Files } from '../../models/file';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { NotifierService, NotifierOptions } from 'angular-notifier';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-assignfiles',
  templateUrl: './assignfiles.component.html',
  styleUrls: ['./assignfiles.component.css']
})
export class AssignfilesComponent implements OnInit {
  displayedColumns: string[] = ['filename', 'department', 'name'];
  dataSource;
  dataSource1;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  departUser: string;
  files: Files[];
  departs;
  assignId;
  private readonly notifier: NotifierService;
  angForm: FormGroup;
  filnme = 'asd';
  // @Input()  filnme: string;


  constructor(notifierService: NotifierService, private fileService: FileService, private fb: FormBuilder, private router: Router) {
    this.notifier = notifierService;
    this.angForm = this.fb.group({
      filena: ['', Validators.required],
      depart: ['', Validators.required]
      });
  }
// tslint:disable-next-line:typedef
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
// tslint:disable-next-line:typedef
applyFilter1(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource1.filter = filterValue.trim().toLowerCase();

  if (this.dataSource1.paginator) {
    this.dataSource1.paginator.firstPage();
  }
}
// tslint:disable-next-line:typedef angForm1.value.name
unassign(angform, f){
  this.fileService.unAssignedFile(f, angform.value.depart, this.departUser).subscribe(
    data => {
      this.notifier.notify('success', 'The file is unassigned successfuly!');
      // window.location.href = '/assignFiles';
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/assignFiles']);
    },

    error => {
      this.notifier.notify('error', 'Failed!');
    }
  );

}
  ngOnInit(): void {
    this.departUser = localStorage.getItem('archiving_depart');
    this.fileService.getAssignedFile(this.departUser).subscribe(
      data => {
        this.files = data;
        this.dataSource = new MatTableDataSource<Files>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },

      error => {
      }
    );

    //

    this.fileService.getAssignedFileTo(this.departUser).subscribe(
      data => {
        this.files = data;
        this.dataSource1 = new MatTableDataSource<Files>(data);
        this.dataSource1.paginator = this.paginator;
        this.dataSource1.sort = this.sort;
      },

      error => {
      }
    );
  }

}
