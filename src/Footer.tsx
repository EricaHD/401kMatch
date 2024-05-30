import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import SectionTitle from './SectionTitle';
import Collapsible from './Collapsible';
import styles from './styles/Footer';

const Footer = () => {
  const createBulletPoints = (bulletPointArray: string[]): React.ReactNode => {
    return (
      <List sx={styles.bulletList}>
        {bulletPointArray.map((bulletPoint, idx) => (
          <ListItem sx={styles.listItem} key={idx}>
            <Typography variant="body1">{bulletPoint}</Typography>
          </ListItem>
        ))}
      </List>
    );
  };

  const disclaimers = [
    'I am not a financial advisor; this is not financial advice.',
    'Certain values computed here could be off by 1¢ (depending on how different institutions handle fractions of a cent).',
  ];

  const fidelity = [
    'Fidelity only allows integer contribution percentages (as does this calculator).',
    'Fidelity will automatically cap 401k contributions at the yearly limit, but if you contributed to a different 401k account for another job this year, you are responsible for contributing the correct amount to this account.',
    "Fidelity's website doesn't update as soon as contributions are made, and the way it displays end of year contributions can be misleading. I recommend using payslips as a source of truth.",
  ];

  const dataPrivacy = (
    <Typography variant="body1">
      {
        "Depending on your browser settings, data you enter here can be saved in your browser's local storage. Data in a browser's local storage is not sent to the server. That means when you revisit this site, you may see data you entered previously, but the information is not recorded or viewable by me."
      }
    </Typography>
  );

  const feedback = (
    <Typography variant="body1">
      {'Yay! 🎉 Feel free to send me a message through our company Slack or '}
      <Link href="https://www.LinkedIn.com/in/EricaHD" target="_blank" rel="noreferrer">
        LinkedIn
      </Link>
      {'.'}
    </Typography>
  );

  return (
    <Box sx={styles.footerBackground}>
      <SectionTitle title={'Footnotes'} marginTop={'5px'} marginBottom={'25px'} />
      <Collapsible title={'Disclaimers!'} body={createBulletPoints(disclaimers)} />
      <Collapsible title={'Notes on Fidelity'} body={createBulletPoints(fidelity)} />
      <Collapsible title={'What happens to the data entered here?'} body={dataPrivacy} />
      <Collapsible title={'Have any feedback or feature requests?'} body={feedback} />
    </Box>
  );
};

export default Footer;
