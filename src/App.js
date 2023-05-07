import Tabela from './Components/Tabela/Tabela';
import './App.css';
import Escudo from './Components/Escudo/Escudo';
import Banner from './Components/Banner/Banner';
import CampoSearch from './Components/CampoSearch/CampoSearch';
import CardLive from './Components/CardLive/CardLive';
import Botao from './Components/Botao/Botao';

function App() {
  return (
    <>
      <div className="container">
        <section className="cabecalho">
          <CampoSearch />
          <Botao />
        </section>
        <section className="live">
          <Banner />
          <CardLive />
        </section>
        <section className="content">
          <Tabela />
        </section>
      </div>
    </>
  );
}

export default App;
