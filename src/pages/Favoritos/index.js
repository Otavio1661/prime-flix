import { useEffect, useState } from 'react';
import './favoritos.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Favoritos() {
    const [filme, setFilmes] = useState([])

    useEffect(()=>{

        const minhaLIsta = localStorage.getItem("@primefliex");
        setFilmes(JSON.parse(minhaLIsta) || [])

    }, [])


    function excluirFilme(id) {
        let filtroFilmes = filme.filter((item)=>{
            return (item.id !== id)
        })

        setFilmes(filtroFilmes);
        localStorage.setItem("@primefliex", JSON.stringify(filtroFilmes))
        toast.success("FILME REMOVIDO COM SUCESSO")
    }

    return(
        <div className='meus-filmes'>
            <h1>Meus Filmes</h1>

            {filme.length === 0 && <span>Você não possui nenhum filme salvo :( </span>}
            
            <ul>
                {filme.map((item) => {
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button onClick={()=>excluirFilme(item.id)}>REMOVER</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;