import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  profile$: Observable<Profile | null>;

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.profile$ = this.userService.profile;
  }

  async signOut() {
    await this.userService.signOutUser();
  }
}
