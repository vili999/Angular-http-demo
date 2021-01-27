// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UsersComponent } from './pages/users/users.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    // Material Modules 
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatSlideToggleModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
