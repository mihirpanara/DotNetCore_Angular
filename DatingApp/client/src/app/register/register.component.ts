import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AcountService } from '../_services/acount.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();

  constructor(private accountService: AcountService,private toastr:ToastrService) { }

  model:any = {};

  ngOnInit(): void {

  }

  register(){
    this.accountService.register(this.model).subscribe({
      next: response =>{
        this.cancel();
      },
      error: error =>{
        console.log(error)
        this.toastr.error(error.error);
      } 
      
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
    
  }

}
