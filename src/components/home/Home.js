import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent, } from '@material-ui/core';
import './Home.css';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData } from './util'
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 })
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([])


  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => setCountryInfo(data))
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map(country => ({
            id: country.countryInfo.id,
            name: country.country,
            value: country.countryInfo.iso2
          }))
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data);
        })
    }
    getCountriesData()
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode)
    const url = countryCode === 'worldwid' ?
      'https://disease.sh/v3/covid-19/all' :
      `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
        setCountry(countryCode)
        setMapCenter([data.countryInfo.lat, data.countryInfo.long])
        setMapZoom(4)
      })
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
          <InfoBox title='Coronavirus Cases' cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title='Recovered' cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title='Deaths' cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>
        <Map center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries} />
      </div>
      <Card className='home__right'>
        <CardContent>
          <h3>live cases </h3>
          <Table countries={tableData} />
          <h3>live new cases </h3>
        </CardContent>
        <LineGraph />
      </Card>
    </div>
  )
}
