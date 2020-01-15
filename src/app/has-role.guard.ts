import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    const allowedRoles: string[] = next.data.allowedRoles || [];
    return this.userService.role
      .pipe(map(role => {
        const allowed = allowedRoles.includes(role);

        if (!allowed) {
          return this.router.createUrlTree(['']);
        }

        return allowed;
      }));
  }

}
