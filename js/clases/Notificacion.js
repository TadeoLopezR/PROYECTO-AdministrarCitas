 import { formulario } from "../selectores.js";
 
 export default class Notificaciones {

    constructor({texto, tipo}) {
        this.texto = texto
        this.tipo = tipo

        this.mostrar()
    }

    mostrar() {

        //Crear Notificacion de alerta
        const alerta = document.createElement('div')

        //Messaje de error
        alerta.textContent = this.texto
        alerta.classList.add('text-center','w-full','p-3','text-white','my-5','alert','uppercase',
            'font-bold','text-sm')
        
        //Eliminar alertas previas
        const alertasPrevias = document.querySelector('.alert')
        //alertasPrevias?.remove()  //Otra forma de hacerlo
        if(alertasPrevias) {
            alertasPrevias.remove()
        }
        
        //Si es del tipo error
        this.tipo === 'error' ? alerta.classList.add('bg-red-500') : alerta.classList.add('bg-green-500')

        //Insertar en el HTML
        formulario.parentElement.insertBefore(alerta, formulario)

        //Eliminar la alerta despues de 3 segundos
        setTimeout(() => {
            alerta.remove()
        }, 3000);

}}