export default function Banner() {
    return (
        <>
            {/* Banner-Section-Start */}
            <section className="banner_section">
                {/* container start */}
                <div className="container">
                    {/* vertical animation line */}
                    <div className="anim_line">
        <span>
          <img src="/images/anim_line.png" alt="anim_line" />
        </span>
                        <span>
          <img src="/images/anim_line.png" alt="anim_line" />
        </span>
                        <span>
          <img src="/images/anim_line.png" alt="anim_line" />
        </span>
                        <span>
          <img src="/images/anim_line.png" alt="anim_line" />
        </span>
                        <span>
          <img src="/images/anim_line.png" alt="anim_line" />
        </span>
                        <span>
          <img src="/images/anim_line.png" alt="anim_line" />
        </span>
                        <span>
          <img src="/images/anim_line.png" alt="anim_line" />
        </span>
                        <span>
          <img src="/images/anim_line.png" alt="anim_line" />
        </span>
                        <span>
          <img src="/images/anim_line.png" alt="anim_line" />
        </span>
                    </div>
                    {/* row start */}
                    <div className="row">
                        <div
                            className="col-lg-6 col-md-12"
                            data-aos="fade-right"
                            data-aos-duration={1500}
                        >
                            {/* banner text */}
                            <div className="banner_text">
                                {/* h1 */}
                                <h1>
                                    Best way to <span>manage your customers.</span>
                                </h1>
                                {/* p */}
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and setting indus
                                    orem Ipsum has been the industrys.
                                </p>
                            </div>
                            {/* app buttons */}
                            <ul className="app_btn">
                                <li>
                                    <a href="#">
                                        <img
                                            className="blue_img"
                                            src="/images/appstore_blue.png"
                                            alt="image"
                                        />
                                        <img
                                            className="white_img"
                                            src="/images/appstore_white.png"
                                            alt="image"
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <img
                                            className="blue_img"
                                            src="/images/googleplay_blue.png"
                                            alt="image"
                                        />
                                        <img
                                            className="white_img"
                                            src="/images/googleplay_white.png"
                                            alt="image"
                                        />
                                    </a>
                                </li>
                            </ul>
                            {/* users */}
                            <div className="used_app">
                                <ul>
                                    <li>
                                        <img src="/images/used01.png" alt="image" />
                                    </li>
                                    <li>
                                        <img src="/images/used02.png" alt="image" />
                                    </li>
                                    <li>
                                        <img src="/images/used03.png" alt="image" />
                                    </li>
                                    <li>
                                        <img src="/images/used04.png" alt="image" />
                                    </li>
                                </ul>
                                <p>
                                    12M + <br /> used this app
                                </p>
                            </div>
                        </div>
                        {/* banner slides start */}
                        <div
                            className="col-lg-6 col-md-12"
                            data-aos="fade-in"
                            data-aos-duration={1500}
                        >
                            <div className="banner_slider">
                                <div className="left_icon">
                                    <img src="/images/message_icon.png" alt="image" />
                                </div>
                                <div className="right_icon">
                                    <img src="/images/shield_icon.png" alt="image" />
                                </div>
                                <div id="frmae_slider" className="owl-carousel owl-theme">
                                    <div className="item">
                                        <div className="slider_img">
                                            <img src="/images/screen.png" alt="image" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="slider_img">
                                            <img src="/images/screen.png" alt="image" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="slider_img">
                                            <img src="/images/screen.png" alt="image" />
                                        </div>
                                    </div>
                                </div>
                                <div className="slider_frame">
                                    <img src="/images/mobile_frame_svg.svg" alt="image" />
                                </div>
                            </div>
                        </div>
                        {/* banner slides end */}
                    </div>
                    {/* row end */}
                </div>
                {/* container end */}
            </section>
            {/* Banner-Section-end */}
        </>

    )
}