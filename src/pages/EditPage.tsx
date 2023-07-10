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
      {
        Object.keys(loginUser.user).length === 0 ?
          <Alert
            variant="filled"
            severity="error"
            sx={{ margin: '3vh 0', fontSize: '20px', alignItems: 'center' }}
          >
            You have not logged in!
          </Alert>
          :
          <>
            <h2 className='text-center mt-2 mb-2'>List Of Films</h2>
            <AddFilm setAddNewFilm={handleAddNew} />
            <ListFilm isAddNewFilm={isAddNew} />
          </>
      }
    </div>
  )
}

export default EditPage;