import React, {useState, useEffect} from 'react';
import './books-table.scss';

export const BooksTable = ({books}) => {
  const bestSellers = books.sort((a, b) => a.attributes.copiesSold >= b.attributes.copiesSold).slice(0,2).map((book, i) => {
    return <BooksRow key={i} book={book} />;
  });
  return (
    <section className="best-sellers">
      <table>
        <tbody>
          <tr>
            <th>Best-selling books</th>
          </tr>
          { bestSellers.length ?
            <>
            {bestSellers}
            </>
            :
            <tr>
              <td>No data available</td>
            </tr>
          }
        </tbody>
      </table>
    </section>
  )
}

const BooksRow = ({book}) => {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/authors/${book.relationships.author.data.id}`)
        .then(res => res.json())
        .then(res => setAuthor(res.data));
  }, []);
  return (
    <>
      { author &&
        <tr>
          <td>{book.attributes.name || 'No data available'}</td>
          <td>{author.attributes.fullName}</td>
        </tr>
      }
    </>
  )
}
