import { Route, Routes } from "react-router-dom";
import Container from './components/Container.js'
import './App.css'
import CardDetails from './components/CardDetails.js';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


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