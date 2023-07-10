import RootLayout from './layout/RootLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GenrePage from './pages/GenrePage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import EditPage from './pages/EditPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'contact-page', element: <ContactPage /> },
      { path: 'genre-page/:genre', element: <GenrePage /> },
      { path: 'login-page', element: <LoginPage /> },
      { path: 'edit-page', element: <EditPage /> },
    ]
  }
]);

function App() {

  // const dispatch: any = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchFilmData());
  // }, [dispatch]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
