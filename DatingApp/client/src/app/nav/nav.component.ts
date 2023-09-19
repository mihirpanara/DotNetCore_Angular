import { Component, OnInit } from '@angular/core';
import { AcountService } from '../_services/acount.service';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model:any = {};

  constructor(public accountService: AcountService) { }

  ngOnInit(): void {
  }

  login(){
    this.accountService.login(this.model).subscribe({
      next: response =>{
        console.log(response);
      } ,
      error: err=>console.log(err)
    })
  }

  logout(){
    this.accountService.logout();
  }
}
