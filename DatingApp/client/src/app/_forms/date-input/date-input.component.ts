import { Component, Input, OnChanges, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css']
})
export class DateInputComponent implements ControlValueAccessor, OnChanges {

  @Input() label: string = '';
  @Input() maxDate: Date = new Date();
  ngConfig: Partial<NgbDatepickerConfig> = new NgbDatepickerConfig();

  constructor(@Self() public ngControl: NgControl,
    private config: NgbDatepickerConfig) {
    this.ngControl.valueAccessor = this;

    const date = this.maxDate;
    this.config.maxDate = {
      year: date.getFullYear(),
      month: date.getMonth() + 1, // JavaScript months are 0-based
      day: date.getDate()
    };

    this.config.outsideDays = 'hidden';
    this.config.firstDayOfWeek = 1;

  }

  ngOnChanges(): void {
  if (this.maxDate) {
    this.config.maxDate = {
      year: this.maxDate.getFullYear(),
      month: this.maxDate.getMonth() + 1,
      day: this.maxDate.getDate()
    };
  }
}


  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }

}
