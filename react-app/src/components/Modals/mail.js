import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import Mail from '../mail';

function MailModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='navlink button' onClick={() => setShowModal(true)}>How are you liking the site so far?</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Mail />
        </Modal>
      )}
    </>
  );
}

export default MailModal;
