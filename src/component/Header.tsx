import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Header.scss';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { useDispatch } from 'react-redux';
import { updateUser } from '../redux/userSlice';

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

const Header = () => {

    const dispatch = useDispatch();
    const loginUser = useSelector((state: any) => state.user);
    console.log('Header check login user: ', loginUser)
    const [listOfGenre, setListOfGenre] = useState<string[]>([]);

    const handleLogout = () => {
        dispatch(updateUser({}));
        alert('（￣︶￣）↗ You\'ve sucessfully log out')
    }

    useEffect(() => {
        async function fetchData(): Promise<void> {
            try {
                const response = await fetch('https://649addc9bf7c145d0239a030.mockapi.io/ListOfFilm');
                if (!response.ok) {
                    throw new Error('Fail to fetch Data at Header');
                } else {
                    let listOfFilm: filmInterface[] = await response.json();
                    let setOfGenre: Set<string> = new Set();
                    listOfFilm.map((film) => {
                        return film.genre.split(',').forEach((item) => setOfGenre.add(item.trim()));
                    })
                    setListOfGenre(Array.from(setOfGenre));
                }
            } catch (error) {
                console.log(">>>ERROR: " + error);
            }
        }
        fetchData();
    }, []);

    const UserName = styled.li`
        color: inherit;
        font-family: sans-serif;
        text-align: right;
        align-items: center;
        display: flex;
        justify-content: flex-end;
        width: 20vw;
    `
    const UserAvt = styled.img`
        width: 2.2vw;
        border-radius: 50%;
        margin-right: 0.5vw;
    `

    return (
        <div className='container-fluid d-flex header-container'>
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
                        <li className='nav-item'>
                            <Link to='contact-page' className='nav-link'>Contact</Link>
                        </li>
                        {
                            Object.keys(loginUser.user).length === 0 ?
                                <li className='nav-item'>
                                    <Link to='login-page' className='nav-link'>Login</Link>
                                </li>
                                :
                                <UserName>
                                    <UserAvt src={loginUser.user.picture} />
                                    <Link
                                        to='login-page'
                                        className='nav-link'
                                        style={{fontSize: '16px'}}
                                        onClick={handleLogout}
                                    >
                                        {loginUser.user.name}
                                    </Link>
                                </UserName>
                        }
                    </ul>
                </div>

            </nav>
        </div>
    );
};

export default Header;