import { useEffect, useRef } from "react";
import { useState } from "react";
import { getAllAnime } from "../api/anime";
import { gsap } from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faCheck, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Home() {
  const [animes, setAnimes] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites')) || []
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const imageSliderRef = useRef(null);
  
  const [imageSliderIndex, setImageSliderIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const loadAnimes = async () => {
      const data = await getAllAnime();
      setAnimes(data);
      setIsLoaded(true);
    }

    loadAnimes();
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const changeImageSlider = (index) => {
    const tl = gsap.timeline();

    tl.to(imageSliderRef.current, {
      opacity: 0.1,
      duration: 0.2,
      onComplete: () => {
        imageSliderIndex === animes.length ? setImageSliderIndex(0) : setImageSliderIndex(index);
      }
    })
    .to(imageSliderRef.current, {
      opacity: 1,
      duration: 0.2
    });
  };

  const addAsFavorite = (id) => {
    setFavorites([...favorites, id]);
  };

  return (
    <div className="bg-newBlack">
      {
        isLoaded 
          ?
          animes !== null && animes.length > 0 
            ?
            (
              <div className="h-95 overflow-hidden relative bg-newBlack">
                <img  ref={imageSliderRef} className="object-cover min-h-full" src={animes[imageSliderIndex].imageSliderMobile} alt={animes[imageSliderIndex].name}/>

                <div className="px-3 flex flex-col gap-10 absolute bottom-0 py-2 w-full h-full justify-end bg-linear-to-t from-newBlack to-transparent">
                  <div className="flex flex-col gap-2">
                    <img className="h-20 object-contain" src={animes[imageSliderIndex].logo} alt={animes[imageSliderIndex].name} />
                    <div className="flex justify-center gap-3">
                      <button onClick={() => navigate(`anime/${animes[imageSliderIndex].id}`)} className="font-bold bg-whiteBrown py-1 px-10 rounded-lg"><FontAwesomeIcon icon={faPlay}/>Assistir Anime</button>
                      <button onClick={() => !favorites.includes(animes[imageSliderIndex].id) && addAsFavorite(animes[imageSliderIndex].id)} className="bg-whiteBrown rounded-lg py-1 px-2"><FontAwesomeIcon icon={!favorites.includes(animes[imageSliderIndex].id) ? faBookmark : faCheck}/></button>
                    </div>
                  </div>
                  <div className="flex justify-center gap-2">
                    {
                      animes.map((_, index) => (
                        <div onClick={() => changeImageSlider(index)} className="h-2 w-7 rounded bg-whiteBrown" key={index}
                          style={{backgroundColor: imageSliderIndex === index ? 'var(--color-blackBrown)' : 'var(--color-whiteBrown)'}}></div>
                      ))
                    }
                  </div>
                </div>
              </div>
            )
            :
            (
              <div>
                Não foi possível carregar o anime.
              </div>
            )
          :
          (
            <div>
              Carregando...
            </div>
          )
      }

      <div className="px-4 py-3 flex flex-col gap-2">
        <h1 className="text-newWhite text-xl font-bold">Animes da temporada 🔥</h1>
        <div className="flex overflow-x-auto gap-3 hide-scrollbar">
          {
            animes.map((anime, index) => (
              <div className="w-40" key={index} onClick={() => navigate(`/anime/${anime.id}`)}>
                <div className="h-60 w-40 bg-cover bg-center flex-[0_0_auto]"
                style={{backgroundImage: `url(${anime.imageCard})`}}></div>
                <h3 className="text-white font-semibold">{anime.name}</h3>
              </div> 
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Home;