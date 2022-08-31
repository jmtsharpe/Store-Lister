import React, {useState} from 'react';
import classNames from 'classnames';
import './store-rater.scss';

const rateStore = (storeId, rating, setStoreRating, storeRating) => {
  return () => {
    if (storeRating === rating && rating === 1){ rating = 0 }
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
      },
      body: JSON.stringify({
        data: {
          attributes: {
            rating,
          },
        },
      }),
    };
    fetch(`http://localhost:3000/stores/${storeId}`, requestOptions)
      .then(res => res.json())
      .then(res => setStoreRating(res.data.attributes.rating));
  }
};


export const StoreRater = ({store}) => {
  const [storeRating, setStoreRating] = useState(store.attributes.rating);
  const buttons = [1,2,3,4,5].map((rating) => {
    return <RateButton key={`${store.id}-${rating}`} buttonRating={rating} storeId={store.id} setStoreRating={setStoreRating} storeRating={storeRating}/>;
  })
  return <>{buttons}</>
}

const RateButton = ({buttonRating, storeRating, storeId, setStoreRating}) => {
  return <button className={classNames('rating-button', {'rate-gold': storeRating >= buttonRating})} onClick={rateStore(storeId, buttonRating, setStoreRating, storeRating)}></button>
}
