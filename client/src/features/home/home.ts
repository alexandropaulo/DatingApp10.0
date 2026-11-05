import { Component, signal } from '@angular/core';
import { Register } from '../account/register/register';

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  //@Input({required: true}) membersFromApp: User[] = []:
  //Retirado pois é apenas um exemplo de comnicação pai e filho que não será mais usado.
  protected registerMode = signal(false); //Alterando botão Register para mostrar os campos de registro.

  showRegister(value: boolean) {
    this.registerMode.set(value);
  }
}
