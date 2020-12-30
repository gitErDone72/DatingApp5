import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { IMember } from "../_models/member.interface";
import { MembersService } from "../_services/members.service";

@Injectable({
    providedIn: 'root'
})
export class MemberDetailedResolver implements Resolve<IMember>{

    constructor(private memberService: MembersService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<IMember> {
        return this.memberService.getMember(route.paramMap.get('username'));
    }
}