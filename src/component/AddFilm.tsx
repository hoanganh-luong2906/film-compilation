import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import styled from '@emotion/styled';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';

interface filmInterface {
    image: string,
    banner: string,
    actors: string,
    title: string,
    year: number,
    nation: string,
    length: string,
    genre: string,
    trailer: string,
    details: string,
    id: string
}

const validationSchema = Yup.object({
    title: Yup.string()
        .required('This field is required')
        .min(5, 'The title must be at least 5 characters'),
    year: Yup.number().integer()
        .typeError('Please enter a valid year')
        .min(1500, 'The Year must be at least 1500s')
        .required('This field is required')
        .max(2500, 'Year out of range'),
})

const AddFilm: React.FC = () => {

    const [isSucceeded, setIsSucceeded] = useState(false);

    const initialValues: filmInterface = {
        image: '/assets/images/Add-Film.jpg',
        banner: '/assets/images/Add-Film.jpg',
        actors: 'This is the actors of the new film added.',
        title: '',
        year: 0,
        nation: 'VN',
        length: '240m',
        genre: 'Action',
        trailer: 'https://www.youtube.com/embed/7GQmXHw9OvQ_IM?&autoplay=1&modestbranding=1&autohide=1&showinfo=0&controls=0',
        details: 'This is the details of the newly added film.',
        id: '' + Math.floor(Math.random() * (100 - 1 + 1)) + 1,
    };

    const handleAddFilm = async (film: filmInterface) => {
        try {
            const response = await axios.post('https://649addc9bf7c145d0239a030.mockapi.io/ListOfFilm', film);
            console.log('Entity added: ' + response.data);
            setIsSucceeded(true);
        } catch (error) {
            console.error('Error adding Entity: ', error);
            setIsSucceeded(false);
        }
    }

    const handleSubmit = () => {
        handleAddFilm(formik.values);
        console.log('Submitted: ', initialValues)
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit
    })

    const Message = styled.p`
        color: red;
        font-size: 16px;
    `

    return (
        <div className='col-md-3 row'>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    label='Title'
                    name='title'
                    margin='normal'
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                />
                <TextField
                    fullWidth
                    label='Year'
                    name='year'
                    margin='normal'
                    value={formik.values.year.toString()}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.year && Boolean(formik.errors.year)}
                    helperText={formik.touched.year && formik.errors.year}
                />
                <Button
                    fullWidth
                    type='submit'
                    variant='contained'
                    sx={{ marginTop: '2vh' }}
                >
                    Add Film
                </Button>
                {
                    isSucceeded &&
                    <Message>Successfully added new film</Message>
                }
            </form>
        </div>
    );
}

export default AddFilm;