import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { ServerCallerService } from '../services/server-caller.service';
import { Bike } from '../model/bike.model';
import { Friends } from '../model/friends.model';
import { Students } from '../model/students.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  tableArray = [true, false, false];

  friendsArray: Friends[];
  friendsDisplayedColumns = [
    {field: 'id', header: 'Id'},
    {field: 'name', header: 'Name'},
    {field: 'dept', header: 'Department'}
  ];
  friendsFooter = ['', 'Total:', '200'];

  studentsArray: Students[];
  studentsDisplayedColumns = [
    {field: 'rollno', header: 'Roll Number'},
    {field: 'name', header: 'Name'},
    {field: 'marks', header: 'Marks'}
  ];

  bikesArray: Bike[];
  bikeDisplayedColumns = [
    {field: 'srNo', header: 'Serial Number'},
    {field: 'bikeName', header: 'Bike Name'},
    {field: 'engine', header: 'Engine'}
  ];

  constructor(private serverCaller: ServerCallerService) {}

  ngOnInit(): void {
    this.serverCaller.getData('table1', this.friendsTableCallBack, this);
  }

  public friendsTableCallBack = (data) => {
    console.log('Inside Friends callback');
    console.log(data);
    this.friendsArray = data;
  }

  public studentsTableCallBack = (data) => {
    console.log('Inside Students callback');
    console.log(data);
    this.studentsArray = data;
  }

  public bikeTableCallBack = (data) => {
    console.log('Inside Bike callback');
    console.log(data);
    this.bikesArray = data;
  }

  public showTable = (tableNumber: number) => {
    this.tableArray = [false, false, false];
    this.tableArray[tableNumber] = true;
    if (tableNumber === 0) {
      this.serverCaller.getData('table1', this.friendsTableCallBack, this);
    } else if (tableNumber === 1) {
      this.serverCaller.getData('table2', this.studentsTableCallBack, this);
    } else if (tableNumber === 2) {
      this.serverCaller.getData('table3', this.bikeTableCallBack, this);
    }

  }
}
