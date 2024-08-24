import React from 'react';
import './App.css'; // Убедитесь, что у вас есть файл App.css в директории src
import Main from './UI/Main/Main.jsx'
import New from './UI/New/New.jsx'
import Add from './UI/New/Add/Add.jsx';
import WorkMain from './UI/Work/WorkMain.jsx';
import ArchiceMain from './UI/Archive/ArchiveMain.jsx'
import Order from './UI/Work/Order/Order.jsx';
import EditOrder from './UI/Work/EditOrder/EditOrder.jsx';
import ArchiveOrder from './UI/Archive/ArchiveOrder/ArchiveOrder.jsx';
import Select from './UI/Work/Select/Select.jsx';
import StartGallery from './UI/New/StartGallery.js'
import MainGallery from './UI/New/MainGallery.js'
import PersonalGallery from './UI/New/PersonalGallery.js'
import UsersMain from './UI/admin/users/UsersMain.jsx'
import EditUserMain from './UI/admin/users/EditUser/EditUserMain.jsx';
import MainExtendedDeposit from './UI/admin/deposit/depositExtended/MainExtendedDeposit.jsx';
import AddUserMain from './UI/admin/users/AddUser/AddUserMain.jsx';
import MainCurrentOrder from './UI/admin/currentOrder/MainCurrentOrder.jsx';
import MainArchiveAdmin from './UI/admin/archive/MainArchiveAdmin.jsx';
import MainExtendCurrentOrder from './UI/admin/currentOrder/extendCurrentOrder/MainExtendCurrentOrder.jsx';
import MainAddBookletAdmin from './UI/admin/priceList/addBooklet/MainAddBookletAdmin.jsx';
import MainAddOrder from './UI/admin/currentOrder/addOrder/MainAddOrder.jsx'
import MainPriceListAdmin from './UI/admin/priceList/MainPriceListAdmin.jsx';
import MainDeposit from './UI/admin/deposit/MainDeposit.jsx';
import { Route, Routes, Navigate } from 'react-router-dom'; // Импортируем NavLink вместо Link
import { useParams } from 'react-router-dom';

const App = () => {
  const { accountId } = useParams(); // Извлекаем accountId из URL
  return (
    <div className="App">

       {/* -----------------ADMIN---------------------------  */}
      <Routes>
        <Route path=":accountId/admin" element={<Navigate replace to="users" />}></Route>
        <Route path=":accountId/admin/*"
        element={
            <Routes>
              <Route path="users" element={<UsersMain></UsersMain>}></Route>

              <Route path="deposit" element={<MainDeposit></MainDeposit>}></Route>

              <Route path="archive" element={<MainArchiveAdmin></MainArchiveAdmin>} ></Route>

              <Route path="priceLists" element={<MainPriceListAdmin></MainPriceListAdmin>} ></Route>

              <Route path="currentOrders" element={<MainCurrentOrder></MainCurrentOrder>}></Route>
            </Routes>
        }></Route>

         <Route path=":accountId/admin/users/addUser" element={<AddUserMain></AddUserMain>}></Route> 
         <Route path=":accountId/admin/users/:accountFocusId" element={<EditUserMain></EditUserMain>} ></Route>
         <Route path=":accountId/admin/deposit/:organizationCustomerId" element={<MainExtendedDeposit></MainExtendedDeposit>}></Route> 
         <Route path=":accountId/admin/priceLists/AddBooklet" element={<MainAddBookletAdmin></MainAddBookletAdmin>} ></Route>
          <Route path=":accountId/admin/currentOrders/:orderId" element={<MainExtendCurrentOrder></MainExtendCurrentOrder>}></Route>
          <Route path=":accountId/admin/currentOrders/addOrder" element={<MainAddOrder></MainAddOrder>}></Route>
      {/* -----------------USER---------------------------  */}
        <Route path="/*" element={<Main />}></Route>
        <Route path=":accountId" element={<Navigate replace to="new" />}></Route>
        <Route path=":accountId/*"
          element={
            <Routes>
              <Route path="new" element={<Navigate replace to="start" />} ></Route>
              <Route
                path="work"
                element={<WorkMain></WorkMain>}
              ></Route>
              <Route
                path="archive"
                element={<ArchiceMain></ArchiceMain>}
              ></Route>
            </Routes>
          }></Route>

        <Route path=":accountId/new" element={<Navigate replace to="start" />} ></Route>
        <Route path=":accountId/new/*"
          element={
            <>
              <New>
                <Routes>
                  <Route
                    path="start"
                    element={<StartGallery></StartGallery>}
                  ></Route>
                  <Route
                    path="main"
                    element={<MainGallery></MainGallery>}
                  ></Route>
                  <Route
                    path="personal"
                    element={<PersonalGallery></PersonalGallery>}
                  ></Route>
                </Routes>
              </New>
            </>
          } ></Route>
          <Route path=":accountId/new/start/:number" element={<Add/>}/>
          <Route path=":accountId/new/main/:number" element={<Add/>}/>
          <Route path=":accountId/new/personal/:number" element={<Add/>}/>

          <Route path=":accountId/work/:number/:status" element={<Order/>} />
          <Route path=":accountId/work/:number/:status/SelectCity" element={<Select/>} />
          <Route path= ":accountId/work/:number/:status/:bookletId" element={<EditOrder/>}></Route>

          <Route path=":accountId/archive/:number/:organizationName" element={<ArchiveOrder />} />

      </Routes>

    </div>
  );
}


export default App;
