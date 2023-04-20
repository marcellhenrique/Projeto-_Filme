import { useEffect, useState } from "react";
import './favoritos.css';
import {toast} from 'react-toastify'

function Favoritos(){
    const [filmes, setFilmes] = useState([])

    useEffect(()=> {
        const minhaLista = localStorage.getItem("@primeflix")
        setFilmes(JSON.parse(minhaLista) || [])

    }, [])

    function excluirFilme(id){
        let filtroFilmes = filmes.filter((item)=> {
            return(item.id !==id)
        })

        setFilmes(filtroFilmes)
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes))
        toast.success("Filme excluído com sucesso!")
    }

    return(
        <div className="minhaLista">
            <h1>Meus filmes</h1>

            {filmes.length === 0 && <span>Você não possui nenhum filme salvo :( </span>}

            <ul>
                {filmes.map((item)=> {
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>

                            <div>
                                <button className="botao1">
                                    <a rel="internal" href={`http://localhost:3000/filmes/${item.id}`}>
                                        Detalhes
                                    </a>
                                </button>
                                <button onClick={() => excluirFilme(item.id)} className="botao2">Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>

        </div>
    )
}
export default Favoritos;