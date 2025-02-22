import React from 'react'

export const Menu = () => {

    const logOut = () => {

        window.localStorage.removeItem('movie-credential')
        window.location.href="/"

    }

    return (
        <>

            <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/dashboard">Movie App</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav me-auto">

                            <li className="nav-item">
                                <a className="nav-link" href="/cast">Cast</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/movies">Movies</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/earnings">Earnings</a>
                            </li>

                        </ul>

                        <button onClick={logOut} className="btn btn-secondary my-2 my-sm-0" type="button">Log Out</button>

                    </div>
                </div>
            </nav>

        </>
    )
}
