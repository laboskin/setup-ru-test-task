import React, {useCallback, useContext, useEffect, useState} from 'react';
import M from "materialize-css";
import UserForm from "../UserForm/UserForm";

const ModalContext = React.createContext(null);

export const useModal = () => useContext(ModalContext);

export const ModalContextProvider = ({children}) => {
    const [userId, setUserId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = (id = null) => {
        setUserId(id);
        M.Modal.getInstance(document.querySelector('.modal')).open();
    }
    const formSubmitHandler = useCallback(() => {
        M.Modal.getInstance(document.querySelector('.modal')).close();
    }, []);

    useEffect(() => {
        M.Modal.init(document.querySelector('.modal'), {
            onOpenStart: () => {
                setModalVisible(true);
            },
            onCloseEnd: () => {
                setModalVisible(false);
                setUserId(null);
            },
            preventScrolling: false
        });
    }, []);

    return (
        <ModalContext.Provider value={showModal}>
            {children}
            <div className="modal">
                <div className="modal-content">
                    <h4 style={{marginBottom: 40}}>{userId?`Edit user #${userId}`:'Add user'}</h4>
                    {modalVisible && (
                        <UserForm userId={userId} submitHandler={formSubmitHandler} />
                    )}
                </div>
            </div>
        </ModalContext.Provider>
    )
}