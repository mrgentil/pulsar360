export default function Pricing() {
    return (
        <>
            {/* Pricing-Section */}
            <section className="row_am pricing_section" id="pricing">
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
                            Tarifs simples et <span>transparents</span>
                        </h2>
                        <p>Démarrez gratuitement. Passez en Pro quand vous êtes prêt.</p>
                        {/* p */}
                    </div>
                    {/* toggle button */}
                    <div className="toggle_block" data-aos="fade-up" data-aos-duration={1500}>
                        <span className="month active">Monthly</span>
                        <div className="tog_block">
                            <span className="tog_btn" />
                        </div>
                        <span className="years">Yearly</span>
                        <span className="offer">50% off</span>
                    </div>
                    {/* pricing box  monthly start */}
                    <div
                        className="pricing_pannel monthly_plan active"
                        data-aos="fade-up"
                        data-aos-duration={1500}
                    >
                        {/* row start */}
                        <div className="row">
                            {/* pricing box 1 */}
                            <div className="col-md-4">
                                <div className="pricing_block">
                                    <div className="icon">
                                        <img src="/images/standard.png" alt="image" />
                                    </div>
                                    <div className="pkg_name">
                                        <h3>Gratuit</h3>
                                        <span>For the basics</span>
                                    </div>
                                    <span className="price">0$/mois</span>
                                    <ul className="benifits">
                                        <li>
                                            <p>1 Marque</p>
                                        </li>
                                        <li>
                                            <p>3 Canaux</p>
                                        </li>
                                        <li>
                                            <p>10 posts/mois</p>
                                        </li>
                                        <li>
                                            <p>Analytics de base.</p>
                                        </li>
                                    </ul>
                                    <a href="/buy" className="btn white_btn">
                                        Essayer
                                    </a>
                                </div>
                            </div>
                            {/* pricing box 2 */}
                            <div className="col-md-4">
                                <div className="pricing_block highlited_block">
                                    <div className="icon">
                                        <img src="/images/unlimited.png" alt="image" />
                                    </div>
                                    <div className="pkg_name">
                                        <h3>Pro</h3>
                                        <span>For the professionals</span>
                                    </div>
                                    <span className="price">29$/mois</span>
                                    <ul className="benifits">
                                        <li>
                                            <p>3 Marques</p>
                                        </li>
                                        <li>
                                            <p>6 Canaux</p>
                                        </li>
                                        <li>
                                            <p>Posts Illimité</p>
                                        </li>
                                        <li>
                                            <p>IA avancée + Inbox</p>
                                        </li>
                                        <li>
                                            <p>Analytics Complets.</p>
                                        </li>
                                    </ul>
                                    <a href="/buy" className="btn white_btn">
                                        Passer en Pro
                                    </a>
                                </div>
                            </div>
                            {/* pricing box 3 */}
                            <div className="col-md-4">
                                <div className="pricing_block">
                                    <div className="icon">
                                        <img src="/images/premium.png" alt="image" />
                                    </div>
                                    <div className="pkg_name">
                                        <h3>Business</h3>
                                        <span>For small team</span>
                                    </div>
                                    <span className="price">Sur devis</span>
                                    <ul className="benifits">
                                        <li>
                                            <p>Marques Illimitées</p>
                                        </li>
                                        <li>
                                            <p>Rôles avancés, SSO</p>
                                        </li>
                                        <li>
                                            <p>SLA & support prioritaire</p>
                                        </li>


                                    </ul>
                                    <a href="/contact" className="btn white_btn">
                                        Nous contacter
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* row end */}
                    </div>
                    {/* pricing box monthly end */}
                    {/* pricing box yearly start */}
                    <div className="pricing_pannel yearly_plan">
                        <div className="row">
                            {/* pricing box 1 */}
                            <div className="col-md-4">
                                <div className="pricing_block">
                                    <div className="icon">
                                        <img src="images/standard.png" alt="image" />
                                    </div>
                                    <div className="pkg_name">
                                        <h3>Standard</h3>
                                        <span>For the basics</span>
                                    </div>
                                    <span className="price">$150</span>
                                    <ul className="benifits">
                                        <li>
                                            <p>Up to 10 Website</p>
                                        </li>
                                        <li>
                                            <p>100 GB disk space</p>
                                        </li>
                                        <li>
                                            <p>25 Customize sub pages</p>
                                        </li>
                                        <li>
                                            <p>4 Domains access</p>
                                        </li>
                                        <li>
                                            <p>Support on request</p>
                                        </li>
                                    </ul>
                                    <a href="contact.html" className="btn white_btn">
                                        BUY NOW
                                    </a>
                                </div>
                            </div>
                            {/* pricing box 2 */}
                            <div className="col-md-4">
                                <div className="pricing_block highlited_block">
                                    <div className="icon">
                                        <img src="images/unlimited.png" alt="image" />
                                    </div>
                                    <div className="pkg_name">
                                        <h3>Unlimited</h3>
                                        <span>For the professionals</span>
                                    </div>
                                    <span className="price">$999</span>
                                    <ul className="benifits">
                                        <li>
                                            <p>Unlimited Website</p>
                                        </li>
                                        <li>
                                            <p>400 GB disk space</p>
                                        </li>
                                        <li>
                                            <p>40 Customize sub pages</p>
                                        </li>
                                        <li>
                                            <p>20 Domains access</p>
                                        </li>
                                        <li>
                                            <p>24/7 Customer support</p>
                                        </li>
                                    </ul>
                                    <a href="contact.html" className="btn white_btn">
                                        BUY NOW
                                    </a>
                                </div>
                            </div>
                            {/* pricing box 3 */}
                            <div className="col-md-4">
                                <div className="pricing_block">
                                    <div className="icon">
                                        <img src="images/premium.png" alt="image" />
                                    </div>
                                    <div className="pkg_name">
                                        <h3>Premium</h3>
                                        <span>For small team</span>
                                    </div>
                                    <span className="price">$550</span>
                                    <ul className="benifits">
                                        <li>
                                            <p>Up to 20 Website</p>
                                        </li>
                                        <li>
                                            <p>200 GB disk space</p>
                                        </li>
                                        <li>
                                            <p>25 Customize sub pages</p>
                                        </li>
                                        <li>
                                            <p>8 Domains access</p>
                                        </li>
                                        <li>
                                            <p>24/7 Customer support</p>
                                        </li>
                                    </ul>
                                    <a href="contact.html" className="btn white_btn">
                                        BUY NOW
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* pricing box yearly end */}
                    <p className="contact_text" data-aos="fade-up" data-aos-duration={1500}>
                        Vous ne savez pas quoi choisir ? <a href="/contact">Contactez-nous</a> for
                        pour des forfaits personnalisés.

                    </p>
                </div>
                {/* container start end */}
            </section>
            {/* Pricing-Section end */}
        </>

    )
}