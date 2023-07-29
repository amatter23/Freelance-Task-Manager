import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home/Home';
function App() {
  const userRoute = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
  ]);
  return <RouterProvider router={userRoute} />;
}

export default App;
