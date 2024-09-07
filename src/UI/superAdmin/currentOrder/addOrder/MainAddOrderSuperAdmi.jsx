import React from 'react'
import { useParams } from 'react-router-dom'
import Header from './Header'
import AddOrder from './AddOrder'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getNewOrder } from '../../../../BLL/admin/orderSlice'
import Add from './Add'

export default function MainAddOrder() {

  const dispatch = useDispatch()
  const accountId = useParams();
  React.useEffect(() => {
    dispatch(getNewOrder(accountId))

  }, [])

  const allProducts = useSelector((state) => state.adminOrder?.allProducts);
  const allOrganizations = useSelector(
    (state) => state.adminOrder?.allOrganizations
  );
  console.log(allOrganizations)
  const allPayees = useSelector((state) => state.adminOrder?.allPayees);
  return (
    <>
    <Header></Header>
    {/* <AddOrder></AddOrder> */}
    <Add allOrganizations={allOrganizations} allProducts={allProducts} allPayees={allPayees} isOpen={true}></Add>
    </>
  )
}
