import { useState } from 'react';

import useToggle from '../../hooks/useToggle';
import { PlayerType, usePlayersData } from '../../services/playersService';
import { ReactComponent as AddIcon } from '../../assets/add-icon-outline.svg';
import Spinner from '../../components/Spinner';
import { PLAYER_LIST_ERROR_MSG } from '../../constants/strings';
import AddPlayerModal from './components/AddPlayerModal';
import PlayerDeletionModal from './components/PlayerDeletionModal';
import PlayerRow from './components/PlayerRow';
import styles from './styles.module.scss';

function Players() {
  const { isLoading, data: response, isLoadingError } = usePlayersData();
  
  const [isOpenAddPlayerModal, toggleAddPlayerModal] = useToggle();
  const [isOpenDeletePlayerModal, toggleDeletePlayerModal] = useToggle();
  
  const [playerToDelete, setPlayerToDelete] = useState<PlayerType | null>(null);
  const handleDeletePlayer = (player: PlayerType) => {
    setPlayerToDelete(player);
    toggleDeletePlayerModal();
  }

  return (
    <main className={styles.main}>
      <div className={styles.sectionHeader}>
        <h1 className={`title-1 ${styles.title}`}>players</h1>
        <button className={`${styles.addButton} button`} onClick={toggleAddPlayerModal}>
          <AddIcon className={styles.addIcon} />
        </button>
      </div>
      <ul className={styles.playersList}>
        { 
          isLoading ? <Spinner className={styles.listSpinner} /> :
          response?.data.map((player: PlayerType, index: number) => (
            <PlayerRow
              key={player.id}
              player={player}
              onDelete={handleDeletePlayer}
              animationDelay={0.2 + index * 0.2}
            />
          ))
        }
        {
          isLoadingError && <p className={styles.listError}>{ PLAYER_LIST_ERROR_MSG }</p>
        }
      </ul>
      <AddPlayerModal
        isOpen={isOpenAddPlayerModal}
        onCancel={toggleAddPlayerModal}
        onPlayerAdded={toggleAddPlayerModal}
      />
      {
        playerToDelete && (
          <PlayerDeletionModal
            isOpen={isOpenDeletePlayerModal}
            onCancel={toggleDeletePlayerModal}
            onPlayerDeleted={toggleDeletePlayerModal}
            player={playerToDelete}
          />
        )
      }
    </main>
  );
}

export default Players;
