export default function AboutApp() {
    return (
        <>
            {/* About-App-Section-Start */}
            <section className="row_am about_app_section">
                {/* container start */}
                <div className="container">
                    {/* row start */}
                    <div className="row">
                        <div className="col-lg-6">
                            {/* about images */}
                            <div
                                className="about_img"
                                data-aos="fade-in"
                                data-aos-duration={1500}
                            >
                                <div className="frame_img">
                                    <img
                                        className="moving_position_animatin"
                                        src="images/about-frame.png"
                                        alt="image"
                                    />
                                </div>
                                <div className="screen_img">
                                    <img
                                        className="moving_animation"
                                        src="images/about-screen.png"
                                        alt="image"
                                    />
                                </div>
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
                                        Some awesome words <span>about app.</span>
                                    </h2>
                                    {/* p */}
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting
                                        industry lorem Ipsum has been the industrys standard dummy text
                                        ever since the when an unknown printer took a galley of type
                                        and. Lorem ipsum dolor sit amet.
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
                                <a
                                    href="contact.html"
                                    className="btn puprple_btn"
                                    data-aos="fade-in"
                                    data-aos-duration={1500}
                                >
                                    START FREE TRIAL
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* row end */}
                </div>
                {/* container end */}
            </section>
            {/* About-App-Section-end */}

            <section className="row_am modern_ui_section">
                {/* container start */}
                <div className="container">
                    {/* row start */}
                    <div className="row">
                        <div className="col-lg-6">
                            {/* UI content */}
                            <div className="ui_text">
                                <div
                                    className="section_title"
                                    data-aos="fade-up"
                                    data-aos-duration={1500}
                                    data-aos-delay={100}
                                >
                                    <h2>
                                        Beautiful design with <span>modern UI</span>
                                    </h2>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting
                                        industry lorem Ipsum has been the industrys standard dummy text
                                        ever since the when an unknown printer took a galley of type and.
                                    </p>
                                </div>
                                <ul className="design_block">
                                    <li data-aos="fade-up" data-aos-duration={1500}>
                                        <h4>Carefully designed</h4>
                                        <p>
                                            Lorem Ipsum is simply dummy text of the printing and type
                                            esetting industry lorem Ipsum has.
                                        </p>
                                    </li>
                                    <li data-aos="fade-up" data-aos-duration={1500}>
                                        <h4>Seamless Sync</h4>
                                        <p>
                                            Simply dummy text of the printing and typesetting inustry lorem
                                            Ipsum has Lorem dollar summit.
                                        </p>
                                    </li>
                                    <li data-aos="fade-up" data-aos-duration={1500}>
                                        <h4>Access Drive</h4>
                                        <p>
                                            Printing and typesetting industry lorem Ipsum has been the
                                            industrys standard dummy text of type setting.
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            {/* UI Image */}
                            <div className="ui_images" data-aos="fade-in" data-aos-duration={1500}>
                                <div className="left_img">
                                    <img
                                        className="moving_position_animatin"
                                        src="images/modern01.png"
                                        alt="image"
                                    />
                                </div>
                                {/* UI Image */}
                                <div className="right_img">
                                    <img
                                        className="moving_position_animatin"
                                        src="images/secure_data.png"
                                        alt="image"
                                    />
                                    <img
                                        className="moving_position_animatin"
                                        src="images/modern02.png"
                                        alt="image"
                                    />
                                    <img
                                        className="moving_position_animatin"
                                        src="images/modern03.png"
                                        alt="image"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* row end */}
                </div>
                {/* container end */}
            </section>

        </>

    )
}