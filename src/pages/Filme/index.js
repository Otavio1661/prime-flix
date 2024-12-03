import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./filme-info.css"
import api from "../../services/api";
import { toast } from "react-toastify";

function Filme () {
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loanding, setLoanding] = useState(true);

    useEffect(()=>{
      async function loandFilme() {
        await api.get(`/movie/${id}`, {
          params: {
            api_key: "399d4a62fdf6abedf2d15a774cbbb062",
            language: "pt-BR",
          }
        })
        .then((response)=> {
          setFilme(response.data);
          setLoanding(false);
        })
        .catch((response)=>{
          console.log("Filme não encontrado");
          navigate("/", { replace: true })
          return;
        })
      }

      loandFilme();


      return () => {
        console.log("DESMONTADO")
      }
    }, [ navigate, id ])

    function salvarFilme() {
      const minhaLista = localStorage.getItem("@primefliex");

      let filmeSalvos = JSON.parse(minhaLista) || [];

      const hasFilme = filmeSalvos.some( (filmeSalvos)=> filmeSalvos.id === filme.id)

      if (hasFilme){
        toast.warn("ESSE FILME JÁ ESTA SALVO")
        return;
      }

      filmeSalvos.push(filme);
      localStorage.setItem("@primefliex", JSON.stringify(filmeSalvos));
      toast.success("FILME SALVO COM SOCESSO!")

    }

    if (loanding) {
      return (
        <div className="filme-info">
          <h1>Carregando detalher...</h1>
        </div>
      )
    }

    return (
        <div className="filme-info">
          <h1>{filme.title}</h1>
          <img src={`http://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

          <h3>Sinopse</h3>
          <span>{filme.overview}</span>

          <strong>Avaliação: {filme.vote_average}/10</strong>

          <div className="area-buttons">
            <button onClick={salvarFilme}>Salvar</button>

            <button>
              <a target="_blank" rel="external" href={`https://putlocker.llc/search?query=${filme.title}`}>
                Ver filme
                </a>
            </button>
          </div>

        </div>
    )
}

export default Filme;