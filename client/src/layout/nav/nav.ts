import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';


@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService = inject(AccountService)
  protected creds: any = {}
  /*protected loggedIn = signal(false) //incluído para mostrar o conteúdo apenas quando o usuário estiver logado
  retirado pois agora estamos armazenando esses valores no navegador*/

  login() {
    this.accountService.login(this.creds).subscribe({
      next: result => {
        console.log(result)
        //this.loggedIn.set(true) retirado pois agora estamos armazenando esses valores no navegador
      },
      error: error => alert(error.message)
    })
    //console.log(this.creds);
  }

  logout() {
    //this.loggedIn.set(false) retirado pois agora estamos armazenando esses valores no navegador
    this.accountService.logout();
  }
}
