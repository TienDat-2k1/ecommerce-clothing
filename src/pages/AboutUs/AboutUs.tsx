import './AboutUs.scss';

import aboutus from '../../assets/img/background.png';
import HomeAbout from '../../components/HomeComponents/HomeAbout/HomeAbout';

const AboutUs = () => {
  return (
    <div className="about-us container">
      <article className="about-us__content">
        <img src={aboutus} alt="" />
        <div className="about-us__features">
          <div className="about-us__feature">
            <h4>Who we are?</h4>
            <p>
              Contextual advertising programs sometimes have strict policies
              that need to be adhered too. Let’s take Google as an example.
            </p>
          </div>
          <div className="about-us__feature">
            <h4>Who we do?</h4>
            <p>
              In this digital generation where information can be easily
              obtained within seconds, business cards still have retained their
              importance.
            </p>
          </div>
          <div className="about-us__feature">
            <h4>Who choose us?</h4>
            <p>
              A two or three storey house is the ideal way to maximise the piece
              of earth on which our home sits, but for older or infirm people.
            </p>
          </div>
        </div>
      </article>

      <HomeAbout />

      <article className="about-us__content about-us__testimonials">
        <div className="about-us__testimonial">
          <span className="icon_quotations"></span>
          <p>
            “Going out after work? Take your butane curling iron with you to the
            office, heat it up, style your hair before you leave the office and
            you won’t have to make a trip back home.”
          </p>
          <div className="about-us__testimonial-auth">
            <img
              src="https://lh3.googleusercontent.com/ogw/AOh-ky1AQjKplE11WsHjDkVdV_wxr5cjEkJFEKjKOEHt0w=s32-c-mo"
              alt=""
            />
            <div>
              <h5>Tien Dat</h5>
              <p>Fashion Design</p>
            </div>
          </div>
        </div>
        <div className="about-us__testimonial">
          <img
            src="https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fGNsb3RoaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
        </div>
      </article>
      <article className="about-us__content about-us__counts">
        <div className="about-us__count">
          <h2>102</h2>
          <div>
            <span>Our</span>
            <span>Client</span>
          </div>
        </div>
        <div className="about-us__count">
          <h2>30</h2>
          <div>
            <span>Total</span>
            <span>Categories</span>
          </div>
        </div>
        <div className="about-us__count">
          <h2>102</h2>
          <div>
            <span>In</span>
            <span>Country</span>
          </div>
        </div>
        <div className="about-us__count">
          <h2>98%</h2>
          <div>
            <span>Happy</span>
            <span>Customer</span>
          </div>
        </div>
      </article>
    </div>
  );
};
export default AboutUs;
