interface Props {
  location: string
  year: string
  done: boolean
}

export default function Trip({ location, year, done }: Props) {
  return (
    <>
      <div>{location}</div>
      <div> {year} </div>
      <div>
        {done} && <p>Trip marked as not completed</p>{' '}
      </div>
    </>
  )
}
