import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


import Swal from 'sweetalert2'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  usuario: Usuario;
  recordarme=false;
  constructor( private auth: AuthService,
               private router: Router ) { }

  ngOnInit() {
    this.usuario = new Usuario();
    if( localStorage.getItem( 'email' ) ){
      this.usuario.email =  localStorage.getItem( 'email' );
      this.recordarme    = true
    }
  }

  processLogin( f: NgForm ){
    
    
    if( f.invalid ){ return ; }

    Swal.fire({
      allowOutsideClick:false,
      text: 'Espere por favor',
      icon: 'info',
    });
    Swal.showLoading();
    
    this.auth.login( this.usuario ).subscribe( resp => {

      Swal.close();

      if( this.recordarme ){
        localStorage.setItem( 'email' , this.usuario.email );
      }



    }, ( err )=>{
      Swal.fire({
        title:'Error al ingresar',
        text: err.error.error.message ,
        icon: 'error',
      });
    } )
    
  }

}
