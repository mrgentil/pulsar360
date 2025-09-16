export default function SideBar() {
    return (
        <>
            {/* ========== App Menu ========== */}
            <div className="app-menu navbar-menu">
                {/* LOGO */}
                <div className="navbar-brand-box">
                    {/* Dark Logo*/}
                    <a href="/dashboard" className="logo logo-dark">
            <span className="logo-sm">
              <img src="/icon.png" alt="logo" height={22} />
            </span>
                        <span className="logo-lg">
              <img src="/icon.png" alt="logo" height={17} />
            </span>
                    </a>
                    {/* Light Logo*/}
                    <a href="/dashboard" className="logo logo-light">
            <span className="logo-sm">
              <img src="/icon.png" alt="logo" height={22} />
            </span>
                        <span className="logo-lg">
              <img src="/icon.png" alt="logo" height={17} />
            </span>
                    </a>
                    <button
                        type="button"
                        className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
                        id="vertical-hover"
                    >
                        <i className="ri-record-circle-line" />
                    </button>
                </div>

                <div id="scrollbar">
                    <div className="container-fluid">
                        <div id="two-column-menu"></div>

                        <ul className="navbar-nav" id="navbar-nav">
                            <li className="menu-title">
                                <span data-key="t-menu">Menu</span>
                            </li>

                            {/* Lien vers le site public */}
                            <li className="nav-item">
                                <a className="nav-link menu-link" href="/" role="button" aria-expanded="false">
                                    <i className="mdi mdi-web" />
                                    <span>Voir le site</span>
                                </a>
                            </li>

                            {/* Dashboard */}
                            <li className="nav-item">
                                <a className="nav-link menu-link" href="/dashboard" role="button" aria-expanded="false">
                                    <i className="mdi mdi-view-dashboard-outline" />
                                    <span>Tableau de bord</span>
                                </a>
                            </li>

                            {/* Marques */}
                            <li className="nav-item">
                                <a className="nav-link menu-link" href="/dashboard/brands" role="button" aria-expanded="false">
                                    <i className="mdi mdi-storefront-outline" />
                                    <span>Marques</span>
                                </a>
                            </li>

                            <li className="menu-title">
                                <span>Contenu & Médias</span>
                            </li>

                            {/* Contenus (posts/emails/wa) */}
                            <li className="nav-item">
                                <a className="nav-link menu-link" href="/dashboard/contents" role="button" aria-expanded="false">
                                    <i className="mdi mdi-file-document-edit-outline" />
                                    <span>Contenus</span>
                                </a>
                            </li>

                            {/* Templates / Bibliothèque de prompts */}
                            <li className="nav-item">
                                <a className="nav-link menu-link" href="/dashboard/templates" role="button" aria-expanded="false">
                                    <i className="mdi mdi-view-grid-plus" />
                                    <span>Templates</span>
                                </a>
                            </li>

                            {/* Médias */}
                            <li className="nav-item">
                                <a className="nav-link menu-link" href="/dashboard/media" role="button" aria-expanded="false">
                                    <i className="mdi mdi-image-multiple" />
                                    <span>Médias</span>
                                </a>
                            </li>

                            <li className="menu-title">
                                <span>Canaux & Audience</span>
                            </li>

                            {/* Canaux (Instagram/Facebook/Email/WhatsApp/SMS) */}
                            <li className="nav-item">
                                <a className="nav-link menu-link" href="/dashboard/channels" role="button" aria-expanded="false">
                                    <i className="mdi mdi-share-variant" />
                                    <span>Canaux</span>
                                </a>
                            </li>

                            {/* Contacts/CRM léger */}
                            <li className="nav-item">
                                <a className="nav-link menu-link" href="/dashboard/contacts" role="button" aria-expanded="false">
                                    <i className="mdi mdi-account-multiple-outline" />
                                    <span>Contacts</span>
                                </a>
                            </li>

                            {/* Campagnes */}
                            <li className="nav-item">
                                <a className="nav-link menu-link" href="/dashboard/campaigns" role="button" aria-expanded="false">
                                    <i className="mdi mdi-bullhorn-outline" />
                                    <span>Campagnes</span>
                                </a>
                            </li>

                            {/* Calendrier (planning & scheduling) */}
                            <li className="nav-item">
                                <a className="nav-link menu-link" href="/dashboard/calendar" role="button" aria-expanded="false">
                                    <i className="mdi mdi-calendar-month-outline" />
                                    <span>Calendrier</span>
                                </a>
                            </li>

                            <li className="menu-title">
                                <span>Analyse & Automations</span>
                            </li>

                            {/* Analytics */}
                            <li className="nav-item">
                                <a className="nav-link menu-link" href="/dashboard/analytics" role="button" aria-expanded="false">
                                    <i className="mdi mdi-chart-line" />
                                    <span>Analytique</span>
                                </a>
                            </li>

                            {/* Automations / Flows */}
                            <li className="nav-item">
                                <a className="nav-link menu-link" href="/dashboard/automations" role="button" aria-expanded="false">
                                    <i className="mdi mdi-robot-outline" />
                                    <span>Automations</span>
                                </a>
                            </li>

                            <li className="menu-title">
                                <span>Organisation</span>
                            </li>

                            {/* Équipe */}
                            <li className="nav-item">
                                <a className="nav-link menu-link" href="/dashboard/team" role="button" aria-expanded="false">
                                    <i className="mdi mdi-account-group-outline" />
                                    <span>Équipe</span>
                                </a>
                            </li>

                            {/* Paramètres (brand settings, préférences, intégrations) */}
                            <li className="nav-item">
                                <a className="nav-link menu-link" href="/dashboard/settings" role="button" aria-expanded="false">
                                    <i className="mdi mdi-cog-outline" />
                                    <span>Paramètres</span>
                                </a>
                            </li>

                            {/* Aide / Support */}
                            <li className="nav-item">
                                <a className="nav-link menu-link" href="/dashboard/help" role="button" aria-expanded="false">
                                    <i className="mdi mdi-help-circle-outline" />
                                    <span>Aide</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="sidebar-background" />
            </div>
            {/* Left Sidebar End */}
        </>
    );
}
