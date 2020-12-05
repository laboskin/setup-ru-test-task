import React, {useContext, useEffect, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

const StorageContext = React.createContext(null);

export const useStorage = () => useContext(StorageContext);

export const StorageContextProvider = ({children}) => {
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
    const [search, setSearch] = useState('');

    const getUser = id => users.find(user => user.id === id);
    const addUser = payload => setUsers([...users, {...payload, id: uuidv4(), createdAt: +Date.now(), editedAt: +Date.now()}]);
    const editUser = payload => setUsers(users.map(user => user.id===payload.id?{...payload, createdAt: user.createdAt, editedAt: +Date.now()}:user));
    const removeUser = id => setUsers(users.filter(user => user.id !== id));

    useEffect(() => { localStorage.setItem('users', JSON.stringify(users)) });

    return (
        <StorageContext.Provider value={{
            users,
            getUser,
            addUser,
            editUser,
            removeUser,
            search,
            setSearch
        }}>
            {children}
        </StorageContext.Provider>
    )
}