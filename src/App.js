import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const leagueId = 71;
  const teamId = 127;
  const seasonYear = 2023;
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const formatDate = `${year}-${month}-${day}`;

  const [team, setTeam] = useState();
  const [fixture, setFixture] = useState();

  const urlTeam = `https://api-football-v1.p.rapidapi.com/v3/players/squads?team=${teamId}`;

  const urlFixture = `https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${formatDate}&league=${leagueId}&season=${seasonYear}`;

  const options = {
    headers: {
      'X-RapidAPI-Key': '78d93fc0a1msh99456b30db8211bp11526fjsn39583add1c47',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    },
  };

  useEffect(() => {
    async function fetchLeague() {
      const result = await axios.get(urlTeam, options);
      const resposta = result.data.response[0].players;
      setTeam(resposta);
    }

    async function fecthPlacar() {
      const fixtureResult = await axios.get(urlFixture, options);
      const dados = fixtureResult.data.response;
      setFixture(dados);
    }

    fecthPlacar();
    fetchLeague();
  }, []);

  if (!team || !fixture) {
    return <p>carregando...</p>;
  } else {
    console.log(fixture[0]);
  }

  return (
    <>
      {fixture
        ? fixture.map((f) => (
            <li key={f.fixture.id} className="resultados">
              <img src={f.teams.home.logo} alt="" />
              <span className="time-casa">{f.teams.home.name}</span>
              <span className="placar">
                {f.goals.home} - {f.goals.away}
              </span>
              <span className="time-fora">{f.teams.away.name}</span>
              <img src={f.teams.away.logo} alt="" />
            </li>
          ))
        : 'Sem Jogos Hoje'}

      <div className="cards">
        {team
          ? team.map((t) => (
              <div key={t.id} className="card">
                <div className="header">
                  <img src={t.photo} alt="" />
                </div>
                <div className="info">
                  <h2>{t.name}</h2>
                  <span>{t.position}</span>
                  <span>{t.age} anos</span>
                </div>
              </div>
            ))
          : 'nao '}
      </div>
    </>
  );
}

export default App;
