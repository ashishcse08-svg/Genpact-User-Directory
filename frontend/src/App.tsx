import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import AddUser from './pages/AddUser';
import UserList from './pages/UserList';
import './styles.css';
export default function App() { return <BrowserRouter><Toaster position="top-right" toastOptions={{ duration: 3500 }} /><Routes><Route element={<Layout />}><Route path="/" element={<UserList />} /><Route path="/add" element={<AddUser />} /><Route path="*" element={<Navigate to="/" replace />} /></Route></Routes></BrowserRouter>; }
