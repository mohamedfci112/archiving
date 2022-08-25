import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FileService } from '../../services/file.service';
import { Files } from '../../models/file';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  displayedColumns: string[] = ['name', 'action', 'user', 'date'];
  dataSource;
  assignedfile;
  departUser;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fileService: FileService) { }

  // tslint:disable-next-line:typedef
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
    this.departUser = localStorage.getItem('archiving_depart');
    this.fileService.getHistory(this.departUser).subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Files>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },

      error => {
      }
    );
  }

}
