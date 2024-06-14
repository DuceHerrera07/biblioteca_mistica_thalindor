import React from 'react'
import { logout } from '../../routes/auth/auth'

function Navar() {

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand">Biblioteca mística Thalindor</a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor04" aria-controls="navbarColor04" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

      <div className="collapse navbar-collapse" id="navbarColor04">
        <ul className="navbar-nav me-auto">

          <li className="nav-item">
            <a className="nav-link active" href="/">Inicio</a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="/managePersonalLibrary">Libreria personal</a>
          </li>
          
        </ul>
      </div>

      <div className="collapse navbar-collapse justify-content-end" id="navbarColor04">
        <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Buscar" />
          <button className="btn btn-secondary my-2 my-sm-0" type="button">Buscar</button>
        </form>
        <button className="btn btn-secondary my-2 my-sm-0 mx-2" type="button" onClick={handleLogout}>Logout 
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-box-arrow-right mx-1" viewBox="0 0 16 16" style={{transform: 'translateY(-2px)'}}>
          <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
          <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
        </svg>
        </button>
      </div>

    </div>
  </nav>
  )
}

export default Navar