import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Tasks from './Pages/Tasks/Tasks';
import Route from '../src/routes/Route';
function App() {
  const userRoute = createBrowserRouter([
    {
      path: '/',
      element: <Route />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/tasks', element: <Tasks /> },
      ],
    },
  ]);
  return <RouterProvider router={userRoute} />;
}

export default App;
