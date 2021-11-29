import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit {
  title = 'CRUD-APP';
  result:any ;
  users:any;
  displayedColumns: string[] = ['name','gender', 'id', 'email', 'status'];
  dataSource :any;
  form: FormGroup ;
  buttonClicked = false ;
  selected ='option2';

  constructor(
    private httpClient: HttpClient,
  ){
    // form to validate add user.
    this.form = new FormGroup({
      name: new FormControl('',
        Validators.compose([
          Validators.required,
        ])
      ),
      email: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.email,
        ])
      ),
      gender: new FormControl('',
        Validators.compose([
          Validators.required,
        ])
      ),
      });
  }

  ngOnInit() {
    // get users
    this.getUsers();
  }

  getUsers(){
    // get users

   this.httpClient.get('https://gorest.co.in/public/v1/users').toPromise().then(result =>{
    this.result = Array(result);
    this.users = this.result[0].data;
    console.log(this.result[0].data);
    this.dataSource = this.users ;
   });
  }

  showCard(){
    this.buttonClicked = true;
  }

  hideCard(){
    this.buttonClicked = false;
  }

  addUser(){
    // please open the dev tools to see the added user .
    let payload = {
      name: this.form.controls.name.value,
      email: this.form.controls.email.value,
      gender: this.form.controls.gender.value,
      status: 'active',  
    }

    this.httpClient.post('https://gorest.co.in/public/v1/users',payload ).toPromise().then(result=>{
      console.log(result);
    });
  }

// delete user
  delete(id : any){
    let delete_link = 'https://gorest.co.in/public/v1/users/'+id;
    console.log(delete_link);
    this.httpClient.delete(delete_link).toPromise().then(result=>{
      console.log(delete_link);
      // reload users after delete
      this.getUsers();
    })
  }
 
}
