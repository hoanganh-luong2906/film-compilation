import React, { useEffect, useState } from 'react';
import './HomePage.scss';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';

const style = {
    position: 'absolute',
    top: '5%',
    left: '50%',
    transform: 'translate(-50%, 0)',
    width: '60vw',
    bgcolor: 'background.paper',
    overflow: 'scroll',
    height: '100%',
};

const HomePage = () => {

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

    const [open, setOpen] = React.useState<boolean>(false);
    const [selectedFilm, setSelectedFilm] = useState<filmInterface>();
    const [listOfFilm, setListOfFilm] = useState<filmInterface[]>([]);

    const handleOpen = (film: filmInterface) => {
        setOpen(true);
        setSelectedFilm(film);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        async function fetchData(): Promise<void> {
            try {
                const response = await fetch('https://649addc9bf7c145d0239a030.mockapi.io/ListOfFilm');
                if (!response.ok) {
                    throw new Error('Fail to fetch Data at HomePage');
                } else {
                    let data = await response.json();
                    setListOfFilm(data);
                }
            } catch (error) {
                console.log(">>>ERROR: " + error);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <div className='container d-flex justify-content-center homepage-container'>
                <div className='row gy-5 mb-5 d-flex homepage-content'>
                    {
                        listOfFilm.map((film) => {
                            return (
                                <div className='col-md-3 d-flex justify-content-center film-obj' key={Math.random()}>
                                    <button
                                        className='film-item'
                                        key={film.id}
                                        onClick={() => handleOpen(film)}
                                    >
                                        <img src={film.image} alt='poster' />
                                        <label>{film.title}</label>
                                        <div className='d-flex film-shortdes'>
                                            <p>{film.year}  •  {film.length}</p>
                                            <span>Movie</span>
                                        </div>
                                    </button>
                                </div>
                            );
                        })
                    }
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby='parent-modal-title'
                        aria-describedby='parent-modal-description'
                    >
                        {
                            selectedFilm != null ?
                                <Box sx={style}>
                                    <div className='banner-container'>
                                        <iframe
                                            width="100%"
                                            height="510px"
                                            src={selectedFilm.trailer}
                                            title={selectedFilm.title}
                                            allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                        />
                                    </div>
                                    <div className='modal-content'>
                                        <div className='modal-title mb-2'>
                                            <h1>{selectedFilm.title}</h1>
                                            <Button>
                                                <img src='/assets/images/play.png' alt='button' />
                                                Watch
                                            </Button>
                                        </div>
                                        <div className='row gx-2 modal-des p-3'>
                                            <div className='col m7 s12 description'>
                                                <h5>Year of public: {selectedFilm.year}</h5>
                                                <h4>{selectedFilm.title}  |  Description</h4>
                                                <p>{selectedFilm.details}</p>
                                            </div>
                                            <div className='col m4 s12 p-3 information'>
                                                <p>
                                                    Main Actors:
                                                    <span> {selectedFilm.actors}</span>
                                                </p>
                                                <p>
                                                    Genre:
                                                    <span> {selectedFilm.genre}</span>
                                                </p>
                                                <p>
                                                    Nation:
                                                    <span> {selectedFilm.nation}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <Divider />
                                    </div>
                                </Box>
                                :
                                <></>
                        }
                    </Modal>
                </div>
            </div>
        </>
    );
};

export default HomePage;