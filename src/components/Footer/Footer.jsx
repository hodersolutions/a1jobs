import React, { Component } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-danger navbar-fixed-bottom">
      <div>
        <footer id="myFooter">
          <div className="footer-copyright">
            <p>© 2019 Copyright www.hoder.in </p>
          </div>
        </footer>
      </div>
    </nav>
    );
  }
}

export default Footer;
