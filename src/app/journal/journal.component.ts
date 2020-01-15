import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit {
  isAdmin$: Observable<boolean>;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.isAdmin$ = this.userService.isAdmin;
  }

}
