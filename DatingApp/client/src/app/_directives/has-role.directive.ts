import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { User } from '../_models/user';
import { AcountService } from '../_services/acount.service';
import { take } from 'rxjs';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit{

  @Input() appHasRole: string[] = [];
  user: User | any;

  constructor(private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private accountService: AcountService) { 
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
        this.user = user;
      })
    }

    ngOnInit(): void {
      if (!this.user?.roles || this.user == null) {
        this.viewContainerRef.clear();
        return;
      }

      if (this.user?.roles.some((r: any) => this.appHasRole.includes(r))) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
      
    }


}
