import React, { useState, useEffect, Children } from 'react'
import { searchOptions, fetchData } from './api/fetchData.js'
import { Route, Routes } from "react-router-dom";
import Container from './components/Container.js'
import './App.css'
import CardDetails from './components/CardDetails.js';


const App = () => {
  return (
    <div style={{ margin: 'auto', width: "100%" }}>
      <Routes>
          <Route path='/' element={<Container/>} />
          <Route path="/hotels/:id" element={<CardDetails/>} />
        </Routes>
    </div>
  )
}

export default App