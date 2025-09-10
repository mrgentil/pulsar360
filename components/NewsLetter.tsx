export default function NewsLetter() {
    return (
        <>
            {/* News-Letter-Section-Start */}
            <section className="newsletter_section">
                {/* container start */}
                <div className="container">
                    <div className="newsletter_box">
                        <div
                            className="section_title"
                            data-aos="fade-in"
                            data-aos-duration={1500}
                            data-aos-delay={100}
                        >
                            {/* h2 */}
                            <h2>Subscribe newsletter</h2>
                            {/* p */}
                            <p>Be the first to recieve all latest post in your inbox</p>
                        </div>
                        <form
                            action="#"
                            data-aos="fade-in"
                            data-aos-duration={1500}
                            data-aos-delay={100}
                        >
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="form-group">
                                <button className="btn">SUBMIT</button>
                            </div>
                        </form>
                    </div>
                </div>
                {/* container end */}
            </section>
            {/* News-Letter-Section-end */}
        </>

    )
}