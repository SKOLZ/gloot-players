import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

import { NAME_MAX_LENGTH, PlayerType, useAddPlayer } from '../../../../services/playersService';
import { MAX_LENGTH_ERROR_MSG, REQUIRED_ERROR_MSG, UNKNOWN_ERROR_MSG } from '../../../../constants/strings';
import { ReactComponent as CloseIcon } from '../../../../assets/close-icon.svg';
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

  const onAddError = () => toast.error(UNKNOWN_ERROR_MSG);

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
      shouldCloseOnOverlayClick={false}
      onRequestClose={handleModalClose}
      contentLabel="Add player modal"
      className="modal"
      overlayClassName="overlay"
    >
      <h2 className="modal-title title-1">Add Player</h2>
      <button className="button modal-close" onClick={handleModalClose}>
        <CloseIcon className="close-icon" />
      </button>
      <form className="modal-body" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Name</label>
          <input
            autoFocus
            className="form-input"
            {
              ...register(
                "name",
                {
                  required: REQUIRED_ERROR_MSG,
                  maxLength: {value: NAME_MAX_LENGTH, message: MAX_LENGTH_ERROR_MSG(NAME_MAX_LENGTH) }
                }
              )
            }
            id="name"
          />
          { errors.name?.type === 'required' && <p className="form-error">{errors.name.message}</p> }
          { errors.name?.type === 'maxLength' && <p className="form-error">{errors.name.message}</p> }
        </div>
        <button className="text-button" type="submit" disabled={isAddingPlayer}>
          { isAddingPlayer ? <Spinner /> : "Add player" }
        </button>
      </form>
    </Modal>
  );
}

export default AddPlayerModal;
