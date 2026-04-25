import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgbButtonsModule, NgbDatepickerModule, NgbModalModule, NgbPaginationModule, NgbRadioGroup } from '@ng-bootstrap/ng-bootstrap';
import { TimeagoCustomFormatter, TimeagoFormatter, TimeagoModule } from 'ngx-timeago';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    NgxGalleryModule,
    NgxFileDropModule,
    NgbDatepickerModule,
    NgbModule,
    NgbPaginationModule,
    FormsModule,
    NgbButtonsModule,
    TimeagoModule.forRoot(),
    NgbModalModule,
  ],
  exports:[
    BrowserAnimationsModule,
    ToastrModule,
    NgxGalleryModule,
    NgxFileDropModule,
    NgbDatepickerModule,
    NgbModule,
    NgbPaginationModule,
    NgbButtonsModule,
    TimeagoModule,
    FormsModule,
    NgbModalModule,
  ],
  providers: [
    NgbActiveModal
  ]
})
export class SharedModule { }
