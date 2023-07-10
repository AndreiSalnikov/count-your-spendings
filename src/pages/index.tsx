import {useEffect, useState} from 'react';
import {Outlet, Route, Routes,} from 'react-router-dom';
import Preloader from "../components/Preloader/Preloader";
import Header from "../components/Header/Header";
import Main from "./Main/Main";
import styles from '../components/Preloader/Preloader.module.scss'
import Footer from "../components/Footer/Footer";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ProtectedRoute from "../hoc/ProtectedRoute";
import {setUser} from "../store/slices/userSlice";
import {useAppDispatch, useAppSelector} from "../hooks/redux-hooks";
import NotFound from "./NotFound/NotFound";
import {setLoading} from "../store/slices/loadingSlice";

const SessionLayout = () => {
    const {loading} = useAppSelector(state => state.loading)
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      // dispatch(setLoading(true))
       //setIsLoading(true)
        const userString = localStorage.getItem('firebase:authUser:AIzaSyCLB7j1mVRR7mkslNK6utAfuwhv_GvJ-RY:[DEFAULT]');

        if (userString) {

            const {displayName, email, uid} = JSON.parse(userString);
            dispatch(
                setUser({
                    name: displayName,
                    email: email,
                    id: uid,
                })
            );
            setIsLoading(false)
       //     dispatch(setLoading(false))
        } else {
            setIsLoading(false)
       //    dispatch(setLoading(false))
        }
    }, []);

    return isLoading ? (
        <Preloader className={styles.preloader__round__color_red}></Preloader>
    ) : (
        <Outlet/>
    );
};

const Routing = () => {
    return (
        <Routes>
            <Route element={<SessionLayout/>}>
                <Route element={<ProtectedRoute/>}>
                    <Route path="/signin" element={<Login/>}/>
                    <Route path="/signup" element={<Register/>}/>
                </Route>
                <Route path="*" element={<NotFound/>}/>
                <Route element={<Header/>}>
                    <Route element={<Footer/>}>
                        <Route element={<ProtectedRoute auth={true} to={'/signin'}/>}>
                            <Route path="/" element={<Main/>}/>
                        </Route>
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
};

export default Routing;
