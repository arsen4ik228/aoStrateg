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
import MainInnerOrder from './UI/admin/currentOrder/extendCurrentOrder/innerOrder/MainInnerOrder.jsx';
import MainAddBookletAdmin from './UI/admin/priceList/addBooklet/MainAddBookletAdmin.jsx';
import MainAddOrder from './UI/admin/currentOrder/addOrder/MainAddOrder.jsx'
import MainPriceListAdmin from './UI/admin/priceList/MainPriceListAdmin.jsx';
import MainDeposit from './UI/admin/deposit/MainDeposit.jsx';
// superAdmin
import MainPriceListSuperAdmin from './UI/superAdmin/priceList/MainPriceListSuperAdmin.jsx'
import MainCurrentOrderSuperAdmin from './UI/superAdmin/currentOrder/MainCurrentOrderSuperAdmin.jsx';
import MainArchiveSuperAdmin from './UI/superAdmin/archive/MainArchiveSuperAdmin.jsx'
import MainDepositSuperAdmin from './UI/superAdmin/deposit/MainDepositSuperAdmin.jsx'
import MainExtendDepositSuperAdmin from './UI/superAdmin/deposit/depositExtended/MainExtendedDepositSuperAdmin.jsx'
import UsersMainSuperAdmin from './UI/superAdmin/users/UsersMainSuperAdmin.jsx'
import AddUserMainSuperAdmin from './UI/superAdmin/users/AddUser/AddUserMainSuperAdmin.jsx'
import EditUserMainSuperAdmin from './UI/superAdmin/users/EditUser/EditUserMainSuperAdmin.jsx'
import Reciever from './UI/superAdmin/reciever/Reciever.jsx';
import Statistics from './UI/superAdmin/statistics/Statistics.jsx';
import Commission from './UI/superAdmin/commission/Commission.jsx';
import MainRemeins from './UI/superAdmin/commission/remains/MainRemeins.jsx';
import Mainrules from './UI/superAdmin/commission/rules/Mainrules.jsx';
import MainAddOrderSuperAdmi from './UI/superAdmin/currentOrder/addOrder/MainAddOrderSuperAdmi.jsx'
import MainInnerOrderSuperAdmin from './UI/superAdmin/currentOrder/extendCurrentOrder/innerOrder/MainInnerOrderSuperAdmin.jsx';
import MainAddBookletSuperAdmin from './UI/superAdmin/priceList/addBooklet/MainAddBookletAdmin.jsx';
import { Route, Routes, Navigate } from 'react-router-dom'; // Импортируем NavLink вместо Link
import { useParams } from 'react-router-dom';

const App = () => {
  const { accountId } = useParams(); // Извлекаем accountId из URL
  return (
    <div className="App">

      {/*--------------------superAdmin----------------------- */}
      <Routes>
        <Route path=":accountId/superAdmin" element={<Navigate replace to="currentOrders" />}></Route>
        <Route path=":accountId/superAdmin/*"
        element={
            <Routes>
              <Route path="currentOrders" element={<MainCurrentOrderSuperAdmin></MainCurrentOrderSuperAdmin>}></Route>

              <Route path="users" element={<UsersMainSuperAdmin></UsersMainSuperAdmin>}></Route>

              <Route path="deposit" element={<MainDepositSuperAdmin></MainDepositSuperAdmin>}></Route>

              <Route path="archive" element={<MainArchiveSuperAdmin></MainArchiveSuperAdmin>} ></Route>

              <Route path="priceLists" element={<MainPriceListSuperAdmin></MainPriceListSuperAdmin>} ></Route>

              <Route path="payee" element={<Reciever></Reciever>}></Route>

              <Route path="statistics" element={<Statistics></Statistics>}></Route>

              <Route path="comission" element={<Commission></Commission>}></Route>
              
            </Routes>
        }></Route>

        <Route path=":accountId/superAdmin/currentOrders/addOrder" element={<MainAddOrderSuperAdmi></MainAddOrderSuperAdmi>}></Route>
        <Route path=":accountId/superAdmin/currentOrders/:id" element={<MainInnerOrderSuperAdmin></MainInnerOrderSuperAdmin>}></Route>
        <Route path=":accountId/superAdmin/priceLists/AddBooklet" element={<MainAddBookletSuperAdmin></MainAddBookletSuperAdmin>}></Route>
        <Route path=":accountId/superAdmin/deposit/:organizationCustomerId" element={<MainExtendDepositSuperAdmin></MainExtendDepositSuperAdmin>}></Route> 
        <Route path=":accountId/superAdmin/users/addUser" element={<AddUserMainSuperAdmin></AddUserMainSuperAdmin>}></Route> 
        <Route path=":accountId/superAdmin/users/:accountFocusId" element={<EditUserMainSuperAdmin></EditUserMainSuperAdmin>}></Route> 
        <Route path=":accountId/superAdmin/comission/:commisionRecieverId" element={<MainRemeins></MainRemeins>}></Route>
        <Route path=":accountId/superAdmin/comission/rules/:commisionRecieverId" element={<Mainrules></Mainrules>}></Route>

        </Routes>

       {/* -----------------ADMIN---------------------------  */}
      <Routes>
        <Route path=":accountId/admin" element={<Navigate replace to="currentOrders" />}></Route>
        <Route path=":accountId/admin/*"
        element={
            <Routes>
              <Route path="currentOrders" element={<MainExtendCurrentOrder></MainExtendCurrentOrder>}></Route>

              <Route path="users" element={<UsersMain></UsersMain>}></Route>

              <Route path="deposit" element={<MainDeposit></MainDeposit>}></Route>

              <Route path="archive" element={<MainArchiveAdmin></MainArchiveAdmin>} ></Route>

              <Route path="priceLists" element={<MainPriceListAdmin></MainPriceListAdmin>} ></Route>
            </Routes>
        }></Route>

         <Route path=":accountId/admin/users/addUser" element={<AddUserMain></AddUserMain>}></Route> 
         <Route path=":accountId/admin/users/:accountFocusId" element={<EditUserMain></EditUserMain>} ></Route>
         <Route path=":accountId/admin/deposit/:organizationCustomerId" element={<MainExtendedDeposit></MainExtendedDeposit>}></Route> 
         <Route path=":accountId/admin/priceLists/AddBooklet" element={<MainAddBookletAdmin></MainAddBookletAdmin>} ></Route>
          <Route path=":accountId/admin/currentOrders/:id" element={<MainInnerOrder></MainInnerOrder>}></Route>
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
