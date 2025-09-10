import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Trusted from '@/components/Trusted';
import NewsLetter from "@/components/NewsLetter";
import Link from 'next/link'

export default function About() {
  return (
      <>
   <Header/>


              {/* BredCrumb-Section */}
              <div className="bred_crumb">
                  <div className="container">
                      {/* shape animation  */}
                      <span className="banner_shape1">
        {" "}
                          <img src="images/banner-shape1.png" alt="image" />{" "}
      </span>
                      <span className="banner_shape2">
        {" "}
                          <img src="images/banner-shape2.png" alt="image" />{" "}
      </span>
                      <span className="banner_shape3">
        {" "}
                          <img src="images/banner-shape3.png" alt="image" />{" "}
      </span>
                      <div className="bred_text">
                          <h1>About us</h1>
                          <ul>
                              <li>
                                  <a href="index.html">Home</a>
                              </li>
                              <li>
                                  <span>»</span>
                              </li>
                              <li>
                                  <a href="about.html">About us</a>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
              {/* App-Solution-Section-Start */}
              <section className="row_am app_solution_section">
                  {/* container start */}
                  <div className="container">
                      {/* row start */}
                      <div className="row">
                          <div className="col-lg-6">
                              {/* UI content */}
                              <div className="app_text">
                                  <div
                                      className="section_title"
                                      data-aos="fade-up"
                                      data-aos-duration={1500}
                                      data-aos-delay={100}
                                  >
                                      <h2>
                                          <span>Providing innovative app solution</span> to make customer
                                          life easy to grow.
                                      </h2>
                                  </div>
                                  <p data-aos="fade-up" data-aos-duration={1500}>
                                      Lorem Ipsum is simply dummy text of the printing and type setting
                                      industry lorem Ipsum has been the industrys standard dummy text
                                      ever since the when an unknown printer took a galley of type and
                                      scrambled it to make a type specimen book. It has survived not
                                      only five centuries, but also the leap into electronic
                                      typesetting, remaining to make a type speci men book. It has
                                      survived essentially unchanged.
                                  </p>
                                  <p data-aos="fade-up" data-aos-duration={1500}>
                                      Standard dummy text ever since the when an unknown printer took a
                                      galley of type and scrambled it to make a type specien book. It
                                      has survived not only five centuries, but also the leap into
                                      electronic typesetting.
                                  </p>
                              </div>
                          </div>
                          <div className="col-lg-6">
                              <div
                                  className="app_images"
                                  data-aos="fade-in"
                                  data-aos-duration={1500}
                              >
                                  <ul>
                                      <li>
                                          <img src="images/abt_01.png" alt="" />
                                      </li>
                                      <li>
                                          <a
                                              className="popup-youtube play-button"
                                              data-url="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1"
                                              data-toggle="modal"
                                              data-target="#myModal"
                                              title="About Video"
                                          >
                                              <img src="images/abt_02.png" alt="" />
                                              <div className="waves-block">
                                                  <div className="waves wave-1" />
                                                  <div className="waves wave-2" />
                                                  <div className="waves wave-3" />
                                              </div>
                                              <span className="play_icon">
                    <img src="images/play_black.png" alt="image" />
                  </span>
                                          </a>
                                      </li>
                                      <li>
                                          <img src="images/abt_03.png" alt="" />
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                      {/* row end */}
                  </div>
                  {/* container end */}
              </section>
              {/* App-Solution-Section-end */}
              {/* Why we are section Start */}
              <section className="row_am why_we_section" data-aos="fade-in">
                  <div className="why_inner">
                      <div className="container">
                          <div
                              className="section_title"
                              data-aos="fade-up"
                              data-aos-duration={1500}
                              data-aos-delay={100}
                          >
                              <h2>
                                  <span>Why we are different</span> from others!
                              </h2>
                              <p>
                                  Lorem Ipsum is simply dummy text of the printing and typese tting{" "}
                                  <br /> indus orem Ipsum has beenthe standard dummy.
                              </p>
                          </div>
                          <div className="row">
                              <div className="col-md-6 col-lg-3">
                                  <div
                                      className="why_box"
                                      data-aos="fade-up"
                                      data-aos-duration={1500}
                                      data-aos-delay={100}
                                  >
                                      <div className="icon">
                                          <img src="images/secure.png" alt="image" />
                                      </div>
                                      <div className="text">
                                          <h3>Secure code</h3>
                                          <p>
                                              Lorem Ipsum is simply dummy text of the printing and type
                                              setting indus ideas.
                                          </p>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-md-6 col-lg-3">
                                  <div
                                      className="why_box"
                                      data-aos="fade-up"
                                      data-aos-duration={1500}
                                      data-aos-delay={200}
                                  >
                                      <div className="icon">
                                          <img src="images/abt_functional.png" alt="image" />
                                      </div>
                                      <div className="text">
                                          <h3>Fully functional</h3>
                                          <p>
                                              Simply dummy text of the printing and typesetting indus lorem
                                              Ipsum is dummy.
                                          </p>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-md-6 col-lg-3">
                                  <div
                                      className="why_box"
                                      data-aos="fade-up"
                                      data-aos-duration={1500}
                                      data-aos-delay={300}
                                  >
                                      <div className="icon">
                                          <img src="images/communication.png" alt="image" />
                                      </div>
                                      <div className="text">
                                          <h3>Best communication</h3>
                                          <p>
                                              Lorem Ipsum is simply dummy text of the printing and type
                                              setting indus ideas.
                                          </p>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-md-6 col-lg-3">
                                  <div
                                      className="why_box"
                                      data-aos="fade-up"
                                      data-aos-duration={1500}
                                      data-aos-delay={400}
                                  >
                                      <div className="icon">
                                          <img src="images/abt_support.png" alt="image" />
                                      </div>
                                      <div className="text">
                                          <h3>24-7 Support</h3>
                                          <p>
                                              Simply dummy text of the printing and typesetting indus lorem
                                              Ipsum is dummy.
                                          </p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>
              {/* About-App-Section-Start */}
              <section className="row_am about_app_section about_page_sectino">
                  {/* container start */}
                  <div className="container">
                      {/* row start */}
                      <div className="row">
                          <div className="col-lg-6">
                              {/* about images */}
                              <div className="abt_img" data-aos="fade-in" data-aos-duration={1500}>
                                  <img src="images/about_main.png" alt="image" />
                              </div>
                          </div>
                          <div className="col-lg-6">
                              {/* about text */}
                              <div className="about_text">
                                  <div
                                      className="section_title"
                                      data-aos="fade-up"
                                      data-aos-duration={1500}
                                      data-aos-delay={100}
                                  >
                                      {/* h2 */}
                                      <h2>
                                          {" "}
                                          <span>We focus on quality,</span> never focus on quantity
                                      </h2>
                                      {/* p */}
                                      <p>
                                          Lorem Ipsum is simply dummy text of the printing and typesetting
                                          industry lorem Ipsum has been the industrys standard dummy text
                                          ever since the when an unknown printer took a galley of type
                                          and.
                                      </p>
                                  </div>
                                  {/* UL */}
                                  <ul
                                      className="app_statstic"
                                      id="counter"
                                      data-aos="fade-in"
                                      data-aos-duration={1500}
                                  >
                                      <li>
                                          <div className="icon">
                                              <img src="images/download.png" alt="image" />
                                          </div>
                                          <div className="text">
                                              <p>
                    <span className="counter-value" data-count={17}>
                      0
                    </span>
                                                  <span>M+</span>
                                              </p>
                                              <p>Download</p>
                                          </div>
                                      </li>
                                      <li>
                                          <div className="icon">
                                              <img src="images/followers.png" alt="image" />
                                          </div>
                                          <div className="text">
                                              <p>
                    <span className="counter-value" data-count={" "}>
                      0{" "}
                    </span>
                                                  <span>M+</span>
                                              </p>
                                              <p>Followers</p>
                                          </div>
                                      </li>
                                      <li>
                                          <div className="icon">
                                              <img src="images/reviews.png" alt="image" />
                                          </div>
                                          <div className="text">
                                              <p>
                    <span className="counter-value" data-count={2300}>
                      1500
                    </span>
                                                  <span>+</span>
                                              </p>
                                              <p>Reviews</p>
                                          </div>
                                      </li>
                                      <li>
                                          <div className="icon">
                                              <img src="images/countries.png" alt="image" />
                                          </div>
                                          <div className="text">
                                              <p>
                    <span className="counter-value" data-count={150}>
                      0
                    </span>
                                                  <span>+</span>
                                              </p>
                                              <p>Countries</p>
                                          </div>
                                      </li>
                                  </ul>
                                  {/* UL end */}
                              </div>
                          </div>
                      </div>
                      {/* row end */}
                  </div>
                  {/* container end */}
              </section>
              {/* About-App-Section-end */}
              {/*Experts Team Section Start  */}
              <section className="row_am experts_team_section">
                  <div className="container">
                      <div
                          className="section_title"
                          data-aos="fade-up"
                          data-aos-duration={1500}
                          data-aos-delay={100}
                      >
                          {/* h2 */}
                          <h2>
                              {" "}
                              Meet our <span> experts </span>
                          </h2>
                          {/* p */}
                          <p>
                              Lorem Ipsum is simply dummy text of the printing and typese tting{" "}
                              <br /> indus orem Ipsum has beenthe standard dummy.
                          </p>
                      </div>
                      <div className="row">
                          <div
                              className="col-md-6 col-lg-3"
                              data-aos="fade-up"
                              data-aos-duration={1500}
                              data-aos-delay={100}
                          >
                              <div className="experts_box">
                                  <img src="images/experts_01.png" alt="image" />
                                  <div className="text">
                                      <h3>Steav Joe</h3>
                                      <span>CEO &amp; Co-Founder</span>
                                      <ul className="social_media">
                                          <li>
                                              <a href="#">
                                                  <i className="icofont-facebook" />
                                              </a>
                                          </li>
                                          <li>
                                              <a href="#">
                                                  <i className="icofont-twitter" />
                                              </a>
                                          </li>
                                          <li>
                                              <a href="#">
                                                  <i className="icofont-instagram" />
                                              </a>
                                          </li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                          <div
                              className="col-md-6 col-lg-3"
                              data-aos="fade-up"
                              data-aos-duration={1500}
                              data-aos-delay={200}
                          >
                              <div className="experts_box">
                                  <img src="images/experts_02.png" alt="image" />
                                  <div className="text">
                                      <h3>Mark Dele</h3>
                                      <span>Co-Founder</span>
                                      <ul className="social_media">
                                          <li>
                                              <a href="#">
                                                  <i className="icofont-facebook" />
                                              </a>
                                          </li>
                                          <li>
                                              <a href="#">
                                                  <i className="icofont-twitter" />
                                              </a>
                                          </li>
                                          <li>
                                              <a href="#">
                                                  <i className="icofont-instagram" />
                                              </a>
                                          </li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                          <div
                              className="col-md-6 col-lg-3"
                              data-aos="fade-up"
                              data-aos-duration={1500}
                              data-aos-delay={300}
                          >
                              <div className="experts_box">
                                  <img src="images/experts_03.png" alt="image" />
                                  <div className="text">
                                      <h3>Jolley Sihe</h3>
                                      <span>Business Developer</span>
                                      <ul className="social_media">
                                          <li>
                                              <a href="#">
                                                  <i className="icofont-facebook" />
                                              </a>
                                          </li>
                                          <li>
                                              <a href="#">
                                                  <i className="icofont-twitter" />
                                              </a>
                                          </li>
                                          <li>
                                              <a href="#">
                                                  <i className="icofont-instagram" />
                                              </a>
                                          </li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                          <div
                              className="col-md-6 col-lg-3"
                              data-aos="fade-up"
                              data-aos-duration={1500}
                              data-aos-delay={400}
                          >
                              <div className="experts_box">
                                  <img src="images/experts_04.png" alt="image" />
                                  <div className="text">
                                      <h3>Rimy Nail</h3>
                                      <span>Marketing &amp; Sales</span>
                                      <ul className="social_media">
                                          <li>
                                              <a href="#">
                                                  <i className="icofont-facebook" />
                                              </a>
                                          </li>
                                          <li>
                                              <a href="#">
                                                  <i className="icofont-twitter" />
                                              </a>
                                          </li>
                                          <li>
                                              <a href="#">
                                                  <i className="icofont-instagram" />
                                              </a>
                                          </li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>
              {/* Query Section Start */}
              <section className="row_am query_section">
                  <div className="query_inner" data-aos="fade-in" data-aos-duration={1500}>
                      <div className="container">
                          {/* shape animation  */}
                          <span className="banner_shape1">
          {" "}
                              <img src="images/banner-shape1.png" alt="image" />{" "}
        </span>
                          <span className="banner_shape2">
          {" "}
                              <img src="images/banner-shape2.png" alt="image" />{" "}
        </span>
                          <span className="banner_shape3">
          {" "}
                              <img src="images/banner-shape3.png" alt="image" />{" "}
        </span>
                          <div className="section_title">
                              <h2>Have any query about ?</h2>
                              <p>
                                  Lorem Ipsum is simply dummy text of the printing and typese tting{" "}
                                  <br /> indus orem Ipsum has beenthe standard dummy.
                              </p>
                          </div>
                          <a href="contact.html" className="btn white_btn">
                              CONTACT US NOW
                          </a>
                      </div>
                  </div>
              </section>


          <Trusted/>
          <NewsLetter/>
    <Footer/>
    </>
  )
}
