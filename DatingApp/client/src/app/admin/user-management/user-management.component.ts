import { Component, inject, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  modalRef: any;
  users: Partial<User>[] | any = [];
  // activeModal = inject(NgbActiveModal);
  // @Input() name!: string;
  private modalService = inject(NgbModal);

  constructor(private adminService: AdminService,public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles(){
    this.adminService.getUsersWithRoles().subscribe(users => {
      this.users = users;
    })
  }
  

  editRoles(user: any){
    const initialState: any = {
      user,
      roles: this.getRolesArray(user)
    };

		this.modalRef = this.modalService.open(RolesModalComponent);
		this.modalRef.componentInstance.name = 'World';
    this.modalRef.componentInstance.user = initialState.user;
    this.modalRef.componentInstance.roles = initialState.roles;

    this.modalRef.componentInstance.updateSelectedRoles.subscribe((values: any[]) => {
      debugger
      const rolesToUpdate = {
          roles: [...values.filter((el: any) => el.checked === true).map((el: any) => el.name)]
      };
      console.log(rolesToUpdate.roles);
      this.adminService.updateUserRoles(user.username, rolesToUpdate.roles).subscribe(() => {
        user.roles = [...rolesToUpdate.roles]
      })
    });
      
  }

  // openRolesModal() {
  //   const initialState: any = {
      
  //   };

	// 	this.modalRef = this.modalService.open(RolesModalComponent);
	// 	this.modalRef.componentInstance.name = 'World';
  //   this.modalRef.componentInstance.title = initialState.title;
  //   this.modalRef.componentInstance.list = initialState.list;
	// }

  getRolesArray(user: any){
    const roles:any[] = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      {name: 'Admin', value: 'Admin'},
      {name: 'Moderator', value: 'Moderator'},
      {name: 'Member', value: 'Member'},
      {name: 'VIP', value: 'VIP'}
    ];

    availableRoles.forEach((role) => {
      let isMatch = false;
      for (const userRole of userRoles) {
        if (role.name === userRole) {
          isMatch = true;
          role.checked = true;
          roles.push(role);
          break;
        }
      }
      if (!isMatch) {
        role.checked = false;
        roles.push(role);
      }
    })
    return roles;
  }
  

  // openRolesModal(user: any){
  //   const initialState: any = {
  //     user,
  //     roles: this.getRolesArray(user)
  //   };
  //   this.bsModalRef = this.modalService.show(RolesModalComponent, {initialState});
  //   this.bsModalRef.content.updateSelectedRoles.subscribe((values: any) => {
  //     const rolesToUpdate = {
  //       roles: [...values.filter((el: any) => el.checked === true).map((el: any) => el.name)]
  //     };
  //   });
  // }



}
