import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';



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
    NgbModule
  ],
  exports:[
    BrowserAnimationsModule,
    ToastrModule,
    NgxGalleryModule,
    NgxFileDropModule,
    NgbDatepickerModule,
    NgbModule
  ]
})
export class SharedModule { }
