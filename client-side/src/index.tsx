import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Outlet, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import TriviaPage from './pages/trivia-page/TriviaPage';

// interface RouteObject {
//   caseSensitive?: boolean;
//   children?: RouteObject[];
//   element?: React.ReactNode;
//   index?: boolean;
//   path?: string;
// }

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route path='' element={<HomePage />} />
      <Route path='homepage' element={<HomePage />} />
      <Route path="trivia" element={<TriviaPage />} />
    </Route>
  )
);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



