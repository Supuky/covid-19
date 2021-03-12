import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({ data: {confirmed, recovered, deaths, }, country }) => {
    const [dailyData, setDailyData] = useState([]);

    // API
    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        } 

        fetchAPI();
    }, []);

    // 世界中の感染者と死者を折れ線グラフで表示
    const lineChart = (
        dailyData.length
        ? (
            <Line 
                data={{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{
                        data: dailyData.map(({confirmed}) => confirmed),
                        label: '感染者数',
                        borderColor: '#3333ff',
                        fill: true
                    },{
                        data: dailyData.map(({deaths}) => deaths),
                        label: '死亡者数',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true
                    }],
                }}
            />) : null
    );

    // 国の場合は感染者、回復者、死者を棒グラフで表示
    const barChart = (
        confirmed
         ?(
            <Bar 
                data={{
                    labels: ['感染者数', '回復者数', '死者数'],
                    datasets: [{
                        label: ' ',
                        backgroundColor: [
                            'rgba(0, 0, 255, 0.5)',
                            'rgba(0, 255, 0, 0.5)',
                            'rgba(255, 0, 0, 0.5)',
                        ],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: {display: false},
                    title: {display: true, text: country}
                }}
            
            />

        ) : null
    )

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart }
        </div>
    )
}

export default Chart;