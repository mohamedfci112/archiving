import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { FileService } from '../../services/file.service';
import { NotifierService } from 'angular-notifier';
import { Categories } from 'src/app/models/category';


@Component({
  selector: 'app-automates',
  templateUrl: './automates.component.html',
  styleUrls: ['./automates.component.css']
})
export class AutomatesComponent implements OnInit {

  angForm: FormGroup;
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  fulldateFrom = '';
  fulldateTo = '';
  resultfiles: Array<any> = [];
  departUser;
  private readonly notifier: NotifierService;
  category: Categories[];


  // tslint:disable-next-line:max-line-length
  constructor(notifierService: NotifierService, private fileService: FileService, private fb: FormBuilder, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    this.notifier = notifierService;
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.angForm = this.fb.group({
      name: ['', Validators.required],
      filename: ['', Validators.required],
      category: ['', Validators.required],
      doctype: ['', Validators.required],
      tags: ['', Validators.required],
      desc: ['', Validators.required],
      });
  }
  // tslint:disable-next-line:typedef
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    this.fulldateFrom = this.fromDate.month + '/' + this.fromDate.day + '/' + this.fromDate.year;
    this.fulldateTo = this.toDate.month + '/' + this.toDate.day + '/' + this.toDate.year;
  }
  // tslint:disable-next-line:typedef
  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }
  // tslint:disable-next-line:typedef
  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }
  // tslint:disable-next-line:typedef
  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }
  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
  // tslint:disable-next-line:typedef
  searchdata(angform1){
    const name = angform1.value.name;
    const filename = angform1.value.filename;
    const category = angform1.value.category;
    const doctype = angform1.value.doctype;
    const tags = angform1.value.tags;
    const desc = angform1.value.desc;
    const datefrom = this.fulldateFrom;
    const dateto = this.fulldateTo;
    this.departUser = localStorage.getItem('archiving_depart');
    this.fileService.automates(name, filename, category, doctype, tags, desc, datefrom, dateto, this.departUser).subscribe(
      data => {
        this.resultfiles = data;
        if (data.length === 0){
      this.notifier.notify('error', 'No Results!');
        }
      },

      error => {
      this.notifier.notify('error', 'Failed! '+ error);
      }
    );
  }

  ngOnInit(): void {
    this.departUser = localStorage.getItem('archiving_depart');
    this.fileService.getCategoryAutomates(this.departUser).subscribe(
      data => {
        this.category = data;
      },

      error => {
      }
    );
    //
    //
    //
  }

}
