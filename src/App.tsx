import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Navbar from './components/Navibar';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import PostList from './components/Posts/PostList';
import PostDetail from './components/Posts/PostDetail';
import NaoDeu from './components/NaoDeu';
import CreatePost from './components/Posts/CreatePost';
import EditPost from './components/Posts/EditPost';
import { UserProvider } from './contexts/UserContext';



function App() {
  return (
    <UserProvider>
    <BrowserRouter>
    <div>
      <Navbar />        
      <Routes> 
        <Route path="*" element={<NaoDeu />}/>        
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetail />} />   
        <Route path="/posts/create" element={<CreatePost />} />  
        <Route path='/posts/edit/:id' element={<EditPost />} />
      </Routes>
    </div>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
