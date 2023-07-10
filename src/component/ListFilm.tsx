import { useState, useEffect } from 'react';
import { ListItem, ListItemText, TextField, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import * as Yup from 'yup';
import axios from 'axios';

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

interface inputInterface {
    newTitle: string,
}

const validationSchema = Yup.object<inputInterface>({
    newTitle: Yup.string()
        .required('You must provide a title')
        .min(5, 'The title must be at least 5 characters')
})

const style = {
    margin: '0 1vw',
}

const ListFilm = () => {

    const [listOfFilm, setListOfFilm] = useState<filmInterface[]>([]);
    const [input, setInput] = useState<inputInterface>({ newTitle: '' });
    const [error, setError] = useState<string>('');
    const [selectedComp, setSelectedComp] = useState<string>('');
    const [executedData, setExecutedData] = useState<filmInterface>();

    useEffect(() => {
        async function fetchData(): Promise<void> {
            try {
                const response = await fetch('https://649addc9bf7c145d0239a030.mockapi.io/ListOfFilm');
                if (!response.ok) {
                    throw new Error('Fail to fetch Data at ListFilm');
                } else {
                    let data = await response.json();
                    setListOfFilm(data);
                }
            } catch (error) {
                console.log(">>>ERROR: " + error);
            }
        }
        fetchData();
        setInput({newTitle: ''});
        setError('');
    }, [executedData]);

    const handleUpdateFilm = async (updatedFilm: filmInterface) => {
        try {
            const response = axios.put(`https://649addc9bf7c145d0239a030.mockapi.io/ListOfFilm/${updatedFilm.id}`,updatedFilm);
            console.log('Successfully update Film: ', (await response).data);
            setExecutedData((await response).data);
        }catch (error) {
            console.log('>>> Error at Update Film: ', error);
        }
    };

    const handleRemoveFilm = async (filmId: string) => {
        try {
            const response = await axios.delete(`https://649addc9bf7c145d0239a030.mockapi.io/ListOfFilm/${filmId}`);
            console.log('Successfully remove Film: ', response.data);
            setExecutedData(response.data);
        } catch (error) {
            console.log('>>> Error at Remove Film: ', error);
        }
    };

    const handleInput = (event: any) => {
        let inputData = { newTitle: event.target.value }
        validationSchema.validate(inputData)
            .then(success => {
                setError('');
                setInput(inputData);
            })
            .catch((validationError: Yup.ValidationError) => {
                setError(validationError.message);
            })
    }

    return (
        <div className='col-md-9' style={{ width: '60%' }}>
            {
                listOfFilm.map((film) => {
                    return (
                        <form key={film.id}>
                            <ListItem>
                                <ListItemText primary={film.title} secondary={film.title} sx={style} />
                                <TextField
                                    placeholder='Type new title...'
                                    name='newTitle'
                                    onChange={(event) => {
                                        handleInput(event)
                                        setSelectedComp(film.id);
                                    }}
                                    error={film.id === selectedComp && !!error}
                                    helperText={film.id === selectedComp ? error : undefined}
                                />
                                <Button
                                    sx={style}
                                    variant='contained'
                                    onClick={() => {
                                        handleUpdateFilm({
                                            image: film.image,
                                            banner: film.banner,
                                            actors: film.actors,
                                            title: input.newTitle,
                                            year: film.year,
                                            nation: film.nation,
                                            length: film.length,
                                            genre: film.genre,
                                            trailer: film.trailer,
                                            details: film.details,
                                            id: film.id
                                        });
                                    }}
                                >
                                    Update
                                </Button>
                                <IconButton
                                    aria-label="delete"
                                    color="error"
                                    onClick={() => handleRemoveFilm(film.id)}
                                    sx={style}
                                >

                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        </form>
                    );
                })
            }
        </div>
    )
}

export default ListFilm;