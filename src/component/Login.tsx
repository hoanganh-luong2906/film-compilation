import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { Modal, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/userSlice';

declare global {
    interface Window {
        google: any;
    }
}

const style = {
    position: 'absolute',
    top: '5%',
    left: '50%',
    transform: 'translate(-50%, 0)',
    width: '60vw',
    bgcolor: 'white',
    overflow: 'scroll',
    height: '100%',
};

const Login = (props: any) => {

    interface User {
        name: string;
    }

    const [user, setUser] = useState<User | {}>(useSelector((state: any) => state));
    const [open, setOpen] = useState<boolean>(props);
    const dispatch = useDispatch();


    const handleCredentialResponse = (response: any) => {
        console.log("Encoded JWT ID token: " + response.credential);
        var decoded: {} = jwt_decode(response.credential);
        dispatch(updateUser(decoded));
        const button = document.getElementById('buttonDiv');
        if (button) {
            button.hidden = true;
        }
    }

    console.log('user: ' + user);

    const handleLogOut = (e: any) => {
        setUser({});
        const button = document.getElementById('buttonDiv');
        if (button) {
            button.hidden = false;
        }
    }

    useEffect(() => {

        const script = document.createElement('script');
        script.src = 'https://account.google.com/gsi/client';
        script.async = true;
        script.defer = true;

        script.onload = () => {
            if (window.google) {
                window.google.accounts.initialize({
                    client_id: '119685327074-i9h38d67jglcjkhnvlav2nqcf4lssomj.apps.googleusercontent.com',
                    callback: handleCredentialResponse,
                });
                window.google.account.id.renderButton(
                    document.getElementById('buttonDiv'),
                    { theme: 'outline', size: 'large' }
                )
                window.google.account.id.prompt();
            }
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };

    }, []);

    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby='parent-modal-title'
                aria-describedby='parent-modal-description'
            >
                <Box sx={style}>
                    <h2 className='text-center'>LOGIN</h2>
                    <div id='buttonDiv'></div>
                    {Object.keys(user).length !== 0 &&
                        <button onClick={handleLogOut}>Logout</button>
                    }
                    {('name' in user) && (
                        <div>
                            <h5>{user.name}</h5>
                        </div>
                    )}
                </Box>
            </Modal>

        </>
    );
}


export default Login;