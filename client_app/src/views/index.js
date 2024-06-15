import React from 'react';

const Login = React.lazy(() => import('./Login/Login.jsx'));
const Registration = React.lazy(() => import('./Registration/Registration.jsx'));

const Home = React.lazy(() => import('./Home/Home.jsx'));
const SearchPage = React.lazy(() => import('./SearchPage/SearchPage.jsx'));
const ErrorPage = React.lazy(() => import('./ErrorPage/ErrorPage.jsx'));
const ManagePersonalLibrary = React.lazy(() => import('./ManagePersonalLibrary/ManagePersonalLibrary.jsx'));
const SpecificBook = React.lazy(() => import('./SpecificBook/SpecificBook.jsx'));

export { Login, Home, SearchPage, Registration, ErrorPage, ManagePersonalLibrary, SpecificBook };