//Importaciones
import {  formulario, pacientesImput, propietarioioImput, emailImput, fechaImput, sintomasioImput } from "./selectores.js";
import { datoCita, submitCita } from "./funciones.js";


//Eventos
pacientesImput.addEventListener('change', datoCita)
propietarioioImput.addEventListener('change', datoCita)
emailImput.addEventListener('change', datoCita)
fechaImput.addEventListener('change', datoCita)
sintomasioImput.addEventListener('change', datoCita)

formulario.addEventListener('submit',submitCita)








