import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import './filmes.css';
import {toast} from 'react-toastify';

function Filmes(){

    const {id} = useParams()
    const navigate = useNavigate()
    const [filme, setFilme] = useState({})
    const [opniao, setOpniao] = useState({})

    useEffect(()=>{

        async function loadFilmes(){
    
            const response = await api.get(`/movie/${id}`, {
                params:{
                    api_key: "88822d0f7303867ad55cc3431c8ee984",
                    language: "pt-BR",
                    page:1,
                }
            })
            .then((response)=>{
                setFilme(response.data)
            })
            .catch(()=>{
                navigate("/", { replace: true})
                return
            })
        }

        loadFilmes()

    }, [navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix")

        let filmesSalvos = JSON.parse(minhaLista) || []

        const temFilme = filmesSalvos.some((filmeSalvo)=> filmeSalvo.id === filme.id)

        if(temFilme){
            toast.warn("Você já adicinou este filme na sua lista antes!")
            return
        }

        filmesSalvos.push(filme)
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
        toast.success("Filme adicionado na sua lista de favoritos com sucesso!")
    }

    function opniaoPessoal(){
        const minhaOpniao = localStorage.getItem("@opniao")

        let opniaoesSalvas = JSON.parse(minhaOpniao) || []

        opniaoesSalvas.push(opniao)
        localStorage.setItem("@opniao", JSON.stringify(opniaoesSalvas))
        toast.success("Comentario salvo com sucesso!")
    }

    return(
        <div className="filmeInfo">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/w500/${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>           

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer pt-BR`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}
export default Filmes;