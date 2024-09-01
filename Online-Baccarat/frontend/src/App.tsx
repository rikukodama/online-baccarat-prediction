import { useEffect, useState } from 'react';
import { Route, Routes, Router, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,Navigate } from "react-router-dom";
import axios from "axios";

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import Top from './pages/Dashboard/Top';
import NotFound from './pages/NotFound';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import ResetPassword from './pages/Authentication/ResetPassword';
import ChannelPage from './pages/Channel/ChannelPage';
import MeetingDetail from './pages/Channel/Meeting/MeetingDetail';
import MeetingManage from './pages/Channel/Meeting/MeetingManage';
import TaskManage from './pages/Channel/Task/TaskManage';
import AddTask from './pages/Channel/Task/AddTask';
import UpdateTask from './pages/Channel/Task/UpdateTask';
import DetailTask from './pages/Channel/Task/DetailTask';
import WikiManage from './pages/Channel/Wiki/WikiManage';
import AddWiki from './pages/Channel/Wiki/AddWiki';
import UpdateWiki from './pages/Channel/Wiki/UpdateWiki';


import { getUser, getAllUsers } from "./redux/userSlice"; // Make sure to import the getUser action from the correct file
import checkAuth from "./app/auth";
import { getAllchannels } from './redux/channelSlice';
interface RootState {
  user: {
    user: any; // Define a more specific type if you have it
  };
}function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store: RootState) => store.user);
  
  
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {      
      axios.defaults.headers.common["Authorization"] = token;
      dispatch(getUser());
      dispatch(getAllUsers(""));
      dispatch(getAllchannels());
      
    } else {
      delete axios.defaults.headers.common["Authorization"];
      navigate("/auth/signin");
    }
  }, [token]);

 checkAuth();
 
 return loading ? (
   <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/"
          element={
            <Navigate to={token ?(user?.role ==="admin"?"/dashboard":"/home")  : "/auth/signin"} replace />
          }
        />
        <Route
          path="/home"
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Top />
            </>
          }
        />
        <Route
          path="/channel/:channelId"
          element={
              <ChannelPage />
          }
          
        >
          <Route index element={<MeetingManage/>}/>
          <Route path='task/:channelId' element={<TaskManage/>}/>
          <Route path='task/addtask/:channelId' element={<AddTask/>}/>
          <Route path='task/updatetask/:channelId' element={<UpdateTask/>}/>
          <Route path='task/detailtask/:channelId' element={<DetailTask/>}/>

          <Route path='wiki/:channelId' element={<WikiManage/>}/>
          <Route path='wiki/addwiki/:channelId' element={<AddWiki/>}/>
          <Route path='wiki/updatewiki/:channelId' element={<UpdateWiki/>}/>
        </Route>

        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/resetpassword"
          element={
            <>
              <PageTitle title="ResetPssword" />
              <ResetPassword />
            </>
          }
        />
        <Route
          path="/*"
          element={
            <>
              <PageTitle title="ResetPssword" />
              <NotFound />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
