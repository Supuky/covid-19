import React from 'react';
import { Grid } from '@material-ui/core';
import CardComponent from './Card/Card';
import styles from './Cards.module.css';

const Info = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if (!confirmed) {
    return 'Loading...';
  }
  // Card.jsxにバケツリレー
  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <CardComponent
          className={styles.infected}
          cardTitle="感染者数"
          value={confirmed.value}
          lastUpdate={lastUpdate}
          cardSubtitle="新型コロナウイルスによる感染者数"
        />
        <CardComponent
          className={styles.recovered}
          cardTitle="回復者数"
          value={recovered.value}
          lastUpdate={lastUpdate}
          cardSubtitle="新型コロナウイルスからの回復者数"
        />
        <CardComponent
          className={styles.deaths}
          cardTitle="死者数"
          value={deaths.value}
          lastUpdate={lastUpdate}
          cardSubtitle="新型コロナウイルスによる死者数"
        />
      </Grid>
    </div>
  );
};

export default Info;