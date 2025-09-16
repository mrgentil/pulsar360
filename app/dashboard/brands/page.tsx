import type { Metadata } from 'next';
import NewsLetter from "@/components/NewsLetter";
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog | Pulsar360',
  description: 'Discover product updates, marketing tips and insights from the Pulsar360 team.',
  openGraph: {
    title: 'Blog | Pulsar360',
    description: 'Discover product updates, marketing tips and insights from the Pulsar360 team.',
  },
};

export default function Blog() {
  return (
      <>
      

              {/* BredCrumb-Section */}
              <div className="bred_crumb">
                  <div className="container">
                      {/* shape animation  */}
                      <span className="banner_shape1">
        {" "}
                          <img src="/images/banner-shape1.png" alt="image" />{" "}
      </span>
                      <span className="banner_shape2">
        {" "}
                          <img src="/images/banner-shape2.png" alt="image" />{" "}
      </span>
                      <span className="banner_shape3">
        {" "}
                          <img src="/images/banner-shape3.png" alt="image" />{" "}
      </span>
                      <div className="bred_text">
                          <h1>Latest blog post</h1>
                          <ul>
                              <li>
                                  <Link href="/">Home</Link>
                              </li>
                              <li>
                                  <span>›</span>
                              </li>
                              <li>
                                  <Link href="/blog">Blog list</Link>
                              </li>
                          </ul>
                          <div className="search_bar">
                              <form action="#">
                                  <div className="form-group">
                                      <input
                                          type="text"
                                          placeholder="Search here"
                                          className="form-control"
                                      />
                                      <button className="btn" type="submit">
                                          <i className="icofont-search-1" />
                                      </button>
                                  </div>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
              {/* Blog-Detail-Section-Start */}
              <section className="row_am blog_list_main">
                  {/* container start */}
                  <div className="container">
                      {/* row start */}
                      <div className="row">
                          <div className="col-lg-6" data-aos="fade-in" data-aos-duration={1500}>
                              <div className="blog_img">
                                  <img src="/images/blod-detail.png" alt="image" />
                                  <span>20 min ago</span>
                              </div>
                          </div>
                          <div className="col-lg-6">
                              <div className="blog_text">
                                  <span className="choice_badge">EDITOR CHOICE</span>
                                  <div className="section_title">
                                      <h2>Top rated app of the year!</h2>
                                      <p>
                                          Lorem Ipsum is simply dummy text of the printing and typesetting
                                          in dustry lorem Ipsum has been the industrys standard dummy text
                                          ev er since the 1500s, when an unknown printer took a galley of
                                          type and scrambled it to make a type specimen book. It has
                                          survived not only five centuries, but also the leap into
                                          electronic Lorem Ipsum is simply dummy text of the printing and
                                          typesetting.
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
              {/* Blog-Detail-Section-end */}
              {/* Story-Section-Start */}
              <section className="row_am latest_story blog_list_story" id="blog">
                  {/* container start */}
                  <div className="container">
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
                                      <img src="/images/story03.png" alt="image" />
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
                          {/* story */}
                          <div className="col-md-4">
                              <div
                                  className="story_box"
                                  data-aos="fade-up"
                                  data-aos-duration={1500}
                              >
                                  <div className="story_img">
                                      <img src="images/story04.png" alt="image" />
                                      <span>45 min ago</span>
                                  </div>
                                  <div className="story_text">
                                      <h3>Excellence UI design</h3>
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
                                      <img src="/images/story05.png" alt="image" />
                                      <span>45 min ago</span>
                                  </div>
                                  <div className="story_text">
                                      <h3>Quick and easy Search</h3>
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
                                      <img src="/images/story06.png" alt="image" />
                                      <span>45 min ago</span>
                                  </div>
                                  <div className="story_text">
                                      <h3>Chat function eded</h3>
                                      <p>
                                          Printing and typesetting industry lorem Ipsum has Lorem simply
                                          dummy text of the.
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
                                      <img src="/images/story07.png" alt="image" />
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
                                      <img src="/images/story08.png" alt="image" />
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
                                      <img src="images/story09.png" alt="image" />
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
                                      <h3>Excellence UI design</h3>
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
                                      <h3>Quick and easy Search</h3>
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
                                      <h3>Chat function eded</h3>
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
                      {/* Pagination */}
                      <div className="pagination_block">
                          <ul>
                              <li>
                                  <a href="#" className="prev">
                                      <i className="icofont-arrow-left" /> Prev
                                  </a>
                              </li>
                              <li>
                                  <a href="#">1</a>
                              </li>
                              <li>
                                  <a href="#" className="active">
                                      2
                                  </a>
                              </li>
                              <li>
                                  <a href="#">3</a>
                              </li>
                              <li>
                                  <a href="#">4</a>
                              </li>
                              <li>
                                  <a href="#">5</a>
                              </li>
                              <li>
                                  <a href="#">6</a>
                              </li>
                              <li>
                                  <a href="#" className="next">
                                      Next <i className="icofont-arrow-right" />
                                  </a>
                              </li>
                          </ul>
                      </div>
                  </div>
                  {/* container end */}
              </section>
              {/* Story-Section-end */}

      <NewsLetter/>
    
    </>
  )
}
 


