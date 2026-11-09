import { Service } from '@angular/core';

//Serviço criado programando em javascript para mostrar uma mensagem na tela.
//Foi feito dessa maneira usando tost do daisyUI para não ter problemas com atualização de versão do angular

@Service()
export class ToastService {
    
    constructor() {
        this.createTostContainer();
    }


    private createTostContainer() {
        if (!document.getElementById('toast-container')) {
            const container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast toast-botton toast-end';
            document.body.appendChild(container);
        }
    }

    private createTostElement(message: string, alertClass: string, duration = 5000) {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.classList.add('alert', alertClass, 'shadow-lg');
        toast.innerHTML= `
            <span>${message}</span>
            <button class="ml-4 btn-sm btn-ghost">x</button>
        `

        toast.querySelector('button')?.addEventListener('click', () => {
            toastContainer.removeChild(toast);
        })

        toastContainer.append(toast);

        setTimeout(() => {
            if (toastContainer.contains(toast)) {
                toastContainer.removeChild(toast);
            }
        }, duration);
    }


    //Criando os métodos para usar o serviços de mensagens toast

    success(message: string, duration?: number) {
        this.createTostElement(message, 'alert-success', duration);
    }

    error(message: string, duration?: number) {
        this.createTostElement(message, 'alert-error', duration);
    }

    warning(message: string, duration?: number) {
        this.createTostElement(message, 'alert-warning', duration);
    }

    info(message: string, duration?: number) {
        this.createTostElement(message, 'alert-info', duration);
    }


}
