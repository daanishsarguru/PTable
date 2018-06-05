import {
  Component,
  ViewChild,
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ServerCallerService } from "../services/server-caller.service";
import { Bike } from "../model/bike.model";
import { Friends } from "../model/friends.model";
import { Students } from "../model/students.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent
  implements
    OnInit {
  tableArray = [true, false, false];

  @ViewChild("friendsTable") friendsTable;
  dateTimeOut: any;

  friendsArray: Friends[];
  friendsDisplayedColumns = [
    { field: "id", header: "Id" },
    { field: "name", header: "Name" },
    { field: "dept", header: "Department" },
    { field: "passedSubjects", header: "Passed Subjects" },
    { field: "remarks", header: "Remarks" },
    { field: "date", header: "Date" }
  ];
  friendsFooter = ['', '', '', 0, '', ''];
  refreshFooter = true;

  studentsArray: Students[];
  studentsDisplayedColumns = [
    { field: "rollno", header: "Roll Number" },
    { field: "name", header: "Name" },
    { field: "marks", header: "Marks" }
  ];

  bikesArray: Bike[];
  bikeDisplayedColumns = [
    { field: "srNo", header: "Serial Number" },
    { field: "bikeName", header: "Bike Name" },
    { field: "engine", header: "Engine" }
  ];

  constructor(private serverCaller: ServerCallerService) {}

  ngOnInit(): void {
    this.serverCaller.getData("table1", this.friendsTableCallBack, this);
  }

  public friendsTableCallBack = data => {
    console.log("Inside Friends callback");
    console.log(data);
    this.friendsArray = data;
    this.computeFooter(this.friendsArray);
  };

  public studentsTableCallBack = data => {
    console.log("Inside Students callback");
    console.log(data);
    this.studentsArray = data;
  };

  public bikeTableCallBack = data => {
    console.log("Inside Bike callback");
    console.log(data);
    this.bikesArray = data;
  };

  public showTable = (tableNumber: number) => {
    this.tableArray = [false, false, false];
    this.tableArray[tableNumber] = true;
    if (tableNumber === 0) {
      this.serverCaller.getData("table1", this.friendsTableCallBack, this);
    } else if (tableNumber === 1) {
      this.serverCaller.getData("table2", this.studentsTableCallBack, this);
    } else if (tableNumber === 2) {
      this.serverCaller.getData("table3", this.bikeTableCallBack, this);
    }
  };

  public onFilterValueChanged = friendsTable => {
    console.log(friendsTable);
    if (friendsTable !== undefined) {
      if (Object.keys(friendsTable.filters).length === 0) {
        this.computeFooter(this.friendsArray);
      } else {
        // setTimeout(() => this.computeFooter(this.friendsTable.filteredValue), 500);
        const refreshId = setInterval(() => {
          if (this.friendsTable != null && this.friendsTable.filteredValue != null) {
            this.computeFooter(this.friendsTable.filteredValue);
            clearInterval(refreshId);
          }
        }, 250);
      }
    }
  }

  public computeFooter = friendsArray => {
    debugger;
    this.friendsFooter[3] = 0;
    for (let i = 0; i < friendsArray.length; i++) {
      this.friendsFooter[3] += friendsArray[i].passedSubjects;
    }
  }

  dateFilter = (event, column, table) => {
    if (this.dateTimeOut) {
      clearTimeout(this.dateTimeOut);
    }

    const filterDate = event.target.value.split('-')[2] + '-' + event.target.value.split('-')[1]
            + '-' + event.target.value.split('-')[0];
    if (event.target.value.split('-')[2] === undefined) {
      const filters = table.filters;
      table.reset();
      for (const filter in filters) {
        if (filter === column) {
          continue;
        }
        table.filter(filters[filter].value, filter, filters[filter].matchMode);
      }
      const resetRefreshId = setInterval(() => {
        if (this.friendsTable != null && this.friendsTable.filteredValue != null) {
          this.computeFooter(this.friendsTable.filteredValue);
          clearInterval(resetRefreshId);
        }
      }, 250);
    } else {
      this.dateTimeOut = setTimeout(() => {
        console.log(table);
        table.filter(filterDate, column, 'equals');
      }, 250);
    }
    // setTimeout(() => this.computeFooter(this.friendsTable.filteredValue), 1000);
    const refreshId = setInterval(() => {
      if (this.friendsTable != null && this.friendsTable.filteredValue != null) {
        this.computeFooter(this.friendsTable.filteredValue);
        clearInterval(refreshId);
      }
    }, 250);
  }
}
