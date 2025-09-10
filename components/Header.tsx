export default function Header() {
    return (
        <header>
            {/* container start */}
            <div className="container">
                {/* navigation bar */}
                <nav className="navbar navbar-expand-lg">
                    <a className="navbar-brand" href="#">
                        <img src="/images/logo.png" alt="image" />
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
        <span className="navbar-toggler-icon">
          {/* <i class="icofont-navigation-menu ico_menu"></i> */}
            <div className="toggle-wrap">
            <span className="toggle-bar" />
          </div>
        </span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            {/* secondery menu start */}
                            <li className="nav-item has_dropdown">
                                <a className="nav-link" href="/">
                                    Accueil
                                </a>
                            </li>
                            {/* secondery menu end */}
                            <li className="nav-item">
                                <a className="nav-link" href="#features">
                                    Features
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#how_it_work">
                                    How it works
                                </a>
                            </li>
                            {/* secondery menu start */}
                            <li className="nav-item has_dropdown">
                                <a className="nav-link" href="/about">
                                    Pulsar360
                                </a>
                            </li>
                            {/* secondery menu end */}
                            <li className="nav-item">
                                <a className="nav-link" href="#pricing">
                                    Prix
                                </a>
                            </li>
                            {/* secondery menu start */}
                            <li className="nav-item has_dropdown">
                                <a className="nav-link" href="/blog">
                                    Blog
                                </a>
                            </li>
                            {/* secondery menu end */}
                            <li className="nav-item">
                                <a className="nav-link" href="/contact">
                                    Contact
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link dark_btn" href="/contact">
                                    GET STARTED
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                {/* navigation end */}
            </div>
            {/* container end */}
        </header>

    )
}




