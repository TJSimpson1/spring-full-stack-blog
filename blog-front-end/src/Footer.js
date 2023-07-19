const Footer = () => (
    <footer className="footer">
        <div className="footer-content">
            <div className="footer-column">
                <h4>About Us</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="footer-column">
                <h4>Contact</h4>
                <p>Email: info@example.com</p>
                <p>Phone: 123-456-7890</p>
            </div>
            <div className="footer-column">
                <h4>Follow Us</h4>
                <div className="social-media">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
        <div className="footer-bottom">
            <p>&copy; 2023 Your Website. All rights reserved.</p>
        </div>
    </footer>
) 

export default Footer;