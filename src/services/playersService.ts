import { useMutation, useQuery } from 'react-query';

import api from './apiConfig';

// React-Query request keys
const GET_PLAYERS_KEY = 'players';

// API calls
const getPlayers = () => api.get('/players');
const addPlayer = (newPlayer: PlayerType) => api.post(`/player`, newPlayer);
const editPlayer = (editedPlayer: PlayerType) => api.put(`/player/${editedPlayer.id}`, editedPlayer);
const deletePlayer = (playerId: string) => api.delete(`/player/${playerId}`);

export type PlayerType = {
  id: string;
  name: string;
};

// React-Query custom hook calls 
export const usePlayersData = () => useQuery(GET_PLAYERS_KEY, getPlayers);

export const useAddPlayer = (onSuccess: () => void, onError: () => void) => useMutation(addPlayer, { onSuccess, onError });

export const useEditPlayer = (onSuccess: () => void, onError: () => void) => useMutation(editPlayer, {onSuccess, onError});

export const useDeletePlayer = (onSuccess: () => void, onError: () => void) => useMutation(deletePlayer, {onSuccess, onError});  
