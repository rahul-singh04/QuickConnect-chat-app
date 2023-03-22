import './App.css';
import { Chatapp } from './components/app-components/Chatapp';
import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import {  Route, Routes  } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';


function App() {

  //Tried to add protected route
//   const ProtectedRoute= ({children}) =>{
//   if(!currUser){
//      return <Navigate to="/"/>
//   }
// }
// <Route path="/"  element={<ProtectedRoute><Home /></ProtectedRoute> } />

  return (
   <>
   <Navbar/>
   <Routes>
   <Route path="/"  element={<Home /> } />
   <Route path="/chat"  element={<Chatapp />} />
   </Routes>
   </>
  );
}

export default App;
