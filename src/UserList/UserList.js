import React, {useEffect, useState} from "react";
import M from "materialize-css";
import {useStorage} from "../Storage/Storage";
import {useModal} from "../Modal/Modal";


function UserList() {
    const showModal = useModal();
    const {users, removeUser, search} = useStorage();
    const [statusFilter, setStatusFilter] = useState('');
    const filteredUsers = users
        .filter(user => !statusFilter || user.status === statusFilter)
        .filter(user => {
            if (user.email.toLowerCase().includes(search.toLowerCase()))
                return true;

            const searchDigits = search.replace(/[^+\d]/g, '');
            if (searchDigits && user.phone.replace(/[^+\d]/g, '').includes(searchDigits))
                return true;

            return false;
        });

    useEffect(() => {
        M.Collapsible.init(document.querySelectorAll('.collapsible'), {accordion: false});
        M.FormSelect.init(document.querySelectorAll('select'));
    });

    return (
        <div className="container" style={{paddingTop: 20}}>
            <select value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
            >
                <option value="">All users</option>
                <option value="client">Clients</option>
                <option value="partner">Partners</option>
                <option value="admin">Admins</option>
            </select>
            {filteredUsers.length > 0 && (
                <ul className="collapsible">
                    {filteredUsers.map(user => (
                        <li key={user.id}>
                            <div className="collapsible-header">
                                <i className="material-icons">account_circle</i>
                                <span style={{flexGrow: 1}}>{user.email}</span>
                                <i className="material-icons cyan-text" onClickCapture={e => {
                                    e.stopPropagation();
                                    showModal(user.id);
                                }}>edit</i>
                                <i className="material-icons red-text" onClickCapture={e => {
                                    e.stopPropagation();
                                    removeUser(user.id);
                                }}>delete</i>
                            </div>
                            <div className="collapsible-body">
                                <p><strong>Email: </strong>{user.email}</p>
                                <p><strong>Password: </strong>{user.password}</p>
                                <p><strong>Phone: </strong>{user.phone}</p>
                                <p><strong>Name: </strong>{user.name}</p>
                                <p><strong>Status: </strong>{user.status}</p>
                                <p><strong>Created at: </strong>{new Date(user.createdAt).toLocaleString()}</p>
                                <p><strong>Edited at: </strong>{new Date(user.editedAt).toLocaleString()}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {filteredUsers.length === 0 && (
                <ul className="collapsible">
                    <div className="no-users-message">
                        <h4>No users found</h4>
                    </div>
                </ul>
            )}
        </div>
    );
}

export default UserList;
