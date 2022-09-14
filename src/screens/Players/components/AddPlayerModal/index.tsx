import { useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

import { PlayerType, useAddPlayer } from '../../../../services/playersService';
import { REQUIRED_ERROR_MSG, UNKNOWN_ERROR_MSG } from '../../../../constants/strings';
import { ReactComponent as CloseIcon } from '../../../../assets/close-icon.svg';
import styles from './styles.module.scss';

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

  const onAddError = () => toast.error(UNKNOWN_ERROR_MSG);

  const { mutate: addPlayer } = useAddPlayer(onAddSuccess, onAddError);
  
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
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2 className={styles.modalTitle}>Add Player</h2>
      <button className={`button ${styles.modalClose}`} onClick={handleModalClose}>
        <CloseIcon className={`icon-2 ${styles.closeIcon}`} />
      </button>
      <form className={styles.modalForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="name">Name</label>
          <input className={styles.formInput} {...register("name", { required: REQUIRED_ERROR_MSG })} id="name"/>
          { errors.name && <p className="contact-error">{errors.name.message}</p> }
        </div>
        <button className="text-button" type="submit">Add player</button>
      </form>
    </Modal>
  )
};

export default AddPlayerModal;
