import Link from "next/link"
import Image from "next/image"
export default function InstagramAdvertize() {
    return (
        <>
    <section className="py-5 px-3 px-md-5">
  <div className="container-fluid">
    <div className="row">
      
      {/* Left Side - Title */}
      <div className="col-12 col-md-2 mb-4 mb-md-0">
        <h2 className="fw-bold">Instagram</h2>
        <p className="text-muted mb-0">
          Follow us on <br /> <span className="fw-semibold">@otarutech</span>
        </p>
      </div>

      {/* Right Side */}
      <div className="col-12 col-md-10">
        
        {/* Instagram Handle Row */}
        <div className="row mb-4">
          <div className="col-12 col-md-6 d-flex gap-3 align-items-center">
            <div>
              <i
                className="ri-instagram-line p-3 fs-1 text-white"
                style={{ borderRadius: "50%", background: "#333333" }}
              ></i>
            </div>
            <span className="fw-semibold fs-5">@otarutech</span>
          </div>
        </div>

        {/* Instagram Images */}
        <div className="row g-3">
          {["/image27.jpg", "/image18.jpg", "/image19.jpg", "/image22.jpg"].map((src, idx) => (
            <div key={idx} className="col-6 col-md-3">
              <div className="insta-item position-relative overflow-hidden rounded-3">
                <Image
                  className="insta-img w-100 h-100"
                  src={src}
                  alt={`instagram-${idx}`}
                  width={240}
                  height={250}
                  style={{ objectFit: "cover" }}
                />
                <div className="overlay d-flex align-items-center justify-content-center">
                  <Link href="/" className="btn btn-light rounded-pill px-4">
                    Instagram
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  </div>
</section>

        </>
    )
}