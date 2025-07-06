import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgbButtonsModule, NgbDatepickerModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TimeagoCustomFormatter, TimeagoFormatter, TimeagoModule } from 'ngx-timeago';



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
    NgbButtonsModule,
    TimeagoModule.forRoot()
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
    TimeagoModule
  ]
})
export class SharedModule { }
