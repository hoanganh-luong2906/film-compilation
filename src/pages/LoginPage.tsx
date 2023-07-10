import { useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { styled } from 'styled-components';

declare global {
    interface Window {
        google: any;
    }
}

function LoginPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const user = useSelector((state: any) => state.user);
    // console.log(user);

    const handleCredentialResponse = (response: any) => {
        console.log("Encoded JWT ID token: " + response.credential);
        var decoded: {} = jwt_decode(response.credential);
        dispatch(updateUser(decoded));
        const button = document.getElementById('buttonDiv');
        if (button) {
            button.hidden = true;
        }
        navigate('/edit-page');
    }

    const handleLogOut = (e: any) => {
        dispatch(updateUser({}));
        const button = document.getElementById('buttonDiv');
        if (button) {
            button.hidden = false;
        }
        navigate('/');
    }

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => {
            if (window.google) { // Check if google is defined
                window.google.accounts.id.initialize({
                    client_id: '119685327074-i9h38d67jglcjkhnvlav2nqcf4lssomj.apps.googleusercontent.com',
                    callback: handleCredentialResponse,
                });
                window.google.accounts.id.renderButton(document.getElementById('buttonDiv'), {
                    theme: 'outline',
                    size: 'large',
                    
                });
                window.google.accounts.id.prompt(); // also display the One Tap dialog
            }
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    
    const LoginWrapper = styled.div `
        width: 50vw !important;
        height: 50vh;
        box-shadow: 0 0 30px #bcbcbc;
        padding: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        border-radius: 5px;
    `
    const googleLogin = styled.div`
        width: 100%;
        height: 50px
    `

    return (
        <>
            <h2 className='text-center mt-3 mb-3'>LOGIN PAGE</h2>
            <LoginWrapper className='container mt-5'>
                <p>Login with Google for modifying our database.</p>
                <div id='buttonDiv'></div>
            </LoginWrapper>
        </>
    );
}

export default LoginPage;