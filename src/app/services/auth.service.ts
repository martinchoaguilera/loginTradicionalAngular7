import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { map } from 'rxjs/operators';
import { type } from 'os';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private url    = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apyKey = 'AIzaSyDUWbRBk1aHtmF4FaGOvg_4QEzSLZLGCVc';
  userToken : string;
    
  
    // CREAR NUEVOS USUARIOS
    // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

    // lOGUEAR USUARIO
    // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

 

  constructor( private http: HttpClient ) { 
    this.readToken();
   }

  logout() {
      localStorage.removeItem('token');
  }
  login( usuario: Usuario ) {
    const authData = {
      // email             : usuario.email,
      // password          : usuario.password,
      ...usuario,
      returnSecureToken : true
    };

    return this.http.post( 
      `${ this.url }signInWithPassword?key=${ this.apyKey }`,
      authData
    ).pipe(
      map( resp =>{
        console.log( typeof resp['expiresIn']);
        
        this.saveToken( resp['idToken'] );
        return resp;
      } )
    );
    
  }

  newUser( usuario: Usuario ) {
    const authData = {
      ...usuario,
      returnSecureToken : true
    };

    return this.http.post(
    `${ this.url }signUp?key=${ this.apyKey }`,
    authData
    ).pipe(
      map( resp =>{
        this.saveToken( resp['idToken'] );
        return resp;
      } )
    );

  }
  
  isauthenticated(): boolean {

    if( this.userToken.length < 2) {
      return false;
    }
    
    const expira = Number( localStorage.getItem( 'expired' ) );
    console.log(expira);
    
    const expiraDate = new Date();
    console.log(expiraDate.getTime());
    
  
    expiraDate.setTime( expira );
    console.log(expiraDate.getTime());
    
    if( expiraDate > new Date() ) {
      return true;
    } else { return false; }
  }
  private saveToken( token : string ) {
    this.userToken = token;
    localStorage.setItem( 'token' , token );

    let hoy = new Date();

    hoy.setSeconds( 3600 );
    localStorage.setItem( 'expired' , hoy.getTime().toString() );
  }
  private readToken() {
    if( localStorage.getItem('token') ){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken='';
    }
    return this.userToken;
  }
}
