import PropTypes from 'prop-types';
import { Modal, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const ModalChoice = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleAuto = () => {
    alert('TBC');
    onClose();
  };

  const handleManual = () => {
    onClose();
  };

  const handleFilteredData = () => {
    navigate('/');
  };

  return (
    <Modal open={open} size="small">
      <Modal.Header>Choisissez une option</Modal.Header>
      <Modal.Content>
        <Button onClick={handleAuto} primary>
          Auto
        </Button>
        <Button onClick={handleManual} secondary>
          Manuel
        </Button>
        <div style={{ marginTop: '20px', cursor: 'pointer' }} onClick={handleFilteredData}>
          J&apos;ai déjà filtré mes données
        </div>
      </Modal.Content>
    </Modal>
  );
};

ModalChoice.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalChoice;
