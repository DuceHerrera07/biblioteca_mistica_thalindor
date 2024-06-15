import React, { useState } from 'react';
import { logout } from '../../routes/auth/auth';
import { useContext } from 'react';
import { SearchContext } from '../../../Context/SearchContext';
import { useNavigate, useNavigation} from 'react-router-dom';

function Navar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const { searchTerm, updateSearchTerm } = useContext(SearchContext);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    updateSearchTerm(event.target.value);
  };
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand">Biblioteca mística Thalindor</a>

        <button className="navbar-toggler" type="button" onClick={handleNavCollapse}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarCollapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" href="/">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/managePersonalLibrary">Libreria personal</a>
            </li>
          </ul>
          { window.location.pathname !== '/search' && (
            <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <input className="form-control me-2" type="search" placeholder="Buscar" value={searchTerm} onChange={(e)=> handleSearchChange(e)}/>
              <button className="btn btn-secondary my-2 my-sm-0" type="button" onClick={()=>{navigate('/search')}}>Buscar</button>
            </form>
          )}
          <button className="btn btn-secondary my-2 my-sm-0 mx-1" type="button" onClick={handleLogout}>
            Logout &nbsp; 
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-box-arrow-right mx-1" viewBox="0 0 16 16" style={{ transform: 'translateY(-2px)' }}>
              <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
              <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navar;