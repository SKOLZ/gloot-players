import { Axios, AxiosResponse } from 'axios';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';

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

export const useAddPlayer = (onSuccess: () => void, onError: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(addPlayer, {
    onSuccess: (response) => {
      const oldData = queryClient.getQueryData<AxiosResponse<PlayerType[]>>(GET_PLAYERS_KEY);
      if (oldData) {
        queryClient.setQueryData(GET_PLAYERS_KEY, {
          ...oldData,
          data: [
            ...oldData.data,
            response.data
          ]
        });
      }
      onSuccess();
    },
    onError
  });
}

export const useEditPlayer = (onSuccess: () => void, onError: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(editPlayer, {
    onSuccess: (response) => {
      const oldData = queryClient.getQueryData<AxiosResponse<PlayerType[]>>(GET_PLAYERS_KEY);
      if (oldData) {
        const newPlayers = oldData.data.map(player => {
          if (player.id === response.data.id) {
            return response.data;
          } else {
            return player;
          }
        });
        queryClient.setQueryData(GET_PLAYERS_KEY, {
          ...oldData,
          data: newPlayers
        });
      }
      onSuccess();
    },
    onError
  });
}

export const useDeletePlayer = (onSuccess: () => void, onError: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(deletePlayer, {
    onSuccess: (response) => {
      const oldData = queryClient.getQueryData<AxiosResponse<PlayerType[]>>(GET_PLAYERS_KEY);
      if (oldData) {
        const newPlayers = oldData.data.filter(player => player.id !== response.data.id);
        queryClient.setQueryData(GET_PLAYERS_KEY, {
          ...oldData,
          data: newPlayers
        });
      }
      onSuccess();
    },
    onError
  });
}
