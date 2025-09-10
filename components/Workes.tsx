export default function Works() {
    return (
        <section className="row_am how_it_works" id="how_it_work">
            {/* container start */}
            <div className="container">
                <div className="how_it_inner">
                    <div
                        className="section_title"
                        data-aos="fade-up"
                        data-aos-duration={1500}
                        data-aos-delay={300}
                    >
                        {/* h2 */}
                        <h2>
                            <span>How it works</span> - 3 easy steps
                        </h2>
                        {/* p */}
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typese tting{" "}
                            <br /> indus orem Ipsum has beenthe standard dummy.
                        </p>
                    </div>
                    <div className="step_block">
                        {/* UL */}
                        <ul>
                            {/* step */}
                            <li>
                                <div
                                    className="step_text"
                                    data-aos="fade-right"
                                    data-aos-duration={1500}
                                >
                                    <h4>Download app</h4>
                                    <div className="app_icon">
                                        <a href="#">
                                            <i className="icofont-brand-android-robot" />
                                        </a>
                                        <a href="#">
                                            <i className="icofont-brand-apple" />
                                        </a>
                                        <a href="#">
                                            <i className="icofont-brand-windows" />
                                        </a>
                                    </div>
                                    <p>Download App either for Windows, Mac or Android</p>
                                </div>
                                <div className="step_number">
                                    <h3>01</h3>
                                </div>
                                <div
                                    className="step_img"
                                    data-aos="fade-left"
                                    data-aos-duration={1500}
                                >
                                    <img src="images/download_app.jpg" alt="image" />
                                </div>
                            </li>
                            {/* step */}
                            <li>
                                <div
                                    className="step_text"
                                    data-aos="fade-left"
                                    data-aos-duration={1500}
                                >
                                    <h4>Create account</h4>
                                    <span>14 days free trial</span>
                                    <p>Sign up free for App account. One account for all devices.</p>
                                </div>
                                <div className="step_number">
                                    <h3>02</h3>
                                </div>
                                <div
                                    className="step_img"
                                    data-aos="fade-right"
                                    data-aos-duration={1500}
                                >
                                    <img src="images/create_account.jpg" alt="image" />
                                </div>
                            </li>
                            {/* step */}
                            <li>
                                <div
                                    className="step_text"
                                    data-aos="fade-right"
                                    data-aos-duration={1500}
                                >
                                    <h4>It’s done, enjoy the app</h4>
                                    <span>
                Have any questions check our <a href="#">FAQs</a>
              </span>
                                    <p>Get most amazing app experience,Explore and share the app</p>
                                </div>
                                <div className="step_number">
                                    <h3>03</h3>
                                </div>
                                <div
                                    className="step_img"
                                    data-aos="fade-left"
                                    data-aos-duration={1500}
                                >
                                    <img src="images/enjoy_app.jpg" alt="image" />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* video section start */}
                <div className="yt_video" data-aos="fade-in" data-aos-duration={1500}>
                    {/* animation line */}
                    <div className="anim_line dark_bg">
        <span>
          <img src="images/anim_line.png" alt="anim_line" />
        </span>
                        <span>
          <img src="images/anim_line.png" alt="anim_line" />
        </span>
                        <span>
          <img src="images/anim_line.png" alt="anim_line" />
        </span>
                        <span>
          <img src="images/anim_line.png" alt="anim_line" />
        </span>
                        <span>
          <img src="images/anim_line.png" alt="anim_line" />
        </span>
                        <span>
          <img src="images/anim_line.png" alt="anim_line" />
        </span>
                        <span>
          <img src="images/anim_line.png" alt="anim_line" />
        </span>
                        <span>
          <img src="images/anim_line.png" alt="anim_line" />
        </span>
                        <span>
          <img src="images/anim_line.png" alt="anim_line" />
        </span>
                    </div>
                    <div className="thumbnil">
                        <img src="images/yt_thumb.png" alt="image" />
                        <a
                            className="popup-youtube play-button"
                            data-url="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1"
                            data-toggle="modal"
                            data-target="#myModal"
                            title="XJj2PbenIsU"
                        >
          <span className="play_btn">
            <img src="images/play_icon.png" alt="image" />
            <div className="waves-block">
              <div className="waves wave-1" />
              <div className="waves wave-2" />
              <div className="waves wave-3" />
            </div>
          </span>{" "}
                            Let’s see virtually how it works
                            <span>Watch video</span>
                        </a>
                    </div>
                </div>
                {/* video section end */}
            </div>
            {/* container end */}
        </section>

    )
}