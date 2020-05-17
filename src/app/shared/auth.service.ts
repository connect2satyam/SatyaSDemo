import { Injectable } from '@angular/core';
import { User, UserModel } from './user.model';
import { BehaviorSubject, Observable, of, from, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { AuthService as SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserModel: User | null;

  // private getOnlineStatus = new BehaviorSubject<boolean>(false);
  // getOnlineStatusAction$ = this.getOnlineStatus.asObservable();

  private currentUser = new BehaviorSubject<User>(this.currentUserModel);
  currentUserAction$ = this.currentUser.asObservable();

  constructor(private socialAuthService: SocialAuthService) { }

  socialUser$ = this.socialAuthService.authState;

  // Below messages must be from API.
  message$ = from(['satya', 'lakshmi', 'sindhu',
    'praveen', 'ubaid', 'sharath', 'kumar',
    'reddy', 'remote', 'job', 'zimbabwe', 'exercise', 'chanel', 'elephant', 'engineer']).pipe(
      tap(x => console.log(x)),
      catchError(err => throwError('Error occured !'))
    );

  localLogin(loginFormValues: any): void {
    this.currentUserModel = {
      userName: loginFormValues?.userName,
      isSocialLogin: false,
      isUserLoggedIn: true
    };

    this.currentUser.next(this.currentUserModel);
    // this.getOnlineStatus.next(true);
    // console.log(`User ${this.currentUserModel.userName} is online and logged in`);
  }

  socialLogin(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => {
      this.socialUser$.subscribe((socialUser: SocialUser) => {

        this.currentUserModel = socialUser ? {
          userName: socialUser.firstName,
          isSocialLogin: true,
          isUserLoggedIn: true
        } : null;
        this.currentUser.next(this.currentUserModel);
      });
    });
  }
  logout(): Observable<any> {
    this.currentUser.next(null);
    if (this.currentUserModel.isSocialLogin) {
      return from(this.socialAuthService.signOut());
    } else {
      return of(null);
    }
  }
  // socialLogout(): void {
  //   this.currentUser.next(null);
  //   this.authService.signOut();
  // }

  // login(userName: string, password: string): void {
  //   this.currentUser = {
  //     id: 2,
  //     userName,
  //     isAdmin: false
  //   };

  //   this.isUserLoggedIn.next(this.currentUser);
  //   this.getOnlineStatus.next(true);
  //   console.log(`User ${this.currentUser.userName} is online and logged in`);
  // }

  // logout(): void {
  //   this.socialAuthService.signOut();
  // if (this.currentUserModel.isSocialLogin) {
  //   this.socialAuthService.signOut();
  // }
  // this.currentUser.next(null);

  // this.getOnlineStatus.next(false);
  // console.error(`User ${this.currentUser.userName} is offline and logged out`);
  // this.currentUser = undefined;
  // this.isUserLoggedIn.next(this.currentUser);
  // }
}
