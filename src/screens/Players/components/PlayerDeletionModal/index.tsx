import Modal from 'react-modal';
import toast from 'react-hot-toast';

import { PlayerType, useDeletePlayer } from '../../../../services/playersService';
import { UNKNOWN_ERROR_MSG } from '../../../../constants/strings';
import styles from './styles.module.scss';

type PlayerDeletionModalProps = {
  player: PlayerType;
  isOpen: boolean;
  onPlayerDeleted: () => void;
  onCancel: () => void;
};

function PlayerDeletionModal({player, isOpen, onPlayerDeleted, onCancel}: PlayerDeletionModalProps) {
  const onDeleteError = () => toast.error(UNKNOWN_ERROR_MSG);
  const { mutate: deletePlayer } = useDeletePlayer(onPlayerDeleted, onDeleteError);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      contentLabel="Delete player confirmation modal"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2 className={styles.modalTitle}>Delete Player</h2>
      <button className={styles.modalClose} onClick={onCancel}>close</button>
      <p className={styles.modalClose}>
        Are you sure you want to delete {player.name}?
      </p>
      <button className={styles.modalClose} onClick={() => { deletePlayer(player.id) }}>Delete</button>
      <button className={styles.modalClose} onClick={onCancel}>Cancel</button>
    </Modal>
  )
};

export default PlayerDeletionModal;
