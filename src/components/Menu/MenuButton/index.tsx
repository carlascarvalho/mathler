import { IconDefinition as RegularIconDefinition } from '@fortawesome/free-regular-svg-icons';
import { IconDefinition as SolidIconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import styles from './index.module.css';

const Modal = dynamic(() => import('../../Modal'), {
  ssr: false,
});

interface Props {
  children?: React.ReactNode;
  icon?: RegularIconDefinition | SolidIconDefinition;
  modalOpenOnInit?: boolean;
}

const MenuButton: React.FC<Props> = ({
  children,
  icon,
  modalOpenOnInit = false,
}) => {
  const [openModal, setOpenModal] = useState(modalOpenOnInit);

  return (
    <>
      <button
        className={styles['menu-button']}
        onClick={() => setOpenModal(true)}
      >
        {icon && <FontAwesomeIcon icon={icon} />}
      </button>
      {openModal && (
        <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
          {children}
        </Modal>
      )}
    </>
  );
};

export default MenuButton;
