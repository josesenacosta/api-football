import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_KEY, API_KEY_TEST } from '../../api/api';
import Escudo from '../Escudo/Escudo';
import './Tabela.css';
import {
  AiFillMinusCircle,
  AiFillCheckCircle,
  AiFillCloseCircle,
} from 'react-icons/ai';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const Tabela = () => {
  const [tabela, setTabela] = useState();
  const [timeEscudo, setTimeEscudo] = useState('');
  const [selectedTeam, setSelectedTeam] = useState();

  const handleClick = (teamId) => {
    setSelectedTeam(teamId);
    console.log(selectedTeam);
    axios
      .get(`https://api.api-futebol.com.br/v1/times/${teamId}`, {
        headers: { Authorization: `Bearer ${API_KEY_TEST}` },
      })
      .then((response) => {
        setTimeEscudo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`https://api.api-futebol.com.br/v1/campeonatos/10/tabela`, {
        headers: { Authorization: `Bearer ${API_KEY_TEST}` },
      })
      .then((response) => {
        setTabela(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!tabela) {
    return <p>Aguarde...</p>;
  } else console.log(tabela);

  return (
    <>
      {/* <div>
        <h2>Classificação</h2>
        <ul className="tabela">
          {tabela.map((t) => (
            <li
              className="tabelaTime"
              key={t.time.time_id}
              onClick={() => handleClick(t.time.time_id)}
            >
              <p className="posicao">{t.posicao}</p>

              <div className="time">
                <img src={t.time.escudo} alt="" />
                {t.time.nome_popular}

                <div>
                  {t.ultimos_jogos.map((resultado) =>
                    resultado === 'v' ? (
                      <AiFillCheckCircle color="green" />
                    ) : resultado === 'd' ? (
                      <AiFillCloseCircle color="red" />
                    ) : resultado === 'e' ? (
                      <AiFillMinusCircle color="gray" />
                    ) : (
                      ''
                    ),
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {timeEscudo && <Escudo imagem={timeEscudo.escudo} />} */}

      <TableContainer className="tabela " variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Posição</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>P</TableCell>
              <TableCell>V</TableCell>
              <TableCell>E</TableCell>
              <TableCell>D</TableCell>
              <TableCell>Últimos Resultados</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tabela.map((t) => (
              <TableRow key={t.time.time_id}>
                <TableCell>{t.posicao}</TableCell>
                <TableCell>
                  {' '}
                  <img src={t.time.escudo} alt="" />
                  {t.time.nome_popular}
                </TableCell>
                <TableCell>{t.pontos}</TableCell>
                <TableCell>{t.vitorias}</TableCell>
                <TableCell>{t.empates}</TableCell>
                <TableCell>{t.derrotas}</TableCell>
                <TableCell>
                  {t.ultimos_jogos.map((resultado) =>
                    resultado === 'v' ? (
                      <AiFillCheckCircle color="green" />
                    ) : resultado === 'd' ? (
                      <AiFillCloseCircle color="red" />
                    ) : resultado === 'e' ? (
                      <AiFillMinusCircle color="gray" />
                    ) : (
                      ''
                    ),
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Tabela;
