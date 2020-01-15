import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Profile } from '../models/profile';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly profile$: Observable<Profile | null>;
  private readonly role$: Observable<string>;
  private readonly isAdmin$: Observable<boolean>;
  private readonly isMember$: Observable<boolean>;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    this.profile$ = this.auth.authState.pipe(
      switchMap(user => {
        if (user === null) {
          return of(null);
        }

        return this.db.doc<Profile>(`profiles/${user.uid}`).valueChanges();
      })
    );
    this.role$ = this.profile$.pipe(map(p => {
      if (!(p && p.role)) {
        return '';
      }

      return p.role.path;
    }));
    this.isAdmin$ = this.role$.pipe(map(role => role === 'roles/admin'));
    this.isMember$ = this.role$.pipe(map(role => ['roles/admin', 'roles/member'].includes(role)));
  }

  get profile(): Observable<Profile | null> {
    return this.profile$;
  }

  get role(): Observable<string> {
    return this.role$;
  }

  get isAdmin(): Observable<boolean> {
    return this.isAdmin$;
  }

  get isMember(): Observable<boolean> {
    return this.isMember$;
  }

  get isLoggedIn(): Observable<boolean> {
    return this.auth.authState.pipe(map(user => !!user));
  }

  async signUpUser(name: string, email: string, password: string): Promise<void> {
    const creds = await this.auth.auth.createUserWithEmailAndPassword(email, password);
    await this.db.doc<Profile>(`profiles/${creds.user.uid}`).set({name});
  }

  async signInUser(email: string, password: string): Promise<void> {
    await this.auth.auth.signInWithEmailAndPassword(email, password);
  }

  async signOutUser() {
    await this.auth.auth.signOut();
  }
}
