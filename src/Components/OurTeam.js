import Image from "next/image";
import InstagramAdvertize from "./InstagramAdvertize";
import BackToTopButton from "./BackToTopButton";


const teamMember = [
    {
        pic: '/Teams/team1.jpg',
        name: 'Edmond Smith',
        role: 'Product manager'
    },
    {
        pic: '/Teams/team2.jpg',
        name: 'Ingrid Vulk',
        role: 'Designer'
    },
    {
        pic: '/Teams/team3.jpg',
        name: 'Myles Runte',
        role: 'Developer'
    },
    {
        pic: '/Teams/team4.jpg',
        name: 'Edmond Smith',
        role: 'Product manager'
    },
    {
        pic: '/Teams/team5.jpg',
        name: 'Ingrid Vulk',
        role: 'Designer'
    },
    {
        pic: '/Teams/team6.jpg',
        name: 'Myles Runte',
        role: 'Developer'
    },
    {
        pic: '/Teams/team7.jpg',
        name: 'Ingrid Vulk',
        role: 'Designer'
    },
    {
        pic: '/Teams/team8.jpg',
        name: 'Myles Runte',
        role: 'Developer'
    },
]

export default function OurTeam() {
    return (
        <>
            <BackToTopButton />
            <section className="our-team-section">
                <h1><span className="text-muted">Our</span> Team</h1>
            </section>

            <section className="px-5" style={{ padding: '80px 0' }}>
                <div className="row mb-5">
                    <div className="col-lg-3 col-6">
                        <small className="text-muted">TECHNOLOGY</small>
                        <h2>Get to know our team members</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 d-flex flex-wrap gap-5">
                        {teamMember?.map((member, index) => (
                            <div key={index} className="d-flex flex-column gap-2" style={{ flex: '1 1 280px', maxWidth: '386px' }}>

                                {/* Responsive image wrapper */}
                                <div style={{ position: 'relative', width: '100%', aspectRatio: '386 / 400' }}>
                                    <Image
                                        src={member?.pic}
                                        alt={member?.pic || 'Team member'}
                                        fill
                                        style={{ objectFit: 'cover', borderRadius: '8px' }}
                                        sizes="(max-width: 768px) 100vw, 386px"
                                    />
                                </div>

                                <h3 className="mt-4">{member?.name}</h3>
                                <p className="text-muted">{member?.role}</p>

                                <div className="d-flex gap-2 mb-4">
                                    <a className="small socialMedia text-decoration-none text-muted" href="#">INSTAGRAM</a>
                                    <a className="small socialMedia text-decoration-none text-muted" href="#">TWITTER</a>
                                    <a className="small socialMedia text-decoration-none text-muted" href="#">LINKEDIN</a>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            <hr />
            <InstagramAdvertize />
            
        </>
    )
}