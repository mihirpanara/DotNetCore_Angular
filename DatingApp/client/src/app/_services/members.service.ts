import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_modules/member';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';
import { AcountService } from './acount.service';
import { User } from '../_models/user';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';


@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();
  userParams!: UserParams;
  user!:User;

  constructor(private http: HttpClient, private accountService: AcountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user as User;
      this.userParams = new UserParams(user as User);
    })
  }

  getUserParams(){
    return this.userParams;
  }

  setUserParams(params: UserParams){
    this.userParams = params
  }

  resetUserParams(){
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  getMembers(userParams: UserParams) {
    var response = this.memberCache.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize)

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender.toString());
    params = params.append('orderBy', userParams.orderBy.toString());

    return getPaginatedResult<Member[]>(this.baseUrl + 'users', params, this.http)
      .pipe(map(response => {
        this.memberCache.set(Object.values(userParams).join('-'), response)
        return response;
      }));
  }

  getMember(username: string | undefined) {
    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: Member) => member.username === username);

    if (member) {
      return of(member);
    }
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member | undefined) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        if (member) {
          const index = this.members.indexOf(member);
          this.members[index] = { ...this.members[index], ...member }
        }
      })
    );
  }

  uploadFile(formData: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token') // adjust if needed
    });

    return this.http.post(this.baseUrl + 'users/add-photo', formData, { headers })
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {})
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId, {})
  }
  
  addLike(username: string){
    return this.http.post(this.baseUrl + 'likes/' + username, {})
  }

  getLikes(predicate: any, pageNumber: any, pageSize: any){
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);
    return getPaginatedResult<Partial<Member[]>>(this.baseUrl  + 'likes' ,   params, this.http);
    // return this.http.get<Partial<Member[]>>(this.baseUrl + 'likes?predicate=' + predicate);
  }
}
