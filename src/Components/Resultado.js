import React, { Component } from 'react';
import Imagen from './Imagen'
import Paginacion from "./Paginacion"

class Resultado extends Component {
    
    // Guardamos y renderizamos el resultado obtenido por la Api y si es NULL, no se ejecuta ningun codigo
    mostrarImagenes = ()=>{
        const imagenes = this.props.imagenes;
        if(imagenes.length === 0){
            return null
        }
        console.log(imagenes)

        // Recorremos el con un Map el array obtenido por la Api y renderizamos segun las propiedades necesarias y las pasamos al componente Imagen
        return(
            <React.Fragment>
                <div className="col-12 p-5 row">
                    {imagenes.map(imagen =>( 
                        <Imagen
                        key={imagen.id} 
                        imagen={imagen} 
                        /> 
                    ))}
                </div>
                <Paginacion 
                    paginaAnterior={this.props.paginaAnterior}
                    paginaSiguiente={this.props.paginaSiguiente}
                />
            </React.Fragment>
        );
    }

    render() { 
        return ( 
            <React.Fragment>
                {this.mostrarImagenes()}
            </React.Fragment>
        );
    }
}
 
export default Resultado;