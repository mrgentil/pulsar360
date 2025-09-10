export default function Features() {
    return (
        <>
            {/* Features-Section-Start */}
            <section className="row_am features_section" id="features">
                {/* container start */}
                <div className="container">
                    <div
                        className="section_title"
                        data-aos="fade-up"
                        data-aos-duration={1500}
                        data-aos-delay={100}
                    >
                        {/* h2 */}
                        <h2>
                            <span>Features</span> that makes app different!
                        </h2>
                        {/* p */}
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typese tting{" "}
                            <br /> indus orem Ipsum has beenthe standard dummy.
                        </p>
                    </div>
                    <div className="feature_detail">
                        {/* feature box left */}
                        <div className="left_data feature_box">
                            {/* feature box */}
                            <div
                                className="data_block"
                                data-aos="fade-right"
                                data-aos-duration={1500}
                            >
                                <div className="icon">
                                    <img src="images/secure_data.png" alt="image" />
                                </div>
                                <div className="text">
                                    <h4>Secure data</h4>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and type
                                        setting indus ideas.
                                    </p>
                                </div>
                            </div>
                            {/* feature box */}
                            <div
                                className="data_block"
                                data-aos="fade-right"
                                data-aos-duration={1500}
                            >
                                <div className="icon">
                                    <img src="images/functional.png" alt="image" />
                                </div>
                                <div className="text">
                                    <h4>Fully functional</h4>
                                    <p>
                                        Simply dummy text of the printing and typesetting indus lorem
                                        Ipsum is dummy.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* feature box right */}
                        <div className="right_data feature_box">
                            {/* feature box */}
                            <div
                                className="data_block"
                                data-aos="fade-left"
                                data-aos-duration={1500}
                            >
                                <div className="icon">
                                    <img src="images/live-chat.png" alt="image" />
                                </div>
                                <div className="text">
                                    <h4>Live chat</h4>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and type
                                        setting indus ideas.
                                    </p>
                                </div>
                            </div>
                            {/* feature box */}
                            <div
                                className="data_block"
                                data-aos="fade-left"
                                data-aos-duration={1500}
                            >
                                <div className="icon">
                                    <img src="images/support.png" alt="image" />
                                </div>
                                <div className="text">
                                    <h4>24-7 Support</h4>
                                    <p>
                                        Simply dummy text of the printing and typesetting indus lorem
                                        Ipsum is dummy.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* feature image */}
                        <div
                            className="feature_img"
                            data-aos="fade-up"
                            data-aos-duration={1500}
                            data-aos-delay={100}
                        >
                            <img src="images/features_frame.png" alt="image" />
                        </div>
                    </div>
                </div>
                {/* container end */}
            </section>
            {/* Features-Section-end */}
        </>

    )
}