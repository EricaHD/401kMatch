import React from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import styles from './styles/App';

const App = () => {
  return (
    <div style={styles.titleBackgroundImage}>
      <Header />
      <Content />
      <Footer />
    </div>
  );
};

export default App;
