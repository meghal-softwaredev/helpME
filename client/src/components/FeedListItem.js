function FeedListItem(props) {
  return (
    <div>
      <p>{props.feed.title}</p>
      <p>{props.feed.tags}</p>
    </div>
  )
}

export default FeedListItem
