import AddFilm from '../component/AddFilm';
import ListFilm from '../component/ListFilm';

const EditPage = () => {

    return (
        <div
            className='container-fluid row d-flex justify-content-center'
            style={{
              width: '95%',
              transform: 'translate(5%, 0)'
            }}
          >
            <h2 className='text-center mt-2 mb-2'>List Of Films</h2>
            <AddFilm />
            <ListFilm />
          </div>
    )
}

export default EditPage;