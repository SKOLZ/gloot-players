import { useState } from 'react';

import { PlayerType, usePlayersData } from '../../services/playersService';
import AddPlayerModal from './components/AddPlayerModal';
import styles from './styles.module.scss';

function Players() {
  const { isLoading, data: response, refetch } = usePlayersData();
  
  const [isOpenAddPlayerModal, setIsOpenAddPlayerModal] = useState(false);
  const closeAddPlayerModal = () => {
    setIsOpenAddPlayerModal(false);
    refetch();
  }

  return (
    <>
      <div className={styles.sectionHeader}>
        <h1 className={styles.title}>players</h1>
        <button onClick={() => setIsOpenAddPlayerModal(true)}>Add player</button>
      </div>
      <ul className={styles.playersList}>
        { 
          isLoading ? <h2>Loading...</h2> :
          response?.data.map((player: PlayerType) => (
            <li key={player.id} className={styles.playerInfo}>
              <span className={styles.playerName}>{player.name}</span>
              <span className={styles.playerActions}>
                <button>Edit Player</button>
                <button>Delete Player</button>
              </span>
            </li>
          ))
        }
      </ul>
      <AddPlayerModal
        isOpen={isOpenAddPlayerModal}
        onCloseModal={closeAddPlayerModal}
      />
    </>
  );
};

export default Players;
