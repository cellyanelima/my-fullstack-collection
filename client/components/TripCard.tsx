interface Props {
  location: string
  description: string
  year: string
  title: string
  image: string
  done: boolean
}

export default function Trip({
  location,
  description,
  title,
  image,
  year,
  done,
}: Props) {
  return (
    <>
      <div className="travel-card">
        <img src={image} alt={title} />
        <div className="travel-card-content">
          <h2 className="travel-card-title">
            {location} <br></br> {title} <br></br> {year} <br></br> {done}
          </h2>
          <p className="travel-card-description">{description}</p>
          <button className="travel-card-button">See more</button>
        </div>
      </div>
    </>
  )
}
