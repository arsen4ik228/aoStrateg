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
   
  return (
    <>
    <Header ></Header>
     <AddUser onName = {setName} onLastName={setLastName} onTelephone={setTelephone}></AddUser>
    <AddButton data = {{name, lastName, telephone, selectedOrganizations}}></AddButton>
    <ListOfAcademy onSelectedOrganizations= {setSelectedOrganizations}></ListOfAcademy> 
   
    </>
  )
}
