import Modal from 'react-modal';
import toast from 'react-hot-toast';

import { PlayerType, useDeletePlayer } from '../../../../services/playersService';
import { UNKNOWN_ERROR_MSG } from '../../../../constants/strings';
import { ReactComponent as CloseIcon } from '../../../../assets/close-icon.svg';
import styles from './styles.module.scss';
import Spinner from '../../../../components/Spinner';

type PlayerDeletionModalProps = {
  player: PlayerType | null;
  isOpen: boolean;
  onPlayerDeleted: () => void;
  onCancel: () => void;
};

function PlayerDeletionModal({player, isOpen, onPlayerDeleted, onCancel}: PlayerDeletionModalProps) {
  const onDeleteError = () => toast.error(UNKNOWN_ERROR_MSG);

  const { mutate: deletePlayer, isLoading: isDeletingPlayer } = useDeletePlayer(onPlayerDeleted, onDeleteError);

  const onDeletionConfirmed = () => {
    if (player){
      deletePlayer(player.id);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={false}
      onRequestClose={onCancel}
      contentLabel="Delete player confirmation modal"
      className="modal"
      overlayClassName="overlay"
    >
      <h2 className="modal-title title-1">Delete Player</h2>
      <button className="button modal-close" onClick={onCancel}>
        <CloseIcon className="close-icon" />
      </button>
      <div className="modal-body">
        <p className={`text-1 ${styles.modalText}`}>
          Are you sure you want to delete {player?.name}?
        </p>
        <button className="text-button" disabled={isDeletingPlayer} onClick={onDeletionConfirmed}>
          { isDeletingPlayer ? <Spinner /> : "Delete" }
        </button>
      </div>
    </Modal>
  );
}

export default PlayerDeletionModal;
