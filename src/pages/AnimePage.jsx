import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faCheck, faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAnimeById } from "../api/anime";

function AnimePage() {
  const { id } = useParams();
  const [anime, setAnime] = useState({});
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites')) || []
  });

  useEffect(() => {
    const loadAnime = async () => {
      const data = await getAnimeById(id);
      setAnime(data);
    }

    loadAnime();
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);
  
  const addAsFavorite = (id) => {
    setFavorites([...favorites, id]);
  };

  return (
    <div className="bg-newBlack">
      <div className="h-105 overflow-hidden relative bg-newBlack">
        <img className="object-cover min-h-full" src={anime.imageSliderMobile} alt={anime.name}/>

        <div className="px-3 flex flex-col gap-10 absolute bottom-0 py-2 w-full h-full justify-end bg-linear-to-t from-newBlack to-transparent">
          <div className="flex flex-col gap-2">
            <img className="h-20 object-contain" src={anime.logo} alt={anime.name} />
            <div className="flex justify-center gap-3">
              <button className="font-bold bg-whiteBrown py-1 px-10 rounded-lg"><FontAwesomeIcon icon={faPlay}/>Assistir Anime</button>
              <button onClick={() => !favorites.includes(anime.id) && addAsFavorite(anime.id)} className="bg-whiteBrown rounded-lg py-1 px-2"><FontAwesomeIcon icon={!favorites.includes(anime.id) ? faBookmark : faCheck}/></button>
            </div>
          </div>
        </div>
      </div>

      <div onClick={() => !favorites.includes(anime.id) && addAsFavorite(anime.id)} className="text-whiteBrown flex flex-col items-center py-4">
        <FontAwesomeIcon className="text-2xl" icon={!favorites.includes(anime.id) ? faPlus : faCheck} />
        <h4 className="text-xs">MINHA LISTA</h4>
      </div>

      <div className="text-newWhite px-6 py-3 text-sm">
        <p>{anime.description}</p>
      </div>
    </div>
  );
}

export default AnimePage;