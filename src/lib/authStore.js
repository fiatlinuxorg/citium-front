// authStore.js
import { writable } from 'svelte/store';

// Funzione per ottenere lo stato di autenticazione da localStorage
const getAuthState = () => {
    const storedState = localStorage.getItem('authState');
    return storedState ? JSON.parse(storedState) : { isAuthenticated: false, user: null };
};

// Crea lo store con lo stato iniziale recuperato da localStorage
export const authStore = writable(getAuthState());

// Funzione per aggiornare lo stato di autenticazione
export const login = (user) => {
    const newState = { isAuthenticated: true, user };
    authStore.set(newState);
    //localStorage.setItem('authState', JSON.stringify(newState)); // Salva nello storage
};

// Funzione per effettuare il logout
export const logout = () => {
    const newState = { isAuthenticated: false, user: null };
    authStore.set(newState);
    localStorage.setItem('authState', JSON.stringify(newState)); // Salva nello storage
};
