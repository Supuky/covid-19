import React, { useState, useEffect  } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';

import { fetchCountries } from '../../api/index'

const CountryPicker = ({ handleCountryChange }) => {
    const [ fetchedCoutries, setFetchedCountries ] = useState([]);
    // setFetchedCountriesを呼び出すたびにAPIを読み込む
    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries());
        }

        fetchAPI()
    }, [setFetchedCountries]);
    // 初期画面は世界中の感染者、死者を表示
    return (
        <FormControl className={styles.formControll}>
            <NativeSelect defaultValue=" " onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {fetchedCoutries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;