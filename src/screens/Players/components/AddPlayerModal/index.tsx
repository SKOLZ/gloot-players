import { useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';

import { PlayerType, useAddPlayer } from '../../../../services/playersService';
import styles from './styles.module.scss';
import { REQUIRED_ERROR_MSG, UNKNOWN_ERROR_MSG } from './constants';

type AddPlayerModalProps = {
  isOpen: boolean;
  onCloseModal: () => void;
}

function AddPlayerModal({ isOpen, onCloseModal }: AddPlayerModalProps) {
  Modal.setAppElement('#root');
  const [generalError, setGeneralError] = useState("");
  const terminateModal = () => {
    reset();
    onCloseModal();
  }
  const onSubmitError = () => {
    setGeneralError(UNKNOWN_ERROR_MSG);
  }  
  const { mutate: addPlayer } = useAddPlayer(terminateModal, onSubmitError);
  
  const onSubmit = (newPlayer: PlayerType) => {
    setGeneralError('');
    addPlayer(newPlayer);
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
      <button className={styles.modalClose} onClick={terminateModal}>close</button>
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
}

export default AddPlayerModal
