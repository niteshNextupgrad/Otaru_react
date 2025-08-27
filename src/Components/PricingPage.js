import InstagramAdvertize from "./InstagramAdvertize";

const pricing = [
    {
        price: 69,
        title: 'Personal solution',
        subTitle: "EACH MONTHS",
        features: ["Mobile Optimized", "Free custom Domain", "Best Hosting", "Outstanding Support"]
    },
    {
        price: 89,
        title: 'Personal solution',
        subTitle: "EACH MONTHS",
        features: ["Mobile Optimized", "Free custom Domain", "Best Hosting", "Outstanding Support"]
    },
    {
        price: 99,
        title: 'Personal solution',
        subTitle: "EACH MONTHS",
        features: ["Mobile Optimized", "Free custom Domain", "Best Hosting", "Outstanding Support"]
    },
]

export default function PricingPage() {
    return (
        <>
            <section className="pricing-section">
            </section>
            <section className="py-5 px-3 px-md-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-8 text-center d-flex flex-column justify-content-center align-items-center gap-4">
                        <h2 className="fs-1">
                            Keep track of the overall market trends & more
                        </h2>
                        <p className="text-muted">
                            Quis varius quam quisque vel quam. Condimentum vitae sapien
                            pellentesque habitant. Id venenatis a condimentum vitae sapien
                            pellentesque.
                        </p>
                    </div>
                </div>

                <div className="row justify-content-center mt-4 g-4">
                    {pricing?.map((pr, index) => (
                        <div
                            key={index}
                            className="col-12  col-lg-4 d-flex"
                        >
                            <div
                                className={`flex-grow-1 d-flex flex-column gap-3 p-4 rounded-3 ${index === 1 ? "pricing-card" : "bg-dark text-white"
                                    }`}
                                style={{ border: "0.1px solid gray", minHeight: "100%" }}
                            >
                                <div className={`${index === 1 ? "text-dark" : "text-white"}`}>
                                    <span className="small-text move-down">{pr?.subTitle}</span>
                                    <br />
                                    <span className="ls-1" style={{ fontSize: "3.5rem" }}>
                                        {pr.price || 69}
                                        <sup className="fs-4">$</sup>
                                    </span>
                                    <p className="move-up fs-4">{pr?.title}</p>
                                </div>

                                <ul
                                    className={`d-flex flex-column gap-3 ${index === 1 ? "text-dark" : "text-muted"
                                        }`}
                                >
                                    {pr?.features?.map((feature, i) => (
                                        <li key={i}>{feature}</li>
                                    ))}
                                </ul>

                                <div>
                                    <button className="pageBtn">
                                        Discover all plans <i className="ri-send-plane-2-fill"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <div className="container-fluid">
                    <div className="row py-5">
                        <div className="marquee-container3 py-2 ">
                            <div className="marquee-track">
                                <h2>Bleeding </h2>
                                <p>*</p>
                                <h2>Technology</h2>
                                <p>*</p>
                                <h2>Established</h2>
                                <p>*</p>
                                <h2>Bleeding </h2>
                                <p>*</p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <InstagramAdvertize />
            <hr />
        </>

    )
}