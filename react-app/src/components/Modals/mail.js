import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import Mail from '../mail';

function MailModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='mail button' onClick={() => setShowModal(true)}>Have Feedback on Interview Bot?</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Mail />
        </Modal>
      )}
    </>
  );
}

export default MailModal;
