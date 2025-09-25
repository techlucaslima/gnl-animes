import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getAnimeById } from "../api/anime";
import { useNavigate } from "react-router-dom";

function Favorites() {
  const navigate = useNavigate();

  const [fullFavorites, setFullFavorites] = useState([]);
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  useEffect(() => {
    favorites.forEach(async (id) => {
      const anime = await getAnimeById(id);
      setFullFavorites(prev => {
        if (prev.find(a => a.id === anime.id)) return prev;
        return [...prev, anime];
      });
    });
  }, []);

  return (
    <div className="bg-newBlack flex flex-col items-center">
      <div className="py-6 text-2xl">
        <h1 className="text-newWhite"><FontAwesomeIcon icon={faBookmark}/> Minha Lista</h1>
      </div>
      <div className="px-6 flex flex-wrap justify-center gap-4">
        {
          fullFavorites.map((favorite, index) => (
            <div className="gap-3 w-35" key={index} onClick={() => navigate(`/anime/${favorite.id}`)}>
              <div className="h-55 w-35 bg-cover bg-center"
              style={{backgroundImage: `url(${favorite.imageCard})`}}></div>
              <h3 className="text-white font-semibold">{favorite.name}</h3>
            </div> 
          ))
        }
      </div>
    </div>
  );
} 

export default Favorites;