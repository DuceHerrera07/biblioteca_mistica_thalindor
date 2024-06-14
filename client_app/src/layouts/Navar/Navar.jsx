import React from 'react'

function Navar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand">Biblioteca mística Thalindor</a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor04" aria-controls="navbarColor04" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">

          <li className="nav-item">
            <a className="nav-link active" href="/">Inicio</a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="/managePersonalLibrary">Libreria personal</a>
          </li>
          
        </ul>
      </div>

      <div className="collapse navbar-collapse justify-content-end">
        <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Buscar" />
          <button className="btn btn-secondary my-2 my-sm-0" type="submit">Buscar</button>
        </form>
      </div>

    </div>
  </nav>
  )
}

export default Navar