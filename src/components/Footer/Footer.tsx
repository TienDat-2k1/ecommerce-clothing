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
            <h2>Liên hệ với chúng tôi</h2>
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
          <h2>Giới thiệu</h2>
          <p className="footer__about">Những điều khoản khác</p>
          <p className="footer__about">Đối tác</p>
          <p className="footer__about">Giải đáp</p>
          <p className="footer__about">Chính sách vận chuyển</p>
        </div>
        <div className="footer__item">
          <h2>Chính sách</h2>
          <span className="footer__policy">Chính sách bảo mật</span>
          <span className="footer__policy">Điều khoản dịch vụ</span>
          <span className="footer__policy">Chính sách thành viên</span>
          <span className="footer__policy">Chính sách đổi trả</span>
          <span className="footer__policy">Chính sách bảo mật thanh toán</span>
          <span className="footer__policy">Chính sách dành cho khách hàng</span>
          <span className="footer__policy">Chính sách bảo hành</span>
        </div>
        <div className="footer__item">
          <div className="footer__payment">
            <h2>Phương thức thanh toán</h2>
            <div>
              <Button
                className="btn--outline-white footer__icon"
                leftIcon={<BsCashCoin className="footer__icon" />}
              >
                Tiền mặt
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
                Ngân hàng
              </Button>
            </div>
          </div>
          <div className="footer__shipping">
            <h2>Đối tác vận chuyển</h2>
            <Button
              className="btn--outline-white footer__icon"
              leftIcon={<FaShippingFast className="footer__icon" />}
            />
          </div>
        </div>
        <div className="footer__item">
          <h2>Đăng kí ngay</h2>
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
