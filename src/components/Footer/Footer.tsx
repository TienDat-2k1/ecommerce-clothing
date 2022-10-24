import './Footer.scss';
import { FaFacebook, FaCcVisa, FaShippingFast } from 'react-icons/fa';
import { BsInstagram, BsCashCoin } from 'react-icons/bs';
import { RiBankCard2Line } from 'react-icons/ri';
import Button from '../UI/Button/Button';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__list">
        <div className="footer__item">
          <div>
            <h1 className="logo">SFashion</h1>
            <div className="footer__hotline">
              <span>Hotline: </span>
              <span>1900.0012</span>
            </div>
            <span>Email: tonguyentiendat@gmail.com</span>
          </div>

          <div className="footer__contact">
            <h2>Contact with us</h2>
            <Button
              as="a"
              href="https://www.facebook.com/"
              leftIcon={<FaFacebook className="footer__icon" />}
            ></Button>
            <Button
              as="a"
              href="https://www.instagram.com/"
              leftIcon={<BsInstagram className="footer__icon" />}
            ></Button>
          </div>
        </div>
        <div className="footer__item">
          <h2>About us</h2>
          <p className="footer__about">Other provisions</p>
          <p className="footer__about">Co-operate</p>
          <p className="footer__about">Ask and answer</p>
          <p className="footer__about">Obligations of the seller</p>
          <p className="footer__about">Shipping Policy</p>
        </div>
        <div className="footer__item">
          <h2>Policy</h2>
          <span className="footer__policy">Privacy Policy</span>
          <span className="footer__policy">Terms of Service</span>
          <span className="footer__policy">Membership Policy</span>
          <span className="footer__policy">Return policy</span>
          <span className="footer__policy">Payment Privacy Policy</span>
          <span className="footer__policy">Policy for customers</span>
          <span className="footer__policy">Product warranty policy</span>
        </div>
        <div className="footer__item">
          <div className="footer__payment">
            <h2>Payment method</h2>
            <div>
              <Button
                className="btn--outline-white footer__icon"
                leftIcon={<BsCashCoin className="footer__icon" />}
              >
                Cash
              </Button>
              <Button
                className="btn--outline-white footer__icon"
                leftIcon={<FaCcVisa className="footer__icon" />}
              >
                VISA
              </Button>
              <Button
                className="btn--outline-white footer__icon"
                leftIcon={<RiBankCard2Line className="footer__icon" />}
              >
                Internet Banking
              </Button>
            </div>
          </div>
          <div className="footer__shipping">
            <h2>Shipping Partner</h2>
            <Button
              className="btn--outline-white footer__icon"
              leftIcon={<FaShippingFast className="footer__icon" />}
            />
          </div>
        </div>
        <div className="footer__item">
          <h2>Register now</h2>
          <div>
            <input type="text" placeholder="Email" />
            <Button>Register</Button>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
