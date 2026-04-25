import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.css']
})
export class RolesModalComponent implements OnInit {

  // @Input() updateSelectedRoles = new EventEmitter();
  @Output() updateSelectedRoles = new EventEmitter();
  activeModal = inject(NgbActiveModal);
  // private modalService = inject(NgbModal);
  user:User | any;
  roles: any[] = [];


  constructor(private modalService: NgbModal) {
    console.log(this.roles);
    
   }

  ngOnInit(): void {
  }

	// open() {
	// 	const modalRef = this.modalService.open(RolesModalComponent);
	// 	modalRef.componentInstance.name = 'World';
	// }

  updateRoles() {
    this.updateSelectedRoles.emit(this.roles);
    this.activeModal.close();
  } 

}
