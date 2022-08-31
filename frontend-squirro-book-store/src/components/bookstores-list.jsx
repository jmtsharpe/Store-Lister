import React, {useState, useEffect} from 'react';
import { BookstoresListItem } from './bookstores-list-item';
import './bookstores-list.scss';

export const BookstoresList = ({stores}) => {
  const storesList = stores.map(store => <BookstoresListItem key={store.id} store={store}/>);
  return (
    <div className="stores-list">
      {storesList}
    </div>
  )
}
