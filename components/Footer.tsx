import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <div className="top_footer" id="contact">
        {/* animation line */}
        <div className="anim_line dark_bg">
          <span>
            <Image src="/images/anim_line.png" alt="Animation line" width={180} height={6} />
          </span>
          <span>
            <Image src="/images/anim_line.png" alt="Animation line" width={180} height={6} />
          </span>
          <span>
            <Image src="/images/anim_line.png" alt="Animation line" width={180} height={6} />
          </span>
          <span>
            <Image src="/images/anim_line.png" alt="Animation line" width={180} height={6} />
          </span>
          <span>
            <Image src="/images/anim_line.png" alt="Animation line" width={180} height={6} />
          </span>
          <span>
            <Image src="/images/anim_line.png" alt="Animation line" width={180} height={6} />
          </span>
          <span>
            <Image src="/images/anim_line.png" alt="Animation line" width={180} height={6} />
          </span>
          <span>
            <Image src="/images/anim_line.png" alt="Animation line" width={180} height={6} />
          </span>
          <span>
            <Image src="/images/anim_line.png" alt="Animation line" width={180} height={6} />
          </span>
        </div>
        {/* container start */}
        <div className="container">
          {/* row start */}
          <div className="row">
            {/* footer link 1 */}
            <div className="col-lg-4 col-md-6 col-12">
              <div className="abt_side">
                <div className="logo">
                  <Image src="/images/footer_logo.png" alt="Pulsar360" width={140} height={36} />
                </div>
                <ul>
                  <li>
                    <Link href="mailto:support@example.com">support@example.com</Link>
                  </li>
                  <li>
                    <Link href="tel:+19001234567">+1-900-123 4567</Link>
                  </li>
                </ul>
                <ul className="social_media">
                  <li>
                    <Link href="#">
                      <i className="icofont-facebook" />
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="icofont-twitter" />
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="icofont-instagram" />
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="icofont-pinterest" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* footer link 2 */}
            <div className="col-lg-3 col-md-6 col-12">
              <div className="links">
                <h3>Useful Links</h3>
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/about">About us</Link>
                  </li>
                  <li>
                    <Link href="#features">Services</Link>
                  </li>
                  <li>
                    <Link href="/blog">Blog</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact us</Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* footer link 3 */}
            <div className="col-lg-3 col-md-6 col-12">
              <div className="links">
                <h3>Help &amp; Support</h3>
                <ul>
                  <li>
                    <Link href="#faq">FAQs</Link>
                  </li>
                  <li>
                    <Link href="/contact">Support</Link>
                  </li>
                  <li>
                    <Link href="#how_it_work">How it works</Link>
                  </li>
                  <li>
                    <Link href="/terms">Terms &amp; conditions</Link>
                  </li>
                  <li>
                    <Link href="/privacy">Privacy policy</Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* footer link 4 */}
            <div className="col-lg-2 col-md-6 col-12">
              <div className="try_out">
                <h3>Let’s Try Out</h3>
                <ul className="app_btn">
                  <li>
                    <Link href="#">
                      <Image src="/images/appstore_blue.png" alt="Download on App Store" width={140} height={42} />
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <Image src="/images/googleplay_blue.png" alt="Get it on Google Play" width={140} height={42} />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* row end */}
        </div>
        {/* container end */}
      </div>
      {/* last footer */}
      <div className="bottom_footer">
        {/* container start */}
        <div className="container">
          {/* row start */}
          <div className="row">
            <div className="col-md-6">
              <p>© Copyrights 2022. All rights reserved.</p>
            </div>
            <div className="col-md-6">
              <p className="developer_text">
                Design &amp; developed by{" "}
                <Link href="https://themeforest.net/user/kalanidhithemes" target="_blank">
                  Kalanidhi Themes
                </Link>
              </p>
            </div>
          </div>
          {/* row end */}
        </div>
        {/* container end */}
      </div>
      {/* go top button */}
      <div className="go_top">
        <span>
          <Image src="/images/go_top.png" alt="Go to top" width={40} height={40} />
        </span>
      </div>
    </footer>
  );
}

