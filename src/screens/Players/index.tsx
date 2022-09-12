import { playerType, usePlayersData } from '../../services/playersService';
import styles from './styles.module.scss';

function Players() {
  const { isLoading, data: response } = usePlayersData();

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <>
      <div className={styles.sectionHeader}>
        <h1 className={styles.title}>players</h1>
        <button>Add player</button>
      </div>
      <ul className={styles.playersList}>
        { 
          response?.data.map((player: playerType) => (
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
    </>
  );
};

export default Players;
