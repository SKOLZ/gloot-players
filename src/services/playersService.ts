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

type UpdateFunctionType = ((oldPlayers: PlayerType[], player: PlayerType) => PlayerType[]);

const updateListData = (onSuccess: () => void, queryClient: QueryClient, updateFunction: UpdateFunctionType) => (
  (response: AxiosResponse<PlayerType>) => {
    const oldData = queryClient.getQueryData<AxiosResponse<PlayerType[]>>(GET_PLAYERS_KEY);
    if (oldData) {
      const newPlayers = updateFunction(oldData.data, response.data)
      queryClient.setQueryData(GET_PLAYERS_KEY, {
        ...oldData,
        data: newPlayers
      });
    }
    onSuccess();
  }
);

export const useAddPlayer = (onSuccess: () => void, onError: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(addPlayer, {
    onSuccess: updateListData(onSuccess, queryClient, (oldPlayers, addedPlayer) => [...oldPlayers, addedPlayer]),
    onError
  });
}

export const useEditPlayer = (onSuccess: () => void, onError: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(editPlayer, {
    onSuccess: updateListData(onSuccess, queryClient, (oldPlayers, editedPlayer) => {
      return oldPlayers.map(player => (player.id === editedPlayer.id) ? editedPlayer : player);
    }),
    onError
  });
}

export const useDeletePlayer = (onSuccess: () => void, onError: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(deletePlayer, {
    onSuccess: updateListData(onSuccess, queryClient, (oldPlayers, deletedPlayer) => {
      return oldPlayers.filter(player => player.id !== deletedPlayer.id);
    }),
    onError
  });
}
