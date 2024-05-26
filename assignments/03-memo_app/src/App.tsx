import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from '../src/routes/Home';
import Detail from '../src/routes/Detail';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [{ path: ':id', element: <Detail /> }],
  },
]);

function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;

const GlobalStyles = createGlobalStyle`
  ${reset};
  *{box-sizing: border-box}
  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;  
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  }
  a{
    text-decoration: none;
    color: inherit;
  }
`;
