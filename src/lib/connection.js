import axios from 'axios';
import { navigate } from 'svelte-routing';

const baseURL = 'http://localhost:8000/api';

const connection = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

/*
// Funzione per rinfrescare il token
const refreshToken = async () => {
  try {
    const response = await connection.post('/refresh'); // Assicurati che il percorso sia corretto
    return response.data; // Restituisce i nuovi token
  } catch (error) {
    //console.error('Errore durante il refresh del token:', error);
    navigate('/login'); // Reindirizza all'area di login
    throw error; // Propaga l'errore
  }
};

// Intercettore per gestire le risposte
connection.interceptors.response.use(
  (response) => {
    return response; // Restituisci la risposta se tutto va bene
  },
  async (error) => {
    const originalRequest = error.config;

    // Controlla se l'errore è 401 e se non è già stato tentato il refresh
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Imposta un flag per evitare loop infiniti

      try {
        const newTokens = await refreshToken(); // Rinfresca il token
        // I nuovi token sono già impostati nei cookie dal server
        // Riprova la richiesta originale
        return connection(originalRequest);
      } catch (refreshError) {
        console.error('Impossibile aggiornare il token:', refreshError);
        navigate('/login');
        // Gestisci l'errore (ad esempio, reindirizza al login)
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // Propaga l'errore se non è 401 o se il refresh fallisce
  }
);
*/
export default connection;
