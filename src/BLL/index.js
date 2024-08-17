import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import completedReducer from './completedSlice';
import workReducer from './workSlice';
import depositReducer from './depositSlice';
import orderReducer from './admin/orderSlice';
import archiveReducer from './admin/archiveSlice';
import depositAdminReducer from './admin/depositAdminSlice';
import userReducer from './admin/userSlice';
import priceListReducer from './admin/priceListSlice';
import postReducer from './postSlice';
import depositSuperAdminReducer from './superAdmin/depositSuperAdminSlice';

export default configureStore({
  reducer: {
    products: productReducer,
    completed: completedReducer,
    work: workReducer,
    deposit: depositReducer,
    adminOrder: orderReducer,
    adminArchive: archiveReducer,
    adminDeposit: depositAdminReducer,
    adminUsers: userReducer,
    adminPriceList: priceListReducer,
    post: postReducer,
    superAdminDeposits: depositSuperAdminReducer,

  },
});