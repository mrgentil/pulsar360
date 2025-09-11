"use client";
import Link from "next/link";
import Image from "next/image";
import { LogIn, UserPlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getMe, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

function initialsOf(name?: string | null, email?: string) {
  if (name && name.trim().length > 0) {
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] || "";
    const last = parts[1]?.[0] || "";
    const letters = (first + last || first).toUpperCase();
    if (letters) return letters;
  }
  if (email) return email.charAt(0).toUpperCase();
  return "U";
}

export default function Header() {
    const [user, setUser] = useState<{ name: string | null; email: string } | null>(null);
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLLIElement | null>(null);
    const router = useRouter();

    useEffect(() => {
        let mounted = true;
        getMe()
            .then((res) => { if (mounted) setUser(res?.user || null); })
            .catch(() => setUser(null));
        return () => { mounted = false; };
    }, []);

    useEffect(() => {
        function onDocClick(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener("click", onDocClick);
        return () => document.removeEventListener("click", onDocClick);
    }, []);

    const letters = initialsOf(user?.name, user?.email);

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
                            {user ? (
                              <li className="nav-item has_dropdown" ref={menuRef}>
                                <a
                                  className="nav-link"
                                  href="#"
                                  onClick={(e) => { e.preventDefault(); setOpen(v=>!v); }}
                                  aria-haspopup="true"
                                  aria-expanded={open}
                                  title={user.email}
                                >
                                  <span
                                    style={{
                                      width: 32,
                                      height: 32,
                                      borderRadius: "50%",
                                      background: "#6c63ff",
                                      color: "#fff",
                                      display: "inline-flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      fontWeight: 700,
                                      letterSpacing: 0.5,
                                    }}
                                  >{letters}</span>
                                </a>
                                {open && (
                                  <ul className="sub_menu" style={{ display: 'block' }}>
                                    <li><Link href="/app" className="nav-link">Dashboard</Link></li>
                                    <li><Link href="/profile" className="nav-link">Profil</Link></li>
                                    <li>
                                      <a className="nav-link" href="#" onClick={(e)=>{e.preventDefault(); logout(); setUser(null); router.push('/login');}}>Déconnexion</a>
                                    </li>
                                  </ul>
                                )}
                              </li>
                            ) : (
                              <>
                                <li className="nav-item">
                                  <Link className="nav-link" href="/login">Connexion</Link>
                                </li>
                                <li className="nav-item">
                                  <Link className="nav-link" href="/register">Inscription</Link>
                                </li>
                              </>
                            )}

                        </ul>
                    </div>
                </nav>
                {/* navigation end */}
            </div>
            {/* container end */}
        </header>

    )
}
