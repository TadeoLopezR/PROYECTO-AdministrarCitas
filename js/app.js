//selectores 
const pacientesImput = document.querySelector('#paciente')
const propietarioioImput = document.querySelector('#propietario')
const emailImput = document.querySelector('#email')
const fechaImput = document.querySelector('#fecha')
const sintomasioImput = document.querySelector('#sintomas')

const formulario = document.querySelector('#formulario-cita')
const formularioInput = document.querySelector('#formulario-cita input[type="submit"]')

const contenedorCitas = document.querySelector('#citas')

//objeto de Citas
const citasObj = {
    id: generarID(),
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

    editar(citaActualizada) {
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita)
        this.mostrar()
    }

    mostrar() {

        //limpiar el HTML
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }

        //Comprobar si hay citas
        if(this.citas.length === 0) {
            const noCitas = document.createElement('p')
            noCitas.classList.add('text-center', 'mb-10', 'mt-5', 'text-xl')
            noCitas.textContent = 'No Hay Pacientes'
            contenedorCitas.appendChild(noCitas)
            return
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

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('py-2','btn-editar', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
            
            const clon = structuredClone(cita)//clonar el objeto para evitar referencias
            btnEditar.onclick = () => {
               cargarCita(clon)
            }


            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('py-2','btn-eliminar', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
            
            btnEliminar.onclick = () => {
                this.citas = this.citas.filter( eliminarCita => eliminarCita.id !== cita.id)
                this.mostrar()
                new Notificaciones({   
                    texto: 'Paciente eliminado',
                    tipo: 'exito'
                })
            }

            const contenedorBotones = document.createElement('div');
            contenedorBotones.classList.add('flex', 'justify-between', 'mt-10');


            // Agregar al HTML
            divCita.appendChild(paciente);
            divCita.appendChild(propietario);
            divCita.appendChild(email);
            divCita.appendChild(fecha);
            divCita.appendChild(sintomas);
            contenedorCitas.appendChild(divCita);

            contenedorBotones.appendChild(btnEditar);
            contenedorBotones.appendChild(btnEliminar);
            divCita.appendChild(contenedorBotones);
        });    
    }
}

let editando = false

//Eventos
pacientesImput.addEventListener('change', datoCita)
propietarioioImput.addEventListener('change', datoCita)
emailImput.addEventListener('change', datoCita)
fechaImput.addEventListener('change', datoCita)
sintomasioImput.addEventListener('change', datoCita)

formulario.addEventListener('submit',submitCita)


function datoCita(e) {
    citasObj[e.target.name] = e.target.value
}

const Citas= new AdminCitas()


function submitCita(e) {
    e.preventDefault()
    console.log(citasObj)
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

    //Revisar si estamos editando o creando una nueva cita
    if(editando) {
        Citas.editar({...citasObj})
        new Notificaciones({
            texto: 'Guardado correctamente',
            tipo: 'exito'
        })
    }
        else {
            Citas.agegar({...citasObj})
            new Notificaciones({
            texto: 'Paciente agregado correctamente',
            tipo: 'exito'
        })
        }

    formulario.reset()
    reinicarObjCita()
    formularioInput.value = 'Registrar paciente'
    editando = false

}

function generarID() {
    return Math.random().toString(36).substring(2) + Date.now()
}


function reinicarObjCita() {

    //Reiniciar el objeto

    /**citasObj.id = generarID() 
     * citasObj.paciente = ''
        citasObj.propietario = ''
        citasObj.email = ''
        citasObj.fecha = ''
        citasObj.sintomas = ''
    */

   Object.assign(citasObj, {

        id: generarID(),
        paciente: '',
        propietario: '',
        email: '',
        fecha: '',
        sintomas: ''
   })

    
}

function cargarCita(cita) {
    Object.assign(citasObj, cita)

    pacientesImput.value = cita.paciente
    propietarioioImput.value = cita.propietario
    emailImput.value = cita.email
    fechaImput.value = cita.fecha
    sintomasioImput.value = cita.sintomas   

    editando = true
 
    formularioInput.value = 'Guardar Cambios'
}


