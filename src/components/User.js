import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useUser } from '../hooks/user-hook';

const User = () => {
    const { getUser, user, updateUser, deleteUser } = useUser();
    const [nameChange, setNameChange] = useState('');
    const [emailChange, setEmailChange] = useState('');
    const [editUser, setEditUser] = useState(null);

    useEffect(() => {
        getUser();
    }, [getUser]);

    const handleUpdate = (userData) => {
        const updatedUser = {
            _id: userData._id,
            name: nameChange,
            email: emailChange,
        };
        updateUser(updatedUser);
        setEditUser(null);
    };

    const handleNameChange = (e) => {
        setNameChange(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmailChange(e.target.value);
    };

    const handleEdit = (userData) => {
        setEditUser(userData._id);
        setNameChange(userData.name);
        setEmailChange(userData.email);
    };

    const handleDelete = (id) => {
        deleteUser(id);
    };

    return (
        <div>
            <h1>Welcome to the User Page</h1>
            <h2>User List</h2>
            {user && user.length > 0 && (
                user.map((userData) => (
                    <div key={userData._id}>
                        <div>
                            {editUser === userData._id ? (
                                <>
                                    <TextField
                                        label="Name"
                                        defaultValue={userData.name}
                                        onChange={handleNameChange}
                                        value={nameChange}
                                    />
                                    <TextField
                                        label="Email"
                                        defaultValue={userData.email}
                                        onChange={handleEmailChange}
                                        value={emailChange}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleUpdate(userData)}
                                    >
                                        Update
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <p>{userData.name} - {userData.email}</p>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleEdit(userData)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDelete(userData._id)}
                                    >
                                        Delete
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default User;
