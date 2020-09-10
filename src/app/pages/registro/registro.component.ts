import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario : Usuario;
  recordarme= false;
  constructor( private auth: AuthService,
               private router: Router ) { }

  ngOnInit() { 
    this.usuario = new Usuario();
  }

  onSubmit( f: NgForm ){

    if( f.invalid ){ return ;}
    
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Espere por favor...'
    });

    Swal.showLoading();

    this.auth.newUser( this.usuario ).subscribe( resp =>{
      console.log(resp);
      Swal.close();

      if( this.recordarme ){
        localStorage.setItem( 'email' , this.usuario.email );
      }

      this.router.navigate(['home']);
    }, ( err ) => {
      console.log(err.error.error.message);
      Swal.fire({
        icon: 'error',
        text: err.error.error.message
      })
    })
    
  }
}
