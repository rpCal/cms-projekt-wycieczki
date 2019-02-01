import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import {User} from './model/user';


export type DataServiceState = {
  isAuth:boolean;
  isAdmin: boolean;
  user: User | null;
  token: string;
}

let enabled = false;
let state$: Observable<DataServiceState>;
let _state$: BehaviorSubject<DataServiceState>;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor() { 
    if(enabled == false){
      let initState = {
        isAuth: false,
        isAdmin: false,
        user: null,
        token: "",
      };
      _state$ = new BehaviorSubject(initState);
      state$ = _state$.asObservable();
      enabled = true;
      this.readFromLocalStorage();  
    }
  }

  get state (): DataServiceState {
    return _state$.getValue();
  }

  get state$ (): Observable<DataServiceState>{
    return state$;
  }

  setState (nextState: DataServiceState): void {
    _state$.next(nextState);
  }

  
  public login(token:string, user:User){
    localStorage.setItem('pjatk-travel-agency-jwt', token);
    localStorage.setItem('pjatk-travel-agency-user', JSON.stringify({
      _id: user._id,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName,
      IsAdmin: user.IsAdmin,
    }));
    this.setAuth(token, user);
    
  }

  public logout(){
    localStorage.removeItem('pjatk-travel-agency-jwt');
    localStorage.removeItem('pjatk-travel-agency-user');
    this.setAuth(undefined, undefined);
  }

  public updateProfile(user: User){
    localStorage.setItem('pjatk-travel-agency-user', JSON.stringify({
      _id: user._id,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName,
      IsAdmin: user.IsAdmin,
    }));
    this.setAuth(this.state.token, user);
    this.setState({
      ...this.state,
      user: {
        _id: user._id,
        Email: user.Email,
        FirstName: user.FirstName,
        LastName: user.LastName,
        IsAdmin: user.IsAdmin,
        Password: null,
      }
    })
  }

  private readFromLocalStorage() {
    let token = localStorage.getItem('pjatk-travel-agency-jwt');
    let userData = localStorage.getItem('pjatk-travel-agency-user');
    if(token && userData && token.length > 1 && Object.keys(userData).length > 4){
      let user = new User(JSON.parse(userData));
      this.setAuth(token, user);
    }
  }

  private setAuth(token: string, user:User) {
    if(token !== undefined && user !== undefined){
      this.setState({
        ...this.state,
        token: token,
        isAuth: true,
        user: user,
        isAdmin: user && user.IsAdmin && user.IsAdmin == true
      });
    }else{
      this.setState({
        ...this.state,
        token: "",
        isAuth: false,
        user: null,
        isAdmin: false
      });
    }
  }

}