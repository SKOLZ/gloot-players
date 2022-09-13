import { useState } from 'react';

import { PlayerType, usePlayersData } from '../../services/playersService';
import AddPlayerModal from './components/AddPlayerModal';
import PlayerRow from './components/PlayerRow';
import styles from './styles.module.scss';

function Players() {
  const { isLoading, data: response, refetch } = usePlayersData();
  
  const [isOpenAddPlayerModal, setIsOpenAddPlayerModal] = useState(false);
  const closeAddPlayerModal = () =>  setIsOpenAddPlayerModal(false);
  const handlePlayerAdded = () => {
    closeAddPlayerModal();
    refetch();
  }
  const handleDeletePlayer = () => {
    console.log("delete");
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
        onCloseModal={closeAddPlayerModal}
        onPlayerAdded={handlePlayerAdded}
      />
    </>
  );
};

export default Players;
