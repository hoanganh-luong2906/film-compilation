import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Divider, Link } from '@mui/material';
import SendIcon from '@mui/icons-material/Send'
import './ContactPage.scss';

interface ContactFormValues {
    fullName: string;
    email: string;
    phoneNumber: string;
    feedback: string;
}

const validationSchema = Yup.object({
    fullName: Yup.string().required("Your name is required.").min(2, "Must be 2 characters or more"),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phoneNumber: Yup.number().integer().typeError("Please enter a valid number"),
    feedback: Yup.string().required('Feedback is required'),
});

const ContactUsPage: React.FC = () => {
    const initialValues: ContactFormValues = {
        fullName: '',
        email: '',
        phoneNumber: '',
        feedback: '',
    };

    const handleSubmit = (values: ContactFormValues) => {
        // Handle form submission logic here
        console.log(values);
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <>
            <h2 className='col-md-12 text-center mt-3 mb-3'>Contact Us</h2>
            <Box
                className='container mt-2 d-flex cotact-container row'
                sx={{
                    height: '75vh',
                    margin: '0 auto',
                    backgroundColor: 'inherit !important',
                    color: 'inherit !important',
                    position: 'relative',
                    boxShadow: '0 0 30px #bcbcbc',
                    borderRadius: '5px !important',
                    padding: '7vh 10vh 10vh 10vh !important',
                    justifyContent: 'space-between',
                }}
            >
                <div className='col-md-5 flex-column justify-content-center contact-infor'>
                    <p>Contact with our well-trained support team now.</p>
                    <div className='row gy-2 flex-column justify-content-center infor'>
                        <h5>Phone number: 0977.54.54.50</h5>
                        <Divider color='' />
                        <h5>Email: AnhLHSE170179@fpt.edu.vn</h5>
                        <Divider color='' />
                        <h5>Address: Vinhomes Grand Park</h5>
                    </div>
                    <p>Looking for support? <a>Visit FAQs and Documentation.</a></p>
                </div>
                <div className='col-md-6'>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            margin="dense"
                            name="fullName"
                            label="Full Name"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                            helperText={formik.touched.fullName && formik.errors.fullName}
                        />

                        <TextField
                            fullWidth
                            margin="dense"
                            name="email"
                            label="Email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />

                        <TextField
                            fullWidth
                            margin="dense"
                            name="phoneNumber"
                            label="Phone Number"
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                        />

                        <TextField
                            fullWidth
                            margin="dense"
                            name="feedback"
                            label="Feedback"
                            multiline
                            rows={4}
                            value={formik.values.feedback}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.feedback && Boolean(formik.errors.feedback)}
                            helperText={formik.touched.feedback && formik.errors.feedback}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                            endIcon={<SendIcon />}
                            onClick={() => alert('Thank you for your feedback ლ(╹◡╹ლ)')}
                        >
                            Send
                        </Button>
                    </form>
                </div>
            </Box>
        </>
    );
};

export default ContactUsPage;