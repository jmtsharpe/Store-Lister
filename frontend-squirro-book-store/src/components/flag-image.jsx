import React, {useEffect, useState} from 'react';
import './flag-image.scss';


export const FlagImage = ({countryId}) => {

  const [flagImageSrc, setFlagImageSrc] = useState(null)

  useEffect(() => {
    fetchCountry(countryId)
      .then(res => res.json())
      .then(res => {
        fetchFlagSrc(res.data.attributes.code)
          .then(res => res.json())
          .then(res => {
            setFlagImageSrc(res[0].flags.svg)
          })
      }
      )
  }, []);

  // return <img src={`https://restcountries.com/v3.1/alpha/${code}`} className="flag-image"/>
  return <img src={flagImageSrc} className="flag-image"/>
}

const fetchCountry = id => fetch(`http://localhost:3000/countries/${id}`);

const fetchFlagSrc = code => fetch(`https://restcountries.com/v3.1/alpha/${code}`);
