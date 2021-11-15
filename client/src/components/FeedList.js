import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  listFeeds
} from '../actions/feedActions';
import FeedListItem from './FeedListItem';

function FeedList(props) {

  const feedList = useSelector((state) => state.feedList);
  const { loading, error, feeds } = feedList;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      listFeeds()
    );
  }, [
    dispatch,
    props.history
  ]);

  return (
    <div>
      <div>
        <button type="button">
          Post Question
        </button>
      </div>
      {loading ? (
        <span>Loading</span>
      ) : error ? (
        <span>Error: {error}</span>
      ) : (
        <div>
          {feeds.map((feed) => (
            <FeedListItem key={feed._id} feed={feed} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FeedList
