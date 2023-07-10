import { Alert } from '@mui/material';
import AddFilm from '../component/AddFilm';
import ListFilm from '../component/ListFilm';
import { useState } from 'react'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';

const EditPage = () => {

  const [isAddNew, setIsAddNew] = useState<string>('');
  const loginUser = useSelector((state: any) => state.user);

  const handleAddNew = (newFilmTitle: string): void => {
    setIsAddNew(newFilmTitle);
  }

  return (
    <div
      className='container-fluid row d-flex justify-content-center'
      style={{
        width: '95%',
        transform: 'translate(5%, 0)'
      }}
    >
      <h2 className='text-center mt-2 mb-2'>List Of Films</h2>
      {
        Object.keys(loginUser.user).length === 0 ?
          <Alert variant="filled" severity="error">You have not logged in!</Alert>
          :
          <>
            <AddFilm setAddNewFilm={handleAddNew} />
            <ListFilm isAddNewFilm={isAddNew} />
          </>
      }
    </div>
  )
}

export default EditPage;