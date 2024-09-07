import React, { useState } from 'react'
import Header from './Header'
import AddUser from './AddUser'
import AddButton from './AddButton'
import ListOfAcademy from './ListOfAcademy'

export default function AddUserMain() {

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [selectedOrganizations, setSelectedOrganizations] = useState([]);
  const [role, setRole] = useState("");
  console.log('name'+ name)
  console.log('lastname'+ lastName)
  console.log('telephone'+ telephone)
  console.log('selectedOrg'+ selectedOrganizations)
  console.log('role'+ role)
  return (
    <>
      <Header ></Header>
      <AddUser onName={setName} onLastName={setLastName} onTelephone={setTelephone} onRole={setRole}></AddUser>
      <AddButton data={{ name, lastName, telephone, selectedOrganizations, role }}></AddButton>
      <ListOfAcademy onSelectedOrganizations={setSelectedOrganizations}></ListOfAcademy>
    </>
  )
}
