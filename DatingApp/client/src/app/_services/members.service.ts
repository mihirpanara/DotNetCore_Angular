import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_modules/member';


@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private http:HttpClient) { }

  getMembers(){
    if (this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
      map(members => {
        this.members = members;
        return members;
      })
    );
  }

  getMember(username:string | undefined){
    const member = this.members.find(x=>x.username === username);
    if(member) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }
 
  updateMember(member: Member | undefined){
    return this.http.put(this.baseUrl + 'users',member).pipe(
      map(()=>{
        if(member){
          const index = this.members.indexOf(member);
          this.members[index] = {...this.members[index], ...member}
        }
      })
    );
  }

  uploadFile(formData:any){
    const headers = new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token') // adjust if needed
        });

       return this.http.post( this.baseUrl + 'users/add-photo', formData, { headers })
  }

  setMainPhoto(photoId: number){
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {})
  }

  deletePhoto(photoId: number){
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId, {})
  }
}
