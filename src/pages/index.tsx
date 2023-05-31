import {useEffect, useState} from 'react';
import {Outlet, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import Preloader from "../components/Preloader/Preloader";
import Header from "../components/Header/Header";
import Main from "./Main/Main";
import styles from '../components/Preloader/Preloader.module.scss'
import Footer from "../components/Footer/Footer";
// import Header from '../components/Header/Header';
// import Footer from '../components/Footer/Footer';
// import Main from '../pages/Main/Main';
// import Login from './Login/Login';
// import Registration from '../pages/Registration/Registration';
// import NotFound from './NotFound/NotFound';
// import Movies from './Movies/Movies';
// import SavedMovies from './SavedMovies/SavedMovies';
// import Profile from './Profile/Profile';
// import {mainApi} from '../utils/MainApi';
// import {useAuth} from '../hooks/useAuth';
// import Preloader from '../components/Preloader/Preloader';
// import ProtectedRoute from '../hoc/ProtectedRoute';

const SessionLayout = () => {
    // const {setUser} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoadingPage, setIsLoadingPage] = useState(false);

    /*  useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        setIsLoadingPage(true);
        if (jwt) {
          mainApi
            .tokenCheck(jwt)
            .then((data) => {
              setUser({name: data.name, email: data.email});
              navigate(location.pathname);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoadingPage(false));
        } else {
          setIsLoadingPage(false);
        }
      }, []);*/

    return isLoadingPage ? (
        <Preloader className={styles.preloader__round__color_red}></Preloader>
    ) : (
        <Outlet/>
    );
};

const Routing = () => {
    return (
        <Routes>
            <Route element={<SessionLayout/>}>
                <Route element={<Header/>}>
                    {/*    <Route element={<ProtectedRoute auth={true}/>}>*/}
                    {/*      <Route path="/profile" element={<Profile/>}/>*/}
                    {/*    </Route>*/}
                    <Route element={<Footer/>}>
                        <Route path="/" element={<Main/>}/>
                        {/*      <Route element={<ProtectedRoute auth={true}/>}>*/}
                        {/*        <Route path="/movies" element={<Movies/>}/>*/}
                        {/*        <Route path="/saved-movies" element={<SavedMovies/>}/>*/}
                        {/*      </Route>*/}
                        {/*    </Route>*/}
                        {/*  </Route>*/}
                        {/*  <Route path="*" element={<NotFound/>}/>*/}
                        {/*  <Route element={<ProtectedRoute/>}>*/}
                        {/*    <Route path="/signin" element={<Login/>}/>*/}
                        {/*    <Route path="/signup" element={<Registration/>}/>*/}
                    </Route>
                </Route>

            </Route>
        </Routes>
    );
};

export default Routing;
