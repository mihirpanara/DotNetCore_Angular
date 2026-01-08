import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { Message } from 'src/app/_models/message';
import { Member } from 'src/app/_modules/member';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  @ViewChild('memberTabs') memberTabs: any;
  member : Member | undefined;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  activeTab:any = 0;
  messages!: Message[]
  
  
  constructor(private memberService: MembersService,
    private messageService: MessageService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    // this.loadMember();

    this.route.data.subscribe((data: any) => {
      this.member = data.member;
    })

    debugger
    this.route.queryParams.subscribe((params: any) => {
      params.tab ? this.onTabActivated(parseInt(params.tab)) : this.onTabActivated(0);
    });

    this.galleryOptions = [{
      width: '500px',
      height: '500px',
      imagePercent: 100,
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: false
    }]

    this.galleryImages = this.getImages();
  }
  
  getImages() {
    if(!this.member) return [];
    const imgUrls = [];
    for(const photo of this.member.photos){
      imgUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url
      })
    }

    return imgUrls;
  }

  // loadMember(){
  //   var username = this.route.snapshot.paramMap.get('username');
  //   if(!username) return;
  //   this.memberService.getMember(username).subscribe({
  //     next: member =>  {
  //       this.member = member;
  //       this.galleryImages = this.getImages();

  //     }
  //   })
  // }

  loadMessages() {
    if(this.member?.username){
      this.messageService.getMessageThread(this.member?.username).subscribe(messages => {
        this.messages = messages;
      })
    }
  }

  selectTab(tabId: number) {
    this.activeTab = tabId;
  }

  onTabActivated(data: any){
    debugger
    this.activeTab = data;
    if(this.activeTab === 3){
      this.loadMessages();
    }
    // if(this.activeTab.heading === 'Messages' && this.messages.length === 0){
    //   this.loadMessages();
    // }
  }


}
