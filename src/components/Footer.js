import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram, faGithub } from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer__content">
          <div className="footer__section">
            <h4 className="footer__heading">About Us</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="footer__section">
            <h4 className="footer__heading">Contact Us</h4>
            <ul className="footer__list">
              <li>Email: info@realestate.com</li>
              <li>Phone: +1-xxx-xxx-xxxx</li>
              <li>Address: 123 Main St, Anytown USA</li>
            </ul>
          </div>
          <div className="footer__section">
            <h4 className="footer__heading">Quick Links</h4>
            <ul className="footer__list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/properties">Properties</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div className="footer__section">
            <h4 className="footer__heading">Follow Us</h4>
            <div className="footer__social-icons">
              <Link to="#"><FontAwesomeIcon icon={faFacebookF} /></Link>
              <Link to="#"><FontAwesomeIcon icon={faTwitter} /></Link>
              <Link to="#"><FontAwesomeIcon icon={faInstagram} /></Link>
              <Link to="#"><FontAwesomeIcon icon={faGithub} /></Link>
            </div>
            <p>&copy; 2023 Real Estate. All rights reserved.</p>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
