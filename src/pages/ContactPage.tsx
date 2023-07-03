import React from 'react';
import './ContactPage.scss';
import { Link } from 'react-router-dom';
import { TextField, Button, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ContactPage = () => {
    return (
        <div className='container cotact-container'>
            <div className='row gx-5 d-flex justify-content-center'>
                <div className='col-md-5 flex-column justify-content-center contact-infor'>
                    <h2 className='text-center'>Contact Us</h2>
                    <p>Contact with our well-trained support team now.</p>
                    <div className='row gy-2 flex-column justify-content-center infor'>
                        <h5>Phone number: 0977.54.54.50</h5>
                        <Divider color='' />
                        <h5>Email: AnhLHSE170179@fpt.edu.vn</h5>
                        <Divider color='' />
                        <h5>Address: Vinhomes Grand Park</h5>
                    </div>
                    <p>Looking for support? <Link to="">Visit FAQs and Documentation.</Link></p>
                </div>

                <div className='col-md-6 flex-column justify-content-center contact-input'>
                    <h2 className='text-center'>Leave us your information</h2>
                    <TextField fullWidth id='standard-basic' label='Fullname' variant='standard' margin='normal' />
                    <TextField fullWidth id='standard-basic' label='Phone' variant='standard' margin='normal' />
                    <TextField fullWidth id='standard-basic' label='Email' variant='standard' margin='normal' />
                    <TextField fullWidth id='standard-basic' label='Message' variant='standard' helperText='Write your message' margin='normal' />
                    <Button variant="contained" endIcon={<SendIcon />}>
                        Send
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;