import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AcountService } from '../_services/acount.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private accountService: AcountService, private toastr: ToastrService){}

  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (user?.roles.includes('Admin') || user?.roles.includes('Moderator')) {
          return true;
        }
        this.toastr.error('You cannot enter this area');
        return false;
      })
    );
  }
  
}
