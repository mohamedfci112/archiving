import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FileService } from '../../services/file.service';
import { Files } from '../../models/file';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';


@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
  departUser: string;
  emailUser: string;
  files: Files[];
  pagfiles: Files[];
  private readonly notifier: NotifierService;
  displayedColumns: string[] = ['name', 'filename', 'date', 'department'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(notifierService: NotifierService, private fileService: FileService, private router: Router) {
  this.notifier = notifierService;
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
  restore(fileid, filename){
    this.departUser = localStorage.getItem('archiving_depart');
    this.fileService.restoreFile(fileid, filename, this.departUser).subscribe(
      data => {
        this.notifier.notify('success', 'The file is restored successfuly!');
        // window.location.href = '/trash';
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/trash']);
      },

      error => {
        this.notifier.notify('error', 'Failed! check your internet please...');
      }
    );
  }
  // tslint:disable-next-line:typedef
  PermanentlyDeleteFile(fileid, filename){
    const result = confirm('Are you sure you want to delete this file? ' + filename);
    if (result) {
      this.departUser = localStorage.getItem('archiving_depart');
      this.fileService.PermanentlyDeleteFile(fileid, filename, this.departUser).subscribe(
      data => {
        this.notifier.notify('success', 'The file is deleted successfuly!');
        // window.location.href = '/trash';
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/trash']);
      },

      error => {
        this.notifier.notify('error', 'Failed! check your internet please...');
      }
    );
    }
  }
  ngOnInit(): void {
    this.departUser = localStorage.getItem('archiving_depart');
    this.fileService.getTrash(this.departUser).subscribe(
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

}
