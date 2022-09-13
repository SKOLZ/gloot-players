import { useState } from "react";
import { useForm } from "react-hook-form";
import { PlayerType, useEditPlayer } from "../../../../services/playersService";
import { REQUIRED_ERROR_MSG } from "../../../../constants/strings";
import styles from './styles.module.scss';

type PlayerRowProps = {
  player: PlayerType;
  onDelete: () => void;
  onPlayerEdited: () => void;
};

function PlayerRow({player, onDelete, onPlayerEdited}: PlayerRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<PlayerType>({ defaultValues: player });
  const handleEdit = () => setIsEditing(true);
  const cancelEdit = () => {
    reset(player);
    setIsEditing(false);
  }
  const onEditSuccess = () => {
    setIsEditing(false);
    onPlayerEdited();
  }
  const onEditFailed = () => {
    console.log("error");
    //TODO: check if api is down.
  }
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
          <p className={styles.playerName}>{player.name}</p>
        )
      }
      <span className={styles.playerActions}>
        <button onClick={handleEdit}>Edit Player</button>
        <button onClick={onDelete}>Delete Player</button>
      </span>
    </li>
  )
}

export default PlayerRow;
