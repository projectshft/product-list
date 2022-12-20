import PropTypes from 'prop-types';

const ConfirmationModal = ({ onConfirm, onDeny }) => (
  <div className="flex flex-col items-center w-48 border bg-white p-2 rounded shadow">
    <div className="flex text-center">Are you sure?</div>
    <div className="flex justify-between w-full">
      <button
        className="px-2 py-1 border m-1 w-1/2 hover:bg-stone-500 hover:text-white hover:border-white"
        type="button"
        onClick={onConfirm}
      >
        Yes
      </button>
      <button
        className="px-2 py-1 border m-1 w-1/2 hover:bg-stone-500 hover:text-white hover:border-white"
        type="button"
        onClick={onDeny}
      >
        No
      </button>
    </div>
  </div>
);

ConfirmationModal.propTypes = {
  onConfirm: PropTypes.func,
  onDeny: PropTypes.func,
};

export default ConfirmationModal;
