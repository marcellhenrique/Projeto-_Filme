import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import './home.css'


function Home(){
    
    const [filmes, setFilmes] = useState([])

    useEffect(()=>{

        async function loadFilmes(){
    
            const response = await api.get("movie/now_playing", {
                params:{
                    api_key: "88822d0f7303867ad55cc3431c8ee984",
                    language: "pt-BR",
                    page:1,
                }
            })
            //console.log(response.data.results.slice(0,10))
            setFilmes(response.data.results.slice(0,20))
        }

        loadFilmes()

    }, [])

    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme)=>{
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`} alt={filme.title}/>
                            <button>
                    <a rel="internal" href={`/filmes/${filme.id}`}>
                        Acessar
                    </a>
                </button>
                        </article>
                    )
                })}

            </div>
            
        </div>
    )
}

export default Home;