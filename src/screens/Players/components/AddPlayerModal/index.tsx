import { useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { PlayerType, useAddPlayer } from '../../../../services/playersService';
import styles from './styles.module.scss';
import { REQUIRED_ERROR_MSG, UNKNOWN_ERROR_MSG } from '../../../../constants/strings';

type AddPlayerModalProps = {
  isOpen: boolean;
  onCloseModal: () => void;
  onPlayerAdded: () => void;
};

function AddPlayerModal({ isOpen, onCloseModal, onPlayerAdded }: AddPlayerModalProps) {
  Modal.setAppElement('#root');
  const [generalError, setGeneralError] = useState("");
  const handleModalClose = () => {
    reset();
    onCloseModal();
  }

  const onSubmitSuccess = () => {
    reset();
    onPlayerAdded();
  }
  const onSubmitError = () => {
    setGeneralError(UNKNOWN_ERROR_MSG);
  }

  const { mutate: addPlayer } = useAddPlayer(onSubmitSuccess, onSubmitError);
  
  const onSubmit = (newPlayer: PlayerType) => {
    setGeneralError('');
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
      onRequestClose={onCloseModal}
      contentLabel="Add player modal"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2 className={styles.modalTitle}>Add Player</h2>
      <button className={styles.modalClose} onClick={handleModalClose}>close</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input {...register("name", { required: REQUIRED_ERROR_MSG })} id="name"/>
          { errors.name && <p className="contact-error">{errors.name.message}</p> }
        </div>
        <div className="form-group">
          <button type="submit">Add player</button>
          <p>{ generalError }</p>
        </div>
      </form>
    </Modal>
  )
};

export default AddPlayerModal;
