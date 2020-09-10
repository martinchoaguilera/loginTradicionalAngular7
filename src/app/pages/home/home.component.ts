import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: Usuario;
  constructor( private auth : AuthService,
               private router: Router ) { }

  ngOnInit() {
  }

  logOut(){
    this.auth.logout();
    this.router.navigate(['login']);
  }

}
