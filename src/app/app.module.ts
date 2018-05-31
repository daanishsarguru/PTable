import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { DataTableModule, InputTextareaModule, PanelModule, DropdownModule, SharedModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';

import { CommonModule} from '@angular/common';

import {ServerCallerService} from '../services/server-caller.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    DataTableModule, InputTextareaModule, PanelModule, DropdownModule, SharedModule, TableModule
  ],
  providers: [ServerCallerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
