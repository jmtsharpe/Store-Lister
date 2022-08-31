import React, {useState, useEffect} from 'react';
import {BookstoreImage} from './bookstore-image';
import {FlagImage} from './flag-image';
import {StoreRater} from './store-rater';
import {BooksTable} from './books-table';
import './bookstores-list-item.scss';

export const BookstoresListItem = ({store}) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const bookList = Promise.all((store?.relationships?.books?.data || []).map(book => {
      return fetchBook(book.id)
        .then(res => res.json())
        .then(res => res.data);
    }))
    .then(data => {
      setBooks(data);
    })
  }, []);
  return (
    <section className="store flex">
      <div className="store-body flex">
        <div className="flex store-image-container">
          <BookstoreImage src={store.attributes.storeImage} />
        </div>
        <div className="flex store-info flex-fill">
          <div className="flex store-header">
            <h1 className="store-name">
              {store.attributes.name}
            </h1>
            <div className="store-item-rater">
              <StoreRater store={store} />
            </div>
          </div>
          <BooksTable books={books}/>
        </div>
      </div>
      <div className="store-footer flex">
        <div>{new Date(store.attributes.establishmentDate).toLocaleDateString('en-CH').replace(/\//g, '.')} - <a target="_blank" href={store.attributes.website}>{store.attributes.website}</a></div>
        <FlagImage countryId={store.relationships.countries.data.id}/>
      </div>
    </section>
  );
}

const fetchBook = id => fetch(`http://localhost:3000/books/${id}`);
