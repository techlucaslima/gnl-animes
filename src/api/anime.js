import axios from "axios";

export async function getAllAnime() {
    try {
      const response = await axios.get('https://api-gnl-animes.up.railway.app/animes');
      const data = await response.data;
      return data;
    } catch (err) {
      console.log('[Error] ', err);
      return null;
    }
}

export async function getAnimeById(id) {
    try {
      const response = await axios.get(`https://api-gnl-animes.up.railway.app/animes/id/${id}`);
      const data = await response.data;
      return data;
    } catch (err) {
      console.log('[Error] ', err);
      return null;
    }
}

export async function getAnimeByName(name) {
    try {
      const response = await axios.get(`https://api-gnl-animes.up.railway.app/animes/name/${name}`);
      const data = await response.data;
      return data;
    } catch (err) {
      console.log('[Error] ', err);
      return null;
    }
}