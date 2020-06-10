import {
  materiasAprobadasByNombreAlumno,
  expandirInfoUniversidadByNombre,
  promedioDeEdad,
  alumnosConPromedioMayorA,
  materiasSinAlumnosAnotados,
  promedioDeEdadByUniversidadId
} from './moduloEjercicios';

import baseDeDatos from './basededatos';

// materiasAprobadasByNombreAlumno
console.log('------------------------------------------------------');
console.log('Ejecutando ejercicios materiasAprobadasByNombreAlumno.');

const materiasAprobadasPorSuzana = materiasAprobadasByNombreAlumno(
  'Suzana Mendez'
);
console.log('Materias aprobadas por Suzana:', materiasAprobadasPorSuzana);

const materiasAprobadasPorAlina = materiasAprobadasByNombreAlumno(
  'Alina Robles'
);
console.log('Materias aprobadas por Alina:', materiasAprobadasPorAlina);

// expandirInfoUniversidadByNombre
console.log('------------------------------------------------------');
console.log('Ejecutando ejercicios expandirInfoUniversidadByNombre.');

const infoUniversidadComahue = expandirInfoUniversidadByNombre(
  'Universidad del Comahue'
);
console.log('Info comahue:', infoUniversidadComahue);

const infoUniversidadRio = expandirInfoUniversidadByNombre(
  'Universidad de Rio Negro'
);
console.log('Info rio negro:', infoUniversidadRio);

// promedioDeEdad
console.log('------------------------------------------------------');
console.log('Ejecutando ejercicio promedioDeEdad:', promedioDeEdad());

// Devuelve la lista de alumnos con promedio mayor al numero pasado por parametro.
console.log('------------------------------------------------------');
console.log('Ejecutando ejercicio alumnosConPromedioMayorA(5): ');
console.log(alumnosConPromedioMayorA(5));
console.log('Ejecutando ejercicio alumnosConPromedioMayorA(7.4): ');
console.log(alumnosConPromedioMayorA(7.4));

// Devuelve la lista de materias sin alumnos
console.log('------------------------------------------------------');
console.log('Ejecutando ejercicio materiasSinAlumnosAnotados: ', materiasSinAlumnosAnotados());

// Devuelve el promdedio de edad segun el id de la universidad
console.log('------------------------------------------------------');
console.log('Ejecutando ejercicio promedioDeEdadByUniversidadId: ', promedioDeEdadByUniversidadId(1));

