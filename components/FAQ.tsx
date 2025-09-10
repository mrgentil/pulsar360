export default function FAQ() {
    return (
        <>
            {/* FAQ-Section start */}
            <section className="row_am faq_section">
                {/* container start */}
                <div className="container">
                    <div
                        className="section_title"
                        data-aos="fade-up"
                        data-aos-duration={1500}
                        data-aos-delay={300}
                    >
                        {/* h2 */}
                        <h2>
                            <span>FAQ</span> - Frequently Asked Questions
                        </h2>
                        {/* p */}
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typese tting{" "}
                            <br /> indus orem Ipsum has beenthe standard dummy.
                        </p>
                    </div>
                    {/* faq data */}
                    <div className="faq_panel">
                        <div className="accordion" id="accordionExample">
                            <div className="card" data-aos="fade-up" data-aos-duration={1500}>
                                <div className="card-header" id="headingOne">
                                    <h2 className="mb-0">
                                        <button
                                            type="button"
                                            className="btn btn-link active"
                                            data-toggle="collapse"
                                            data-target="#collapseOne"
                                        >
                                            <i className="icon_faq icofont-plus" /> How can i pay ?
                                        </button>
                                    </h2>
                                </div>
                                <div
                                    id="collapseOne"
                                    className="collapse show"
                                    aria-labelledby="headingOne"
                                    data-parent="#accordionExample"
                                >
                                    <div className="card-body">
                                        <p>
                                            Lorem Ipsum is simply dummy text of the printing and
                                            typesetting industry lorem Ipsum has. been the industrys
                                            standard dummy text ever since the when an unknown printer
                                            took a galley of type and scrambled it to make a type specimen
                                            book. It has survived not only five cen turies but also the
                                            leap into electronic typesetting, remaining essentially
                                            unchanged.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="card" data-aos="fade-up" data-aos-duration={1500}>
                                <div className="card-header" id="headingTwo">
                                    <h2 className="mb-0">
                                        <button
                                            type="button"
                                            className="btn btn-link collapsed"
                                            data-toggle="collapse"
                                            data-target="#collapseTwo"
                                        >
                                            <i className="icon_faq icofont-plus" /> How to setup account ?
                                        </button>
                                    </h2>
                                </div>
                                <div
                                    id="collapseTwo"
                                    className="collapse"
                                    aria-labelledby="headingTwo"
                                    data-parent="#accordionExample"
                                >
                                    <div className="card-body">
                                        <p>
                                            Lorem Ipsum is simply dummy text of the printing and
                                            typesetting industry lorem Ipsum has. been the industrys
                                            standard dummy text ever since the when an unknown printer
                                            took a galley of type and scrambled it to make a type specimen
                                            book. It has survived not only five cen turies but also the
                                            leap into electronic typesetting, remaining essentially
                                            unchanged.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="card" data-aos="fade-up" data-aos-duration={1500}>
                                <div className="card-header" id="headingThree">
                                    <h2 className="mb-0">
                                        <button
                                            type="button"
                                            className="btn btn-link collapsed"
                                            data-toggle="collapse"
                                            data-target="#collapseThree"
                                        >
                                            <i className="icon_faq icofont-plus" />
                                            What is process to get refund ?
                                        </button>
                                    </h2>
                                </div>
                                <div
                                    id="collapseThree"
                                    className="collapse"
                                    aria-labelledby="headingThree"
                                    data-parent="#accordionExample"
                                >
                                    <div className="card-body">
                                        <p>
                                            Lorem Ipsum is simply dummy text of the printing and
                                            typesetting industry lorem Ipsum has. been the industrys
                                            standard dummy text ever since the when an unknown printer
                                            took a galley of type and scrambled it to make a type specimen
                                            book. It has survived not only five cen turies but also the
                                            leap into electronic typesetting, remaining essentially
                                            unchanged.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="card" data-aos="fade-up" data-aos-duration={1500}>
                                <div className="card-header" id="headingFour">
                                    <h2 className="mb-0">
                                        <button
                                            type="button"
                                            className="btn btn-link collapsed"
                                            data-toggle="collapse"
                                            data-target="#collapseFour"
                                        >
                                            <i className="icon_faq icofont-plus" />
                                            What is process to get refund ?
                                        </button>
                                    </h2>
                                </div>
                                <div
                                    id="collapseFour"
                                    className="collapse"
                                    aria-labelledby="headingFour"
                                    data-parent="#accordionExample"
                                >
                                    <div className="card-body">
                                        <p>
                                            Lorem Ipsum is simply dummy text of the printing and
                                            typesetting industry lorem Ipsum has. been the industrys
                                            standard dummy text ever since the when an unknown printer
                                            took a galley of type and scrambled it to make a type specimen
                                            book. It has survived not only five cen turies but also the
                                            leap into electronic typesetting, remaining essentially
                                            unchanged.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* container end */}
            </section>
            {/* FAQ-Section end */}
        </>

    )
}