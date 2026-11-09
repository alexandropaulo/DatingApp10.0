import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';


@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService = inject(AccountService)
  private router = inject(Router);
  private toast = inject(ToastService);
  protected creds: any = {}
  /*protected loggedIn = signal(false) //incluído para mostrar o conteúdo apenas quando o usuário estiver logado
  retirado pois agora estamos armazenando esses valores no navegador*/
  


  login() {
    this.accountService.login(this.creds).subscribe({
      next: result => {
        //console.log(result)
        //this.loggedIn.set(true) retirado pois agora estamos armazenando esses valores no navegador
        this.router.navigateByUrl('/members');
        this.creds = {};
        this.toast.success('Logged in successfully');
      },
      //error: error => alert(error.message) alterado para utiizar a mensagem via toast
      error: error => {this.toast.error(error.error)}
    })
    //console.log(this.creds);
  }

  logout() {
    //this.loggedIn.set(false) retirado pois agora estamos armazenando esses valores no navegador
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
