import './HomeAbout.scss';

const HomeAbout = () => {
  return (
    <section className="best-fashion container">
      <div className="best-fashion__l">
        <div className="dot-texture"></div>
        <div className="dot-texture"></div>
        <img
          src="https://images.unsplash.com/photo-1589992896544-8389e29a1c40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGxvbmclMjBzbGVldmUlMjBzaGlydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
      </div>
      <div className="best-fashion__r">
        <h1 className="best-fashion__heading">best fashion since 2022</h1>
        <p className="best-fashion__description">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae
          eligendi temporibus modi vel dolorum eaque, facilis inventore? Laborum
          obcaecati vel delectus ipsam nisi aliquid, pariatur earum aspernatur
          iusto cum qui!
        </p>
      </div>
      <div className="best-fashion__monitoring">
        <div className="best-fashion__data">
          <h2>2022</h2>
          <span>SFashion Founded</span>
        </div>
        <div className="best-fashion__data">
          <h2>8900+</h2>
          <span>Product Sold</span>
        </div>
        <div className="best-fashion__data">
          <h2>3105+</h2>
          <span>Best review</span>
        </div>
      </div>
    </section>
  );
};
export default HomeAbout;
