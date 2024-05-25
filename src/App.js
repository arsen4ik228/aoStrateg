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
import { Route, Routes, Navigate } from 'react-router-dom'; // Импортируем NavLink вместо Link
import { useParams } from 'react-router-dom';

const App = () => {
  const { accountId } = useParams(); // Извлекаем accountId из URL
  return (
    <div className="App">


      <Routes>
        <Route path="/*" element={<Main />}></Route>
        <Route path=":accountId" element={<Navigate replace to="new" />}></Route>
        <Route path=":accountId/*"
          element={
            <Routes>
              <Route path="new" element={<Navigate replace to="start" />} ></Route>
              <Route
                path="work"
                element={<></>}
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
                  {/* <Route
                        path="deposit"
                        element={}
                      ></Route> */}
                </Routes>
              </New>
            </>
          } ></Route>
          
 <        Route path=":accountId/archive/:number" element={<ArchiveOrder />} />

        {/* <Route path=":accountId/archive/*"
          element={
            <Routes>
              <Route path="ArchiveOrder" element={<ArchiveOrder />} ></Route>
            </Routes>
          }></Route> */}

        {/* ПЕРЕАДРЕСАЦИ ДЛЯ РАБОТЫ МЕНЮ     */}
        {/* <Route path=":accountId/new/archive" element={window.location.href = `#/${accountId}/archive`}></Route> */}
        {/*
            <Route path=":accountId/archive" element={<ArchiceMain />} />
            <Route path=":accountId/archive/archiveOrder" element={<ArchiveOrder />} />

            <Route path="work/order" element={<Order />} />
            <Route path='work/order/EditOrder' element={<EditOrder />} />
            <Route path="work/*" element={<WorkMain />} /> */}
        {/* <Route path=':accountId/new/add' element={<Add/>} /> */}

      </Routes>

    </div>
  );
}


export default App;
