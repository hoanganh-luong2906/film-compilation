import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import { ThemeContext } from '../layout/ThemeProvider';

const Header = () => {

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

    const [listOfGenre, setListOfGenre] = useState<string[]>([]);
    // const { theme } = useContext(ThemeContext);

    useEffect(() => {
        async function fetchData(): Promise<void> {
            try {
                const response = await fetch('https://649addc9bf7c145d0239a030.mockapi.io/ListOfFilm');
                if (!response.ok) {
                    throw new Error('Fail to fetch Data at HomePage');
                } else {
                    let listOfFilm: filmInterface[] = await response.json();
                    let setOfGenre: Set<string> = new Set();
                    listOfFilm.map((film) => {
                        film.genre.split(',').forEach((item) => setOfGenre.add(item.trim()));
                    })
                    setListOfGenre(Array.from(setOfGenre));
                }
            } catch (error) {
                console.log(">>>ERROR: " + error);
            }
        }
        fetchData();
    }, []);

    return (
        <div
            className='container-fluid d-flex header-container'
            // style={{
            //     backgroundColor: theme.backgroundColorElement,
            // }}
        >
            <nav className='navbar navbar-expand-lg header-nav'>
                {/* LOGO */}
                <Link className='navbar-brand' to='/'>
                    <img
                        src='/assets/images/LOGO.svg '
                        alt='logo'
                    />
                </Link>

                {/* Toggle Button */}
                <button
                    className='navbar-toggler'
                    type='button' data-bs-toggle='collapse'
                    data-bs-target='#navbarNav' aria-controls='navbarNav'
                    aria-expanded='false' aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>

                {/* NAVIGATION BAR */}
                <div className='collapse navbar-collapse item-container' id='navbarNav'>
                    <ul className='navbar-nav ms-auto mb-2 mb-md-0 nb-content'>
                        <li className='nav-item active'>
                            <Link to='' className='nav-link'>Home</Link>
                        </li>
                        <li className='nav-item genre-btn'>
                            <Link
                                className='nav-link active btn btn-secondary dropdown-btn dropdown-toggle'
                                role='button'
                                id='dropdownMenuLink'
                                data-bs-toggle='dropdown'
                                aria-expanded='false'
                                style={{ position: 'relative' }}
                                to='/'
                            >
                                Genre
                            </Link>
                            <ul
                                className='dropdown-menu'
                                aria-labelledby='dropdownMenuLink'
                            >
                                {
                                    listOfGenre.map((genre) =>
                                        <li key={Math.random()}>
                                            <Link
                                                className='dropdown-item'
                                                to={`/genre-page/${genre}`} key={genre}
                                            >
                                                {genre}
                                            </Link>
                                        </li>
                                    )
                                }
                            </ul>
                        </li>
                        {/* <li className='nav-item'>
                            <Link to='' className='nav-link'>Country</Link>
                        </li> */}
                        <li className='nav-item'>
                            <Link to='contact-page' className='nav-link'>Contact</Link>
                        </li>
                    </ul>
                </div>

            </nav>
        </div>
    );
};

export default Header;