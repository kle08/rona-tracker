import React, { useState, useEffect } from 'react'
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core'
import './Home.css';
import InfoBox from './InfoBox';
import Map from './Map';

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide')

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map(country => ({
            name: country.country,
            value: country.countryInfo.iso2
          }))
          setCountries(countries)
        })
    }
    getCountriesData()
  }, []);

  const onCountryChange = (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode)
  }

  return (
    <div className='home'>
      <div className='home__left'>
        <div className='home__header'>
          <FormControl className='home__dropdown' >
            <Select
              variant='outlined'
              onChange={onCountryChange}
              value={country}>
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {countries.map(country => {
                return <MenuItem value={country.value}>{country.name}</MenuItem>
              })}
            </Select>
          </FormControl>
        </div>
        <div className='home__stats'>
          <InfoBox title='Coronavirus Cases' cases={300} total={500} />
          <InfoBox title='Recovered' />
          <InfoBox title='Deaths' />
        </div>
        <Map />
      </div>
      <Card className='home__right'>
        {/* {table} */}
        {/* {graph} */}
      </Card>
    </div>
  )
}
