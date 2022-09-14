import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';

import { PlayerType, useEditPlayer } from "../../../../services/playersService";
import { REQUIRED_ERROR_MSG, UNKNOWN_ERROR_MSG } from "../../../../constants/strings";
import useToggle from "../../../../hooks/useToggle";
import { ReactComponent as EditIcon } from '../../../../assets/edit-icon.svg';
import { ReactComponent as DeleteIcon } from '../../../../assets/delete-icon.svg';
import styles from './styles.module.scss';

type PlayerRowProps = {
  player: PlayerType;
  onDelete: (player: PlayerType) => void;
  onPlayerEdited: () => void;
};

function PlayerRow({player, onDelete, onPlayerEdited}: PlayerRowProps) {
  const [isEditing, toggleEditing] = useToggle();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<PlayerType>({ defaultValues: player });
  const cancelEdit = () => {
    reset(player);
    toggleEditing();
  }
  const onEditSuccess = () => {
    toggleEditing();
    onPlayerEdited();
  }
  const onEditFailed = () => toast.error(UNKNOWN_ERROR_MSG);
  const { mutate: editPlayer } = useEditPlayer(onEditSuccess, onEditFailed);
  const handleEditPlayerSubmit = (editedPlayer: PlayerType) => {
    editPlayer(editedPlayer);
  }


  return (
    <li key={player.id} className={styles.playerInfo}>
      {
        isEditing ? (
          <form onSubmit={handleSubmit(handleEditPlayerSubmit)}>
            <div className="form-group">
              <input {...register("name", { required: REQUIRED_ERROR_MSG })} id="name"/>
              { errors.name && <p className="contact-error">{errors.name.message}</p> }
            </div>
            <button type="submit">apply</button>
            <button type="button" onClick={cancelEdit}>cancel</button>
          </form>
        ) : (
          <>
            <p className={styles.playerName}>{player.name}</p>
            <span className={styles.playerActions}>
              <button className="button" onClick={toggleEditing}>
                <EditIcon className={`icon-1 ${styles.editIcon}`} />
              </button>
              <button className="button" onClick={() => { onDelete(player) }}>
                <DeleteIcon className={`icon-1 ${styles.deleteIcon}`} />
              </button>
            </span>
          </>
        )
      }
    </li>
  )
}

export default PlayerRow;
