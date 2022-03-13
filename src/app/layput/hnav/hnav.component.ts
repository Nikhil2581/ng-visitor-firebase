import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-hnav',
  templateUrl: './hnav.component.html',
  styleUrls: ['./hnav.component.scss']
})
export class HnavComponent implements OnInit {

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this._auth.logout();
  }

}
