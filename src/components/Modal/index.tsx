import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MutableRefObject } from 'react';
import { createPortal } from 'react-dom';
import styles from './index.module.css';

interface Props {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  modalRef: MutableRefObject<any>;
}

const Modal: React.FC<Props> = ({ children, isOpen, onClose, modalRef }) => {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={styles.modal} ref={modalRef}>
      <button className={styles['close-button']} onClick={onClose}>
        <FontAwesomeIcon icon={faCircleXmark} />
      </button>
      {children}
    </div>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default Modal;
