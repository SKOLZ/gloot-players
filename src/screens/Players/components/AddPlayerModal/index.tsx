import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

import { PlayerType, useAddPlayer } from '../../../../services/playersService';
import { REQUIRED_ERROR_MSG, UNKNOWN_ERROR_MSG } from '../../../../constants/strings';
import { ReactComponent as CloseIcon } from '../../../../assets/close-icon.svg';
import styles from './styles.module.scss';
import useToggle from '../../../../hooks/useToggle';
import Spinner from '../../../../components/Spinner';

type AddPlayerModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onPlayerAdded: () => void;
};

function AddPlayerModal({ isOpen, onCancel, onPlayerAdded }: AddPlayerModalProps) {
  const handleModalClose = () => {
    reset();
    onCancel();
  }

  const onAddSuccess = () => {
    reset();
    onPlayerAdded();
  }

  const onAddError = () => {
    toast.error(UNKNOWN_ERROR_MSG);
  }

  const { mutate: addPlayer, isLoading: isAddingPlayer } = useAddPlayer(onAddSuccess, onAddError);
  
  const onSubmit = (newPlayer: PlayerType) => {
    const newPlayerWithId = {
      ...newPlayer,
      id: uuidv4()
    };
    addPlayer(newPlayerWithId);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<PlayerType>();


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      contentLabel="Add player modal"
      className="modal"
      overlayClassName="overlay"
    >
      <h2 className="modal-title">Add Player</h2>
      <button className="button modal-close" onClick={handleModalClose}>
        <CloseIcon className="icon-2 close-icon" />
      </button>
      <form className="modal-body" onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="name">Name</label>
          <input className={styles.formInput} {...register("name", { required: REQUIRED_ERROR_MSG })} id="name"/>
          { errors.name && <p className="contact-error">{errors.name.message}</p> }
        </div>
        <button className="text-button" type="submit" disabled={isAddingPlayer}>
          { isAddingPlayer ? <Spinner /> : "Add player" }
        </button>
      </form>
    </Modal>
  )
};

export default AddPlayerModal;
