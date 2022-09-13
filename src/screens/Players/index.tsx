import { Dispatch, SetStateAction, useState } from 'react';
import useToggle from '../../hooks/useToggle';

import { PlayerType, useDeletePlayer, usePlayersData } from '../../services/playersService';
import AddPlayerModal from './components/AddPlayerModal';
import PlayerDeletionModal from './components/PlayerDeletionModal';
import PlayerRow from './components/PlayerRow';
import styles from './styles.module.scss';

function Players() {
  const { isLoading, data: response, refetch } = usePlayersData();
  
  const [isOpenAddPlayerModal, toggleAddPlayerModal] = useToggle();
  const [isOpenDeletePlayerModal, toggleDeletePlayerModal] = useToggle();
  
  const [playerToDelete, setPlayerToDelete] = useState<PlayerType | null>(null);
  
  const handlePlayerAdded = () => {
    toggleAddPlayerModal();
    refetch();
  }
  
  const handleDeletionConfirmed = () => {
    toggleDeletePlayerModal();
    refetch();
  }

  const handleDeletePlayer = (player: PlayerType) => {
    setPlayerToDelete(player);
    toggleDeletePlayerModal();
  }

  return (
    <>
      <div className={styles.sectionHeader}>
        <h1 className={styles.title}>players</h1>
        <button onClick={toggleAddPlayerModal}>Add player</button>
      </div>
      <ul className={styles.playersList}>
        { 
          isLoading ? <h2>Loading...</h2> :
          response?.data.map((player: PlayerType) => (
            <PlayerRow
              key={player.id}
              player={player}
              onDelete={handleDeletePlayer}
              onPlayerEdited={() => refetch()}
            />
          ))
        }
      </ul>
      <AddPlayerModal
        isOpen={isOpenAddPlayerModal}
        onCancel={toggleAddPlayerModal}
        onPlayerAdded={handlePlayerAdded}
      />
      {
        playerToDelete && (
          <PlayerDeletionModal
            isOpen={isOpenDeletePlayerModal}
            onCancel={toggleDeletePlayerModal}
            onPlayerDeleted={handleDeletionConfirmed}
            player={playerToDelete}
          />
        )
      }
    </>
  );
};

export default Players;
