import React,{Component} from 'react';
import Buscador from './Components/Buscador';
import Resultado from './Components/Resultado';

class App extends Component {
  // El state de termino es donde se guardara el valor de la busqueda del usuario y imagenes es la parte donde se guardara el resultado de la busqueda del usuario 
  state = {
    termino : "",
    imagenes : [],
    pagina: ""
  }

  // Hacer que al recargar no envie hacia arriba 
  scroll = ()=>{
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth','start');
  }

  // Funciones para los botones de siguiente y anterio pagina 
  paginaAnterior = ()=>{
    let pagina = this.state.pagina;
    // Comprovacion de la pagina actual
    if(pagina === 1){
      return null
    }
    // restarle 1 a la pagina
    pagina-- 
    // Agregarle el cambio al state
    this.setState({
      pagina
    },()=>{
      this.consultarApi()
      this.scroll()
    })
    
    console.log(pagina)
  };

  paginaSiguiente = ()=>{
    // Leer el state de la pagina actual
    let pagina = this.state.pagina;
    // Sumarle 1 para la siguiente pagina
    pagina++;
    // Agregarle el cambio al state
    this.setState({
      pagina
    },()=>{
      this.consultarApi()
      this.scroll()
    })
    console.log(pagina)
  }

  // Consultando la Api para traer todos los datos segun la busqueda del usuario y guardando la busqueda en el state
  consultarApi = ()=>{
    const pagina = this.state.pagina;
    const termino = this.state.termino
    const url = 'https://pixabay.com/api/?key=17929604-aafa4c189590190b66f594536&q=' + termino + '&per_page=30&page='+ pagina 
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => this.setState({
      // Ahora estamos guardando la consulta a la Api en el State para poder renderizar
      imagenes : resultado.hits
    }))
    console.log(url)
  }

  // Aca se ejecutara la actualizacion del state segun la busqueda y el valor del usuario ingresado
  // Esta misma funcion se pasa al componente Buscador para recibir el valor ingresado por el usuario
  datosBusqueda = (termino)=>{
    this.setState({
      termino:termino,
      pagina:1
    },()=>{
      this.consultarApi();
    })
  }

  render(){
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de imagenes</p>
          <Buscador datosBusqueda={this.datosBusqueda}/>
          
        </div>
        <div className="row justify-content-center">
          <Resultado 
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
        </div>
      </div>
    );
  }
}

export default App;
