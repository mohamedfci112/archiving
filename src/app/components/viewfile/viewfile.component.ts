import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';
import { CategoriesGroup } from '../../models/categorygroup';

@Component({
  selector: 'app-viewfile',
  templateUrl: './viewfile.component.html',
  styleUrls: ['./viewfile.component.css']
})
export class ViewfileComponent implements OnInit {

  departUser;
  category: CategoriesGroup[];

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.departUser = localStorage.getItem('archiving_depart');
    this.fileService.getCategoryGroup(this.departUser).subscribe(
      data => {
        this.category = data;
      },

      error => {
      }
    );
  }

}
