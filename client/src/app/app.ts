import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from '../layout/nav/nav';
import { AccountService } from '../core/services/account-service';
import { Home } from '../features/home/home';
//import { RouterOutlet } from '@angular/router'; Retirado

@Component({
  selector: 'app-root',
  //imports: [RouterOutlet], alterado para descartar o RouterOutlet
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private accountService = inject(AccountService);
  private http = inject(HttpClient);
  protected  title = 'Dating App';
  //protected members: any; //Qualquer tipo de valor alterada para manter os valores no refresh
  protected members = signal<any>([])
  //Linha original entender os comandos depois
  //protected readonly title = signal('client'); //signal é um dos passos para manter os valores das variáveis na seção;

  //ngOnInit(): void { definicao da funcao alterado pela troca do subscribe para o promise
  async ngOnInit() {
    
    /*this.http.get('https://localhost:5001/api/members').subscribe({
      //next: response => console.log(response), linha original alterada para pegar os membros no response
      //next: response => this.members = response, linha alterada para usar o resultado do signal
      next: response => this.members.set(response),
      error: error => console.log(error),
      complete: () => console.log('Completed the http request')
    })*/
   //Trecho acima substituido pela troca da funcao subscribe pela promise ao criar o metodo get members
   this.members.set(await this.getMembers())
   this.setCurrentUser();
   
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);

  }

  //metodo criado para evitar que durante um erro a subrscricao nao seja cancelada e a memoria do navegador continue a ser usada
  async getMembers() {
    try {
      return lastValueFrom(this.http.get('https://localhost:5001/api/members'));
    } catch (error) {
      console.log(error);
      throw error;
    }
   
  }

}
