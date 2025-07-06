import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { Member } from 'src/app/_modules/member';
import { AcountService } from 'src/app/_services/acount.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  // members$: Observable<Member[]> | undefined;
  members!: Member[];
  pagination!: Pagination;
  userParams!: UserParams;
  user!:User;
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}]

  constructor(private memberService: MembersService
    // , private accountService: AcountService
  ) { 
    this.userParams = this.memberService.getUserParams()
    // this.accountService.currentUser$.pipe(take(1)).subscribe((user) =>{
    //   this.user = user as User;
    //   this.userParams = new UserParams(user as User);
    // })
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.setUserParams(this.userParams);
    this.memberService.getMembers(this.userParams).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }

  resetFilters(){
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers()
  }

  pageChanged(event:any) {
    this.userParams.pageNumber = event;
    this.memberService.setUserParams(this.userParams);
    this.loadMembers();
  }

}
