export default function Story() {
    return (
        <>
            {/* Story-Section-Start */}
            <section className="row_am latest_story" id="blog">
                {/* container start */}
                <div className="container">
                    <div
                        className="section_title"
                        data-aos="fade-in"
                        data-aos-duration={1500}
                        data-aos-delay={100}
                    >
                        <h2>
                            Read latest <span>story</span>
                        </h2>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typese tting{" "}
                            <br /> indus orem Ipsum has beenthe standard dummy.
                        </p>
                    </div>
                    {/* row start */}
                    <div className="row">
                        {/* story */}
                        <div className="col-md-4">
                            <div
                                className="story_box"
                                data-aos="fade-up"
                                data-aos-duration={1500}
                            >
                                <div className="story_img">
                                    <img src="images/story01.png" alt="image" />
                                    <span>45 min ago</span>
                                </div>
                                <div className="story_text">
                                    <h3>Cool features added!</h3>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting
                                        industry lorem Ipsum has.
                                    </p>
                                    <a href="blog-single.html">READ MORE</a>
                                </div>
                            </div>
                        </div>
                        {/* story */}
                        <div className="col-md-4">
                            <div
                                className="story_box"
                                data-aos="fade-up"
                                data-aos-duration={1500}
                            >
                                <div className="story_img">
                                    <img src="images/story02.png" alt="image" />
                                    <span>45 min ago</span>
                                </div>
                                <div className="story_text">
                                    <h3>Top rated app! Yupp.</h3>
                                    <p>
                                        Simply dummy text of the printing and typesetting industry lorem
                                        Ipsum has Lorem Ipsum is.
                                    </p>
                                    <a href="blog-single.html">READ MORE</a>
                                </div>
                            </div>
                        </div>
                        {/* story */}
                        <div className="col-md-4">
                            <div
                                className="story_box"
                                data-aos="fade-up"
                                data-aos-duration={1500}
                            >
                                <div className="story_img">
                                    <img src="images/story03.png" alt="image" />
                                    <span>45 min ago</span>
                                </div>
                                <div className="story_text">
                                    <h3>Creative ideas on app.</h3>
                                    <p>
                                        Printing and typesetting industry lorem Ipsum has Lorem simply
                                        dummy text of the.
                                    </p>
                                    <a href="blog-single.html">READ MORE</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* row end */}
                </div>
                {/* container end */}
            </section>
            {/* Story-Section-end */}
        </>

    )
}