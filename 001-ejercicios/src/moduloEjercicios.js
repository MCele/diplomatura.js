import basededatos, { database } from './basededatos';

/**
 * Obtiene la lista de materias aprobadas (nota >= 4) para el nombre de alumno dado.
 * En caso de no existir el alumno, devolver undefined.
 * En caso de que no encuentre ninguna materia para el alumno, devuelve un array vacio []
 * Ejemplo del formato del resultado suponiendo que el alumno cursa dos materias y tiene mas de 4.
 *  [
    {
      id: 1,
      nombre: 'Análisis matemático',
      profesores: [1, 2],
      universidad: 1,
    },
    {
      id: 2,
      nombre: 'Corte y confección de sabanas',
      profesores: [3],
      universidad: 2,
    }
  ]
 * @param {nombreAlumno} nombreAlumno
 */
export const materiasAprobadasByNombreAlumno = (nombreAlumno) => {
  // Ejemplo de como accedo a datos dentro de la base de datos
  //console.log(basededatos.alumnos);
  const alumno = basededatos.alumnos.find(a => (a.nombre === nombreAlumno));
  if (alumno) {
    let matAprobadas = [];
    basededatos.calificaciones.forEach((calif) => {
      if (calif.nota >= 4 && calif.alumno === alumno.id) {
        let mat = basededatos.materias.find(m => (m.id === calif.materia));
        matAprobadas.push(mat);
      }
    });
    return matAprobadas;
  } else {
    return alumno;
  }
};

/**
 * Devuelve informacion ampliada sobre una universidad.
 * Si no existe la universidad con dicho nombre, devolvemos undefined.
 * Ademas de devolver el objeto universidad,
 * agregar la lista de materias dictadas por la universidad y
 * tambien agrega informacion de los profesores y alumnos que participan.
 * Ejemplo de formato del resultado (pueden no ser correctos los datos en el ejemplo):
 *{
      id: 1,
      nombre: 'Universidad del Comahue',
      direccion: {
        calle: 'Av. Siempre viva',
        numero: 2043,
        provincia: 'Neuquen',
      },
      materias: [
        {
          id: 1,
          nombre: 'Análisis matemático',
          profesores: [1, 2],
          universidad: 1,
        },
        {
          id: 4,
          nombre: 'Programación orientada a objetos',
          profesores: [1, 3],
          universidad: 1,
        },
      ],
      profesores:[
        { id: 1, nombre: 'Jorge Esteban Quito' },
        { id: 2, nombre: 'Marta Raca' },
        { id: 3, nombre: 'Silvia Torre Negra' },
      ],
      alumnos: [
         { id: 1, nombre: 'Rigoberto Manchu', edad: 22, provincia: 1 },
         { id: 2, nombre: 'Alina Robles', edad: 21, provincia: 2 },
      ]
    }
 * @param {string} nombreUniversidad
 */
export const expandirInfoUniversidadByNombre = (nombreUniversidad) => {
  let universidad = basededatos.universidades.find(u => (u.nombre === nombreUniversidad));
  if (universidad) {
    universidad.materias = [];
    universidad.profesores = [];
    universidad.alumnos = [];
    basededatos.materias.forEach((materia) => {
      if (materia.universidad === universidad.id) {
        // agrego la materia al array de materias de la universidad
        universidad.materias.push(materia);
        // agrego el profesor al array de profesores
        materia.profesores.forEach((p) => {
          let profes = basededatos.profesores;
          for (let i = 0; i < profes.length; i++) {
            //busco los profesores de cada materia y verifico que ya no esten incluidos en el array de profesores
            if (profes[i].id === p && (!universidad.profesores.includes(profes[i]))) {
              universidad.profesores.push(profes[i]);
            }
          }
        });
        let calificaciones = basededatos.calificaciones.filter(c => c.materia === materia.id);
        calificaciones.forEach((calif) => {
          let alumno = basededatos.alumnos.find(a => a.id === calif.alumno);
          if (!universidad.alumnos.includes(alumno)) { universidad.alumnos.push(alumno); }
        }
        );
      }
    });
  }
  return universidad;
};

/**
 * Devuelve el promedio de edad de los alumnos.
 */


export const promedioDeEdad = () => {
  const suma = (total, alumno) => total + alumno.edad;
  let sum = database.alumnos.reduce(suma, 0)
  if (sum)
    return sum / database.alumnos.length;
  return promedioArrayByAtributo(database.alumnos);
};

//realiza el promedio de un atributo numerico de un array
function promedioArrayByAtributo(arrayDatos, atributo) {
  // si el atributo no se envía utiliza el campo 'edad'
  if (!atributo) atributo = 'edad';
  const suma = (total, objeto) => total + objeto[atributo];
  let sum = arrayDatos.reduce(suma, 0)
  console.log(sum);
  return (sum) ? sum / database.alumnos.length : sum;
}
/**
 * Devuelve la lista de alumnos con promedio mayor al numero pasado
 * por parametro.
 * @param {number} promedio
 */
export const alumnosConPromedioMayorA = (promedio) => {
  console.log(promedio);
  const alumnosPromMayorA = [];
  database.calificaciones.forEach(c => {
    if (c.nota > promedio && !getByID(c.alumno, alumnosPromMayorA))
      alumnosPromMayorA.push(getByID(c.alumno, database.alumnos));
  }
  );
  return alumnosPromMayorA;
};
// parametro array de  onjetos que contienen el atributo id
function getByID(id, arrayDatos) {
  return arrayDatos.find(a => a.id === id);
}

/**
 * Devuelve la lista de materias sin alumnos
 */
export const materiasSinAlumnosAnotados = () => {
  let materias = [];
  database.materias.forEach(m => {
    // verifico que la materia no se encuentre en el array de calificaciones
    if (!(getByIdAtributo(m.id, basededatos.calificaciones, 'materia')))
      materias.push(m);
  });
  return materias;
};

// Método general para obtener un objeto por su id en un array de objetos, 
// donde el nombre del atributo del id puede ser variable
// arrayDatos contiene objetos json
// "atribute" atributo de un objeto a ser comparado con el id
function getByIdAtributo(id, arrayDatos, atributo) {
  if (!atributo) atributo = 'id';
  return arrayDatos.find(d => d[atributo] === id);
}

/**
 * Devuelve el promdedio de edad segun el id de la universidad.
 * @param {number} universidadId
 */
// funcion que obtiene los alumnos en una universidad por su id
function getAlumnosByUniversidadId(universidadId) {
  return database.alumnos.filter(a => {
    let asigna = false;
    // obtengo las calificaciones del alumno
    basededatos.calificaciones.filter(c => c.alumno === a.id).forEach(
      calif => {
        if (!asigna) {
          const materia = getByIdAtributo(calif.materia, basededatos.materias);
          asigna = (materia?.universidad === universidadId);
        }
      });
    return asigna;
  });
};

export const promedioDeEdadByUniversidadId = (universidadId) => {
  if (!universidadId) return;
  const alumnos = getAlumnosByUniversidadId(universidadId);
  console.log("alumnos de la Universidad:", alumnos);
  return promedioArrayByAtributo(alumnos, 'edad');
}