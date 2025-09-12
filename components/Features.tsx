export default function Features() {
    return (
        <>
            {/* Features-Section-Start */}
            <section className="row_am features_section" id="features">
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
                            <span>Planner </span>Intelligent!
                        </h2>
                        {/* p */}
                        <p>
                            Planifiez vos posts multi-canaux (Instagram, Facebook, Email, WhatsApp)
                            <br /> en quelques clics avec des créneaux optimisés.
                        </p>
                    </div>
                    <div className="feature_detail">
                        {/* feature box left */}
                        <div className="left_data feature_box">
                            {/* feature box */}
                            <div
                                className="data_block"
                                data-aos="fade-right"
                                data-aos-duration={1500}
                            >
                                <div className="icon">
                                    <img src="/images/secure_data.png" alt="image" />
                                </div>
                                <div className="text">
                                    <h4>Composer IA</h4>
                                    <p>
                                        Générez, réécrivez et traduisez vos contenus avec un ton adapté à votre marque.
                                    </p>
                                </div>
                            </div>
                            {/* feature box */}
                            <div
                                className="data_block"
                                data-aos="fade-right"
                                data-aos-duration={1500}
                            >
                                <div className="icon">
                                    <img src="/images/functional.png" alt="image" />
                                </div>
                                <div className="text">
                                    <h4>Inbox Unifiée</h4>
                                    <p>
                                        Centralisez les messages et commentaires, priorisez et répondez plus vite.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* feature box right */}
                        <div className="right_data feature_box">
                            {/* feature box */}
                            <div
                                className="data_block"
                                data-aos="fade-left"
                                data-aos-duration={1500}
                            >
                                <div className="icon">
                                    <img src="/images/live-chat.png" alt="image" />
                                </div>
                                <div className="text">
                                    <h4>Analytics Clairs</h4>
                                    <p>
                                        Suivez portée, engagement, CTR et croissance. Décidez avec des KPI utiles.
                                    </p>
                                </div>
                            </div>
                            {/* feature box */}
                            <div
                                className="data_block"
                                data-aos="fade-left"
                                data-aos-duration={1500}
                            >
                                <div className="icon">
                                    <img src="/images/support.png" alt="image" />
                                </div>
                                <div className="text">
                                    <h4>Collaboration & Rôles</h4>
                                    <p>
                                        Invitez votre équipe, gérez les rôles (OWNER/ADMIN/EDITOR/VIEWER) et travaillez en sécurité.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* feature image */}
                        <div
                            className="feature_img"
                            data-aos="fade-up"
                            data-aos-duration={1500}
                            data-aos-delay={100}
                        >
                            <img src="/images/features_frame.png" alt="image" />
                        </div>
                    </div>
                </div>
                {/* container end */}
            </section>
            {/* Features-Section-end */}
        </>

    )
}