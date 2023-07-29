import './App.css';
import { createBrowserRouter, RouterProvider } from './components/Router';
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
