import React from "react";

export default function navbar() {
  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/sign-in"; 
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
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
              <a className="nav-link" href="/my-cart">
                My Cart
              </a>
              <a className="nav-link" href="/my-products">
                My Products
              </a>
            </div>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
