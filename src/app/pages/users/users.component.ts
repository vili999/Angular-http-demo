// students.component.ts
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input'; 
import { MatTableModule } from '@angular/material/table'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HttpDataService } from 'src/app/services/http-data.service';
import * as _ from 'lodash';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})


export class UsersComponent implements OnInit {

  @ViewChild('userForm', { static: false })
  
  userForm: NgForm;
  userData: User;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'role', 'status', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  isEditMode = false;

  constructor(private httpDataService: HttpDataService) {
    this.userData = {} as User;
  }

  ngOnInit(): void {
    // Initializing Datatable pagination
    this.dataSource.paginator = this.paginator;
    // Fetch All Users on Page load
    this.getAllUsers()
  }

  ngAfterViewInit() {
   // Initializing Datatable sorting
    this.dataSource.sort = this.sort;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  getAllUsers() {
    this.httpDataService.getList().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  editItem(element) {
    this.userData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.userForm.resetForm();
  }

  deleteItem(id) {
    this.httpDataService.deleteItem(id).subscribe((response: any) => {

      // Approach #1 to update datatable data on local itself without fetching new data from server
      this.dataSource.data = this.dataSource.data.filter((o: User) => {
        return o.id !== id ? o : false;
      })

      console.log(this.dataSource.data);

      // Approach #2 to re-call getAllUsers() to fetch updated data
      // this.getAllUsers()
    });
  }

  addUser() {
    this.httpDataService.createItem(this.userData).subscribe((response: any) => {
      this.dataSource.data.push({ ...response })
      this.dataSource.data = this.dataSource.data.map(o => {
        return o;
      })
    });
  }

  updateUser() {
    this.httpDataService.updateItem(this.userData.id, this.userData).subscribe((response: any) => {

      // Approach #1 to update datatable data on local itself without fetching new data from server
      this.dataSource.data = this.dataSource.data.map((o: User) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      })

      // Approach #2 to re-call getAllUsers() to fetch updated data
      // this.getAllUsers()

      this.cancelEdit()

    });
  }

  onSubmit() {
    if (this.userForm.form.valid) {
      if (this.isEditMode)
        this.updateUser()
      else
        this.addUser();
    } else {
      console.log('Enter valid data!');
    }
  }
}
