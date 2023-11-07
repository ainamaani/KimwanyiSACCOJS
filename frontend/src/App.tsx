import React from 'react';
import { BrowserRouter,Routes,Route, Outlet,Navigate } from 'react-router-dom';
import useAuthContext from './hooks/UseAuthContext';
import MemberApplicationPage from './pages/Application';
import MemberApplications from './pages/MemberApplications';
import { ToastContainer } from 'react-toastify';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Loans from './pages/Loans';
import Transactions from './pages/MakeTransaction';
import Members from './pages/Members';
import SetAccount from './pages/SetAccount';
import Login from './pages/Login';
import Home from './pages/Home';
import LoanRequest from './pages/LoanRequest';
import LoanApplications from './pages/LoanApplications';
import MakeTransaction from './pages/MakeTransaction';
import ViewTransactions from './pages/Transactions';
import MemberAccount from './pages/MemberAccount';
import UpdateMemberData from './pages/UpdateMemberData';
import ResetPassword from './pages/ResetPassword';
import MemberAccounts from './pages/MemberAccounts';
import CreateNotification from './pages/Notifications';

function App() {
  const {member} = useAuthContext();

  return (
    <div className="App">
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/apply" element={<MemberApplicationPage />} />
          <Route path="/setaccountdetails" element={<SetAccount/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/resetpassword" element={<ResetPassword/>} />
          <Route
            element={
              <Layout>
                <Outlet /> {/* Use Outlet to render child routes */}
              </Layout>
            }
          >
            <Route path="/dashboard" element={ member ? <Dashboard/> : <Navigate to="/login" />} />
            <Route path="/profile" element={member ? <Profile/> : <Navigate to="/login"/>} />
            <Route path="/loans" element={member ? <Loans/> : <Navigate to="/login"/>} />
            <Route path="/maketransaction" element={member ? <MakeTransaction/> : <Navigate to="/login"/>} />
            <Route path="/transactions" element={member ? <ViewTransactions/> : <Navigate to="/login"/> } />
            <Route path="/applications" element={member ? <MemberApplications/> : <Navigate to="/login"/>} />
            <Route path="/members" element={member ? <Members/> : <Navigate to="/login"/>}/>
            <Route path="/requestloan" element={member ? <LoanRequest/> : <Navigate to="/login"/>} />
            <Route path="/loanrequests" element={member ? <LoanApplications/> : <Navigate to="/login"/>} />
            <Route path="/memberaccount" element={member ? <MemberAccount/> : <Navigate to="/login"/>} />
            <Route path="/update" element={member ? <UpdateMemberData/> : <Navigate to="/login"/>} />
            <Route path="/memberaccounts" element={member ? <MemberAccounts/> : <Navigate to="/login"/>} />
            <Route path="/notifications" element={member ? <CreateNotification/> : <Navigate to="/login"/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
