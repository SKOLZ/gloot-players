import { useState } from 'react';

import useToggle from '../../hooks/useToggle';
import { PlayerType, usePlayersData } from '../../services/playersService';
import { ReactComponent as AddIcon } from '../../assets/add-icon.svg';
import AddPlayerModal from './components/AddPlayerModal';
import PlayerDeletionModal from './components/PlayerDeletionModal';
import PlayerRow from './components/PlayerRow';
import styles from './styles.module.scss';
import Spinner from '../../components/Spinner';
import { PLAYER_LIST_ERROR_MSG } from '../../constants/strings';

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
        <h1 className={styles.title}>players</h1>
        <button className="button" onClick={toggleAddPlayerModal}>
          <AddIcon className={`icon-2 ${styles.addIcon}`} />
        </button>
      </div>
      <ul className={styles.playersList}>
        { 
          isLoading ? <Spinner className={styles.listSpinner} /> :
          response?.data.map((player: PlayerType) => (
            <PlayerRow
              key={player.id}
              player={player}
              onDelete={handleDeletePlayer}
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
};

export default Players;
