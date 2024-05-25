import React from 'react'
import { AppBar, Toolbar, Typography, Button, Grid, Paper } from '@mui/material';
import PhotoGallery from './StartGallery';
import Header from './Header';
import TabsComponent from './Tabs';

export default function New(props) {

    return (
        <div>
        <Header />
        <TabsComponent />
       
        {props.children}
        </div>
    )
}
