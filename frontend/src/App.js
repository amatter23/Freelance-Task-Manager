import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../src/Pages/Home/Home';
import Tasks from './Pages/Tasks/Tasks';
import Route from '../src/routes/Route';
import AddTask from './components/Task/AddTask';
function App() {
  // todo create a home page
  const userRoute = createBrowserRouter([
    {
      path: '/',
      element: <Route />,
      children: [
        { path: '/', element: <Tasks /> },
        { path: '/tasks', element: <Tasks /> },
      ],
    },
  ]);
  return <RouterProvider router={userRoute} />;
}

export default App;
