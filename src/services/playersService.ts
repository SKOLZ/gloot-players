import { useMutation, useQuery } from 'react-query';

import api from './apiConfig';

// React-Query request keys
const GET_PLAYERS_KEY = 'players';
const GET_PLAYER_KEY = (playerId: number) => ['player', playerId];

// API calls
const getPlayers = () => api.get('/players');
const createPlayer = () => api.post(`/player`);
const getPlayer = (playerId: number) => api.get(`/players/${playerId}`);
const editPlayer = (playerId: number) => api.put(`/players/${playerId}`);
const deletePlayer = (playerId: number) => api.delete(`/players/${playerId}`);

export type playerType = {
  id: string;
  name: string;
};


// React-Query custom hook calls 

export const usePlayersData = () => {
  return useQuery(GET_PLAYERS_KEY, getPlayers);
}

export const useCreatePlayer = () => {
  return useMutation(createPlayer);  
}

export const usePlayerData = (playerId: number) => {
  return useQuery(GET_PLAYER_KEY(playerId), () => getPlayer(playerId));  
}

export const useEditPlayer = () => {
  return useMutation(editPlayer);  
}

export const useDeletePlayer = () => {
  return useMutation(deletePlayer);  
}
