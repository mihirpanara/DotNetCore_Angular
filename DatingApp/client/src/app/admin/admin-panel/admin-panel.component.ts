import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  console.log(this.aaa("asda"));

  }

  activeTab: 'user' | 'photo' = 'user';
    
  aaa(a:string,b?:string) :string | any {
    return a+b;
  }
  
}
