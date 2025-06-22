import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AcountService } from '../_services/acount.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();

  constructor(private accountService: AcountService,
    private toastr:ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  registerForm: FormGroup = new FormGroup({});
  maxDate: Date = new Date();
  validationErrors: string[] = [];

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      gender:  ['male'],
      username:  ['',Validators.required],
      knownAs:  ['',Validators.required],
      dateOfBirth:  ['',Validators.required],
      city:  ['',Validators.required],
      country:  ['',Validators.required],
      password: ['',[ Validators.required,Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['',[Validators.required, this.matchValues('password')]],
    })
    this.registerForm.controls?.['password'].valueChanges.subscribe(()=>{
      this.registerForm.controls?.['confirmPassword'].updateValueAndValidity();
    })
  }

  matchValues(matchTo: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const parent = control?.parent;
    const matchControl = parent?.get(matchTo);
 
    return control?.value === matchControl?.value ? null : { isMatching: true };
  };
}

ngbDateToDate(dateStruct: NgbDateStruct): Date {
  return new Date(dateStruct.year, dateStruct.month - 1, dateStruct.day);
}

  register(){
    const formValues = { ...this.registerForm.value };

    // Convert NgbDateStruct to JS Date
    const dobStruct = formValues.dateOfBirth;
    const dateOfBirth = new Date(dobStruct.year, dobStruct.month - 1, dobStruct.day);

    formValues.dateOfBirth = dateOfBirth.toISOString(); // Or just `dateOfBirth` if backend accepts Date

    this.accountService.register(formValues).subscribe({
      next: response =>{
        this.router.navigateByUrl('/members')
      },
      error: error =>{
        this.validationErrors = error;
      } 
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
    
  }

}
