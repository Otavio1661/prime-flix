import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import './home.css'

// URL da api: https://api.themoviedb.org/3/movie/now_playing?api_key=399d4a62fdf6abedf2d15a774cbbb062&language=pt-BR

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loanding, setLoanding] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "399d4a62fdf6abedf2d15a774cbbb062",
          language: "pt-BR",
          page: 1,
        },
      });

      // Corrigido: Acessando a chave 'results' da resposta
      setFilmes(response.data.results.slice(0, 10));
      setLoanding(false);
    }

    loadFilmes();
  }, []); // O array vazio garante que o useEffect é chamado apenas uma vez


  if(loanding){
    <div className="loanding">
      <h2>Carregando Filmes...</h2>
    </div>
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => {
          return (
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img src={`http://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
