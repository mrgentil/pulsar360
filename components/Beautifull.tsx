export default function Beautifull() {
    return (
        <>
            {/* Beautifull-interface-Section start */}
            <section className="row_am interface_section">
                {/* container start */}
                <div className="container-fluid">
                    <div
                        className="section_title"
                        data-aos="fade-up"
                        data-aos-duration={1500}
                        data-aos-delay={300}
                    >
                        {/* h2 */}
                        <h2>
                            Beautifull <span>interface</span>
                        </h2>
                        {/* p */}
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typese tting{" "}
                            <br /> indus orem Ipsum has beenthe standard dummy.
                        </p>
                    </div>
                    {/* screen slider start */}
                    <div className="screen_slider">
                        <div id="screen_slider" className="owl-carousel owl-theme">
                            <div className="item">
                                <div className="screen_frame_img">
                                    <img src="images/screen-1.png" alt="image" />
                                </div>
                            </div>
                            <div className="item">
                                <div className="screen_frame_img">
                                    <img src="images/screen-2.png" alt="image" />
                                </div>
                            </div>
                            <div className="item">
                                <div className="screen_frame_img">
                                    <img src="images/screen-3.png" alt="image" />
                                </div>
                            </div>
                            <div className="item">
                                <div className="screen_frame_img">
                                    <img src="images/screen-4.png" alt="image" />
                                </div>
                            </div>
                            <div className="item">
                                <div className="screen_frame_img">
                                    <img src="images/screen-5.png" alt="image" />
                                </div>
                            </div>
                            <div className="item">
                                <div className="screen_frame_img">
                                    <img src="images/screen-3.png" alt="image" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* screen slider end */}
                </div>
                {/* container end */}
            </section>
            {/* Beautifull-interface-Section end */}
        </>

    )
}