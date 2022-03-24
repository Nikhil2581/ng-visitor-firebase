import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user:any;

  constructor() { }

  ngOnInit(): void {
     this.user=localStorage.getItem('user');
  }

  getName() {
    if (this.user) {
      return this.user.displayName;
    }
  }

}
