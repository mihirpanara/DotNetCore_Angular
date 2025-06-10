import { Component, Input, OnInit } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { Member } from 'src/app/_modules/member';
import { photo } from 'src/app/_modules/photo';
import { AcountService } from 'src/app/_services/acount.service';
import { MembersService } from 'src/app/_services/members.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: Member | undefined;
  // uploader: FileUploader | undefined;
  hasBaseDropzonOver = false;
  baseUrl = environment.apiUrl;
  user: User | undefined;
  public files: NgxFileDropEntry[] = [];
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;

  constructor(private accountService: AcountService, private memberService: MembersService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      if(user){
        this.user = user
      }
    })
  }

  ngOnInit(): void {
    // this.initializeUploader();
  }

  // fileOverBase(e: any){
  //   this.hasBaseDropzonOver = e;
  // }

  // initializeUploader(){
  //   this.uploader = new FileUploader({
  //     url: this.baseUrl + 'users/add-photo',
  //     authToken: 'Bearer ' + this.user?.token,
  //     isHTML5: true,
  //     allowedFileType : ['image'],
  //     removeAfterUpload: true,
  //     autoUpload: false,
  //     maxFileSize: 10 * 1024 * 1024
  //   });

  //   this.uploader.onAfterAddingFile = (file) => {
  //     file.withCredentials = false;
  //   }

  //   this.uploader.onSuccessItem = (item, response, status, headers) => {
  //     if(response){
  //       const photo = JSON.parse(response);
  //       this.member?.photos.push(photo);
  //     }
  //   }
  // }

  onFileDrop(files: NgxFileDropEntry[]) {
    this.files = files;

    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // You can now upload this `file` to your backend via HttpClient
          console.log(file);
        });
      }
    }
  }

  fileOverBase(e: boolean) {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: boolean) {
    this.hasAnotherDropZoneOver = e;
  }

  onFileDropped(files: NgxFileDropEntry[]) {
    this.files.push(...files);
  }

  onFileDroppedAnother(files: NgxFileDropEntry[]) {
    this.files.push(...files);
  }

  uploadFile(file: NgxFileDropEntry) {
    if (file.fileEntry.isFile) {
      const fileEntry = file.fileEntry as FileSystemFileEntry;
      fileEntry.file((actualFile: File) => {
        const formData = new FormData();
        formData.append('file', actualFile, actualFile.name);

        this.memberService.uploadFile(formData)
          .subscribe(response => {
            console.log('Upload success:', response);
          });
      });
    }
  }

  uploadAll() {
    this.files.forEach(file => this.uploadFile(file));
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
  }

  clearQueue() {
    this.files = [];
  }

  setMainPhoto(photo: photo){
    this.memberService.setMainPhoto(photo.id).subscribe((res) =>{
      if(this.user && this.member){
        this.user.photoUrl = photo?.url;
        this.accountService.setCurrentUser(this.user);
        this.member.photoUrl = photo.url;
        this.member.photos.forEach((p) =>{
          if(p.isMain) p.isMain = false;
          if(p.id == photo.id) p.isMain = true;
        })
      }
    })
  }

  deletePhoto(photo: photo){
    this.memberService.deletePhoto(photo.id).subscribe((res) =>{
      if(this.member){
        this.member.photos = this.member.photos.filter(x => x.id !== photo.id);
      }
    })
  }


}
