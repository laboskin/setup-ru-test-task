import React, {useEffect} from "react";
import M from "materialize-css";
import * as yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Inputmask from "inputmask";
import {useStorage} from "../Storage/Storage";

function UserForm({userId, submitHandler}) {
    const {getUser, editUser, addUser} = useStorage();
    const user = userId?getUser(userId):null;

    const validationSchema = yup.object().shape({
        email: yup.string()
            .trim()
            .lowercase()
            .required('Email is required')
            .email('Email must be a valid email'),
        password: yup.string()
            .trim()
            .min(8, 'Password is too short')
            .max(50, 'Password is too long'),
        phone: yup.string()
            .trim()
            .required('Phone number is required')
            .matches(/\+\d \(\d{3}\) \d{3}-\d{2}-\d{2}/, 'Please enter valid phone number'),
        name: yup.string()
            .trim()
            .min(2, 'Name is too short')
            .max(50, 'Name is too long'),
        status: yup.string()
            .required('Status is required'),

    });
    const { register, handleSubmit, errors } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = data => {
        if(user)
            editUser(data)
        else
            addUser(data);
        submitHandler();
    }

    useEffect(() => {
        const formErrors = Object.values(errors);
        if (formErrors.length)
            M.toast({html: formErrors[0].message});
    });
    useEffect(() => {
        Inputmask({
            mask: '+7 (999) 999-99-99',
            showMaskOnHover: false,
        })
            .mask('#phone');
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input ref={register} type="hidden" name="id" id="id" defaultValue={user?.id} />
            <div className="input-field row">
                <input
                    className="col m12 xl6"
                    ref={register}
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={user?.email || ''}
                />
                <label htmlFor="email" className={user?'active':''}>Email</label>
            </div>
            <div className="input-field row">
                <input
                    className="col m12 xl6"
                    ref={register}
                    id="password"
                    name="password"
                    type="password"
                    defaultValue={user?.password || ''}
                />
                <label htmlFor="password" className={user?'active':''}>Password</label>
            </div>
            <div className="input-field row">
                <input
                    className="col m12 xl6"
                    ref={register}
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    defaultValue={user?.phone || ''}
                />
                <label htmlFor="phone" className={user?'active':''}>Phone number</label>
            </div>
            <div className="input-field row">
                <input
                    className="col m12 xl6"
                    ref={register}
                    id="name"
                    name="name"
                    type="text"
                    defaultValue={user?.name || ''}
                />
                <label htmlFor="name" className={user?'active':''}>Name</label>
            </div>
            <div className="input-field row">
                <select
                    className="col m12 xl6 browser-default"
                    ref={register}
                    id="status"
                    name="status"
                    defaultValue={user?.status || ''}
                >
                    <option value="">Status</option>
                    <option value="client">Client</option>
                    <option value="partner">Partner</option>
                    <option value="admin">Admin</option>
                </select>

            </div>
            {user && (
                <>
                    <div className="input-field row">
                        <input
                            className="col m12 xl6"
                            id="createdAt"
                            name="createdAt"
                            type="text"
                            defaultValue={new Date(user.createdAt).toLocaleString()}
                            disabled
                        />
                        <label htmlFor="createdAt" className="active">Created At</label>
                    </div>
                    <div className="input-field row">
                        <input
                            className="col m12 xl6"
                            id="editedAt"
                            name="editedAt"
                            type="text"
                            defaultValue={new Date(user.editedAt).toLocaleString()}
                            disabled
                        />
                        <label htmlFor="editedAt" className="active">Last Edited At</label>
                    </div>
                </>
            )}
            <button className="btn waves-effect waves-light left" type="submit" name="action">Submit
                <i className="material-icons right">send</i>
            </button>
        </form>
    );
}

export default UserForm;
