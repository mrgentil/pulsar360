import Link from "next/link";
import Image from "next/image";
import { LogIn, UserPlus } from "lucide-react";

export default function Header() {
    return (
        <header>
            {/* container start */}
            <div className="container">
                {/* navigation bar */}
                <nav className="navbar navbar-expand-lg">
                    <Link className="navbar-brand" href="/">
                        <Image src="/images/logo.png" alt="Pulsar360" width={120} height={32} priority />
                    </Link>
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
                                <Link className="nav-link" href="/">
                                    Accueil
                                </Link>
                            </li>
                            {/* secondery menu end */}
                            <li className="nav-item">
                                <Link className="nav-link" href="#features">
                                    Features
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="#how_it_work">
                                    How it works
                                </Link>
                            </li>
                            {/* secondery menu start */}
                            <li className="nav-item has_dropdown">
                                <Link className="nav-link" href="/about">
                                    Pulsar360
                                </Link>
                            </li>
                            {/* secondery menu end */}
                            <li className="nav-item">
                                <Link className="nav-link" href="#pricing">
                                    Prix
                                </Link>
                            </li>
                            {/* secondery menu start */}
                            <li className="nav-item has_dropdown">
                                <Link className="nav-link" href="/blog">
                                    Blog
                                </Link>
                            </li>
                            {/* secondery menu end */}
                            <li className="nav-item">
                                <Link className="nav-link" href="/contact">
                                    Contact
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/login">
                                    Connexion
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/register">
                                    Inscription
                                </Link>
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




