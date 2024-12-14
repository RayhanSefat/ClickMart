import React, { Component } from "react";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="img/ClickMart logo.png"
              alt="Bootstrap"
              width={30}
              height={24}
            />
            ClickMart
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="#">
                Products
              </a>
              <a className="nav-link" href="#">
                My Cart
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
