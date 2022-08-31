import React, {useState, useEffect} from 'react';
import { BookstoresList } from './bookstores-list';

export const BookstoresContainer = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const storeList = fetchStores()
      .then(res => res.json())
      .then(res => setStores(res.data));
  }, []);

  return <section><BookstoresList stores={stores} /></section>;
}

const fetchStores = async () => {
  return fetch('http://localhost:3000/stores');
}
