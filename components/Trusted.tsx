export default function Trusted() {
    return (
        <>
            {/* Trusted Section start */}
            <section className="row_am trusted_section">
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
                            Trusted by <span>150+</span> companies
                        </h2>
                        {/* p */}
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typese tting{" "}
                            <br /> indus orem Ipsum has beenthe standard dummy.
                        </p>
                    </div>
                    {/* logos slider start */}
                    <div className="company_logos">
                        <div id="company_slider" className="owl-carousel owl-theme">
                            <div className="item">
                                <div className="logo">
                                    <img src="/images/paypal.png" alt="image" />
                                </div>
                            </div>
                            <div className="item">
                                <div className="logo">
                                    <img src="/images/spoty.png" alt="image" />
                                </div>
                            </div>
                            <div className="item">
                                <div className="logo">
                                    <img src="/images/shopboat.png" alt="image" />
                                </div>
                            </div>
                            <div className="item">
                                <div className="logo">
                                    <img src="/images/slack.png" alt="image" />
                                </div>
                            </div>
                            <div className="item">
                                <div className="logo">
                                    <img src="/images/envato.png" alt="image" />
                                </div>
                            </div>
                            <div className="item">
                                <div className="logo">
                                    <img src="/images/paypal.png" alt="image" />
                                </div>
                            </div>
                            <div className="item">
                                <div className="logo">
                                    <img src="/images/spoty.png" alt="image" />
                                </div>
                            </div>
                            <div className="item">
                                <div className="logo">
                                    <img src="/images/shopboat.png" alt="image" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* logos slider end */}
                </div>
                {/* container end */}
            </section>
            {/* Trusted Section ends */}
        </>

    )
}