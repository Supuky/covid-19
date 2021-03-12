import React from 'react';
import { Cards, Chart, CountryPicker } from './components/index';
import styles from './App.module.css';
import { fetchData } from './api';
import coronaImage from './images/image.png';
 
// class versionで書いてみる
class App extends React.Component {
    state = {
        data: {},
        countries: '',
    }
    // API読み込み
    async componentDidMount() {
        const fetchedData = await fetchData();
        // console.log(fetchData);

        this.setState({ data: fetchedData })
    }
    // 国に選択
    handleCountryChange = async (country) => {

        const fetchedData = await fetchData(country);

        this.setState({ data: fetchedData, country: country })
    }


    render() {
        const { data, country } = this.state;

        return (
            <div className={styles.container}>
                <img className={styles.image} src={coronaImage} alt="COVID-19" />
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country} />
            </div>
        )
    }
}

export default App;