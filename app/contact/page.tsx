import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsLetter from "@/components/NewsLetter";
import Link from 'next/link'

export default function Contact() {
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
                          <h1>Contact us</h1>
                          <p>
                              If you have an query, please get in touch with us, we will revert back
                              quickly.
                          </p>
                          <ul>
                              <li>
                                  <a href="index.html">Home</a>
                              </li>
                              <li>
                                  <span>»</span>
                              </li>
                              <li>
                                  <a href="contact.html">Contact us</a>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
              {/* Contact Us Section Start */}
              <section className="contact_page_section">
                  <div className="container">
                      <div className="contact_inner">
                          <div className="contact_form">
                              <div className="section_title">
                                  <h2>
                                      Leave a <span>message</span>
                                  </h2>
                                  <p>Fill up form below, our team will get back soon</p>
                              </div>
                              <form action="#">
                                  <div className="form-group">
                                      <input type="text" placeholder="Name" className="form-control" />
                                  </div>
                                  <div className="form-group">
                                      <input
                                          type="email"
                                          placeholder="Email"
                                          className="form-control"
                                      />
                                  </div>
                                  <div className="form-group">
                                      <input
                                          type="text"
                                          placeholder="Company Name"
                                          className="form-control"
                                      />
                                  </div>
                                  <div className="form-group">
                                      <select className="form-control">
                                          <option value="">Country</option>
                                      </select>
                                  </div>
                                  <div className="form-group">
                                      <input type="text" placeholder="Phone" className="form-control" />
                                  </div>
                                  <div className="form-group">
                                      <input
                                          type="text"
                                          placeholder="Website"
                                          className="form-control"
                                      />
                                  </div>
                                  <div className="form-group">
              <textarea
                  className="form-control"
                  placeholder="Your message"
                  defaultValue={""}
              />
                                  </div>
                                  <div className="form-group term_check">
                                      <input type="checkbox" id="term" />
                                      <label htmlFor="term">
                                          I agree to receive emails, newsletters and promotional messages
                                      </label>
                                  </div>
                                  <div className="form-group mb-0">
                                      <button type="submit" className="btn puprple_btn">
                                          SEND MESSAGE
                                      </button>
                                  </div>
                              </form>
                          </div>
                          <div className="contact_info">
                              <div className="icon">
                                  <img src="images/contact_message_icon.png" alt="image" />
                              </div>
                              <div className="section_title">
                                  <h2>
                                      Have any <span>question?</span>
                                  </h2>
                                  <p>
                                      If you have any question about our product, service, payment or
                                      company, Visit our <a href="faq.html">FAQs page.</a>
                                  </p>
                              </div>
                              <a href="faq.html" className="btn puprple_btn">
                                  READ FAQ
                              </a>
                              <ul className="contact_info_list">
                                  <li>
                                      <div className="img">
                                          <img src="images/mail_icon.png" alt="image" />
                                      </div>
                                      <div className="text">
                                          <span>Email Us</span>
                                          <a href="mailto:example@gmail.com">example@gmail.com</a>
                                      </div>
                                  </li>
                                  <li>
                                      <div className="img">
                                          <img src="images/call_icon.png" alt="image" />
                                      </div>
                                      <div className="text">
                                          <span>Call Us</span>
                                          <a href="tel:+1(888)553-46-11">+1 (888) 553-46-11</a>
                                      </div>
                                  </li>
                                  <li>
                                      <div className="img">
                                          <img src="images/location_icon.png" alt="image" />
                                      </div>
                                      <div className="text">
                                          <span>Visit Us</span>
                                          <p>5687, Business Avenue, New York, USA 5687</p>
                                      </div>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </section>
              {/* Contact Us Section End */}
              {/* Map Section Start */}
              <section className="row_am map_section">
                  <div className="container">
                      <div className="map_inner">
                          <iframe
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2799160891!2d-74.25987584510595!3d40.69767006338158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1664399300741!5m2!1sen!2sin"
                              width="100%"
                              height={510}
                              style={{ border: 0 }}
                              allowFullScreen=""
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                          />
                      </div>
                  </div>
              </section>
              {/* Map Section End */}


          <NewsLetter/>
          <Footer/>
      </>
  )
}
