import React, { useEffect, useReducer } from 'react'
import { JuegoReducer } from '../reducers/JuegoReducer';


const init = () => {
    return JSON.parse(localStorage.getItem("juegos")) || [];
};

export const MisJuegos = () => {

    // utilizamos useReduce con 3 parámetros, el propio reducer, 
    //el estado con el que queremos inicializar y el tercer parámetro es la función inicializadora.
    // Se puede crear fuera del componente.
    const [juegos, dispatch] = useReducer(JuegoReducer,[],init);

    // Utilizaremos useEffect para actualizar nuestro localStorage siempre que se modifique el estado juegos.
    useEffect(() =>{
        localStorage.setItem("juegos", JSON.stringify(juegos));

    },[juegos]);

    const conseguirDatosForm = e => {
        e.preventDefault();

        let juego = {
            id: new Date().getTime(),
            titulo: e.target.titulo.value,
            descripcion: e.target.descripcion.value
        };
        const accion = {
            type: "crear",
            payload: juego
        };
        dispatch(accion);
    };

    const borramelo = id => {
        const action = {
            type: "borrar",
            payload: id
        }
        dispatch(action);
    }
    const editar = (e, id) => {
        let juego = {
            id,
            titulo: e.target.value,
            descripcion: e.target.value
        };

        const action = {
            type: "editar",
            payload: juego
        }
        dispatch(action);

    }
  return (
    <div>
        <h1>Estos son mis videojuegos</h1>
        <p>Número de videojuegos: {juegos.length}</p>

        <ul>
            {
                juegos.map(juego => (
                    <li key={juego.id}>
                        {juego.titulo}
                        &nbsp;
                        <button onClick={e => borramelo(juego.id)}>x</button>
                        <input type="text" onBlur={ e => editar(e, juego.id)} 
                                           onKeyPress={ e => {
                                                if (e.key == "Enter"){
                                                    editar(e, juego.id)
                                                    console.log("has presionado enter");
                                                }
                                            }}
                        />
                    </li>
                ))
            }
        </ul>

        <h3>Agregar Juego</h3>

        <form onSubmit={conseguirDatosForm}>
            <input type="texto" name="titulo" placeholder='Titulo' />
            <textarea name="descripcion" placeholder='Descripcion'></textarea>
            <input type="submit" value="guardar"></input>

        </form>
    </div>
  )
}
