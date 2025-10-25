//Importaciones
import  Notificaciones  from "./clases/Notificacion.js";
import { citasObj,editando } from "./variables.js";
import AdminCitas from "./clases/AdminCitas.js";
import {  formulario, pacientesImput, propietarioioImput, emailImput, fechaImput, sintomasioImput, formularioInput } from "./selectores.js";


const Citas= new AdminCitas()

export function datoCita(e) {
    citasObj[e.target.name] = e.target.value
}

export function submitCita(e) {
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
    if(editando.value) {
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
    editando.value = false

}

export function generarID() {
    return Math.random().toString(36).substring(2) + Date.now()
}


export function reinicarObjCita() {

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

export function cargarCita(cita) {
    Object.assign(citasObj, cita)

    pacientesImput.value = cita.paciente
    propietarioioImput.value = cita.propietario
    emailImput.value = cita.email
    fechaImput.value = cita.fecha
    sintomasioImput.value = cita.sintomas   

    editando.value = true
 
    formularioInput.value = 'Guardar Cambios'
}


