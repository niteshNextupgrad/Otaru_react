"use client"
import Image from "next/image"
export default function LightImages() {
    return (
        <section className="py-5">
            <div className="container-fluid">
                <div className="row p-md-4 ">
                    <div className="col-sm-12 d-flex flex-lg-row flex-md-row flex-column align-items-center  justify-content-between flex-wrap gap-lg-3 gap-5">
                        {["ltImge1", "ltImge2", "ltImge3", "ltImge4", "ltImge5", "ltImge6", "ltImge7", "ltImge8"].map((name) => (
                            <Image
                                key={name}
                                className="hover-img"
                                src={`/${name}.png`}
                                height={120}
                                width={120}
                                alt={name}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}