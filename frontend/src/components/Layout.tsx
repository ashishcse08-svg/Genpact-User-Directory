import { NavLink, Outlet } from 'react-router-dom';
export default function Layout() {
  return <div className="app-shell"><header className="topbar"><div className="brand"><span className="brand-mark">UD</span><span>User Directory<small>People, organized.</small></span></div><nav><NavLink to="/add" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Add User</NavLink><NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>User List</NavLink></nav></header><main className="content"><Outlet /></main><footer>USER DIRECTORY <span>•</span> Built with React &amp; .NET 8</footer></div>;
}
