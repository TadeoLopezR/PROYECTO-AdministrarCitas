import { generarID } from "./funciones.js";

//objeto de Citas
const citasObj = {
    id: generarID(),
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: ''
}

let editando = {
    value: false
}

export { citasObj, editando }