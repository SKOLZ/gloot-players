import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';

import { NAME_MAX_LENGTH, PlayerType, useEditPlayer } from "../../../../services/playersService";
import { MAX_LENGTH_ERROR_MSG, REQUIRED_ERROR_MSG, UNKNOWN_ERROR_MSG } from "../../../../constants/strings";
import useToggle from "../../../../hooks/useToggle";
import Spinner from "../../../../components/Spinner";
import { ReactComponent as EditIcon } from '../../../../assets/edit-icon-outline.svg';
import { ReactComponent as DeleteIcon } from '../../../../assets/delete-icon-outline.svg';
import { ReactComponent as ConfirmIcon } from '../../../../assets/confirm-icon-outline.svg';
import { ReactComponent as CancelIcon } from '../../../../assets/cancel-icon-outline.svg';
import styles from './styles.module.scss';

type PlayerRowProps = {
  player: PlayerType;
  onDelete: (player: PlayerType) => void;
  animationDelay: number;
};

function PlayerRow({player, onDelete, animationDelay }: PlayerRowProps) {
  const [editionMode, toggleEditionMode] = useToggle();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<PlayerType>({ defaultValues: player });
  const cancelEdit = () => {
    reset(player);
    toggleEditionMode();
  }
  const onEditFailed = () => toast.error(UNKNOWN_ERROR_MSG);
  const { mutate: editPlayer, isLoading: isEditingPlayer } = useEditPlayer(toggleEditionMode, onEditFailed);
  const handleEditPlayerSubmit = (editedPlayer: PlayerType) => editPlayer(editedPlayer);
  const MAX_ANIMATION_DELAY = 2;

  return (
    <li
      className={styles.playerInfo}
      style={{
        animationDelay: `${Math.min(animationDelay, MAX_ANIMATION_DELAY)}s`
      }}
    >
      {
        editionMode ? (
          <form className={styles.editForm} onSubmit={handleSubmit(handleEditPlayerSubmit)}>
            <div className={`form-group ${styles.editInputWrapper}`}>
              <input 
                className={styles.editInput}
                autoFocus
                {
                  ...register(
                    "name",
                    {
                      required: REQUIRED_ERROR_MSG,
                      maxLength: { value: NAME_MAX_LENGTH, message: MAX_LENGTH_ERROR_MSG(NAME_MAX_LENGTH) }
                    }
                  )
                }
                id="name"
              />
              { errors.name && <p className="form-error">{errors.name.message}</p> }
            </div>
            <span className={styles.playerActions}>
              <button disabled={isEditingPlayer} className="button" type="submit" title="Confirm">
                <ConfirmIcon className={styles.confirmIcon} />
              </button>
              <button disabled={isEditingPlayer} className="button" type="button" onClick={cancelEdit} title="Cancel">
                <CancelIcon className={styles.cancelIcon} />
              </button>
              { isEditingPlayer && <Spinner /> }
            </span>
          </form>
        ) : (
          <>
            <p className={`title-1 ${styles.playerName}`}>{player.name}</p>
            <span className={styles.playerActions}>
              <button className="button" onClick={toggleEditionMode} title="Edit Player">
                <EditIcon className={styles.editIcon} />
              </button>
              <button className="button" onClick={() => { onDelete(player) }} title="Delete Player">
                <DeleteIcon className={styles.deleteIcon} />
              </button>
            </span>
          </>
        )
      }
    </li>
  )
}

export default PlayerRow;
