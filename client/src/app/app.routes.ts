import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { MemberList } from '../features/members/member-list/member-list';
import { MemberDetailed } from '../features/members/member-detailed/member-detailed';
import { Lists } from '../features/lists/lists';
import { Messages } from '../features/messages/messages';
import { authGuard } from '../core/guards/auth-guard';

export const routes: Routes = [
    {path: '', component: Home},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate:[authGuard],
        children: [
                {path: 'members', component: MemberList, canActivate:[authGuard]}, //alterados para usar o guard criado
                {path: 'members/:id', component: MemberDetailed},
                {path: 'lists', component: Lists, canActivate:[authGuard]},
                {path: 'messages', component: Messages, canActivate:[authGuard]},
        ]
    },
    /*{path: 'members', component: MemberList, canActivate:[authGuard]}, //alterados para usar o guard criado
    {path: 'members/:id', component: MemberDetailed},
    {path: 'lists', component: Lists, canActivate:[authGuard]},
    {path: 'messages', component: Messages, canActivate:[authGuard]},
    Código acima retirado pois agora esses links são filhos do segundo link que tem o Guard*/
    {path: '**', component: Home}
];
