//selectores 
const pacientesImput = document.querySelector('#paciente')
const propietarioioImput = document.querySelector('#propietario')
const emailImput = document.querySelector('#email')
const fechaImput = document.querySelector('#fecha')
const sintomasioImput = document.querySelector('#sintomas')

const formulario = document.querySelector('#formulario-cita')

const contenedorCitas = document.querySelector('#citas')

//objeto de Citas
const citasObj = {
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: ''
}

class Notificaciones {

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

class AdminCitas{
    constructor() {
        this.citas=[]
    }

    agegar(cita){
        this.citas = [...this.citas, cita]
        this.mostrar()
    }
    mostrar() {

        //limpiar el HTML
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }

        //Gemerar Citas
        this.citas.forEach(cita => {
            const divCita = document.createElement('div');
            divCita.classList.add('mx-5', 'my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10' ,'rounded-xl', 'p-3');

            const paciente = document.createElement('p');
            paciente.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            paciente.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${cita.paciente}`;

            const propietario = document.createElement('p');
            propietario.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            propietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${cita.propietario}`;

            const email = document.createElement('p');
            email.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            email.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${cita.email}`;

            const fecha = document.createElement('p');
            fecha.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            fecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${cita.fecha}`;

            const sintomas = document.createElement('p');
            sintomas.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            sintomas.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${cita.sintomas}`;

            // Agregar al HTML
            divCita.appendChild(paciente);
            divCita.appendChild(propietario);
            divCita.appendChild(email);
            divCita.appendChild(fecha);
            divCita.appendChild(sintomas);
            contenedorCitas.appendChild(divCita);
        });    
    }
}


//Eventos
pacientesImput.addEventListener('change', datoCita)
propietarioioImput.addEventListener('change', datoCita)
emailImput.addEventListener('change', datoCita)
fechaImput.addEventListener('change', datoCita)
sintomasioImput.addEventListener('change', datoCita)

formulario.addEventListener('submit',submitCita)


function datoCita(e) {
    citasObj[e.target.name] = e.target.value
    console.log(citasObj)
}

const Citas= new AdminCitas()


function submitCita(e) {
    e.preventDefault()

            //validar
    /**
    const { paciente, propietario, email, fecha, sintomas } = citasObj

    if( paciente.trim() === '' || propietario.trim() === '' || email.trim() === '' || fecha.trim() === '' || sintomas.trim() === '') {
        console.log('Todos los campos son obligatorios')
        return
    }
    */
    if( Object.values(citasObj).some(valor => valor.trim() === '')) {
        new Notificaciones({
            texto: 'Todos los campos son obligatorios',
            tipo: 'error'
        })
        return
    }

    Citas.agegar({...citasObj})
    formulario.reset()
    reinicarObjCita()
    new Notificaciones({
            texto: 'Paciente agregado correctamente',
            tipo: 'exito'
        })

}

function reinicarObjCita() {

    //Reiniciar el objeto

    /** citasObj.paciente = ''
        citasObj.propietario = ''
        citasObj.email = ''
        citasObj.fecha = ''
        citasObj.sintomas = ''
    */

   Object.assign(citasObj, {
        paciente: '',
        propietario: '',
        email: '',
        fecha: '',
        sintomas: ''
   })

    
}


