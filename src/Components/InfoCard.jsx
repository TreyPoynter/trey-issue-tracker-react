/*eslint-disable */
export default function InfoCard({ image, title, description }) {
    return (
        <div className="info-card card pop-out" style={{marginRight: 18 + 'em'}}>
            <img src={image} className="card-img-top" height={200} alt="ICON" />
            <div className="card-body">
                <h5 className="card-title text-center fs-3 "><strong>{title}</strong></h5>
                <p className="card-text text-center">{description}</p>
            </div>
        </div>
    )
}