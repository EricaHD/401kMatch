import React from 'react';
import Typography from '@mui/material/Typography';
import styles from './styles/SectionTitle';

interface Props {
  title: string;
  marginTop: string;
  marginBottom: string;
}

const SectionTitle = ({ title, marginTop, marginBottom }: Props) => {
  return (
    <Typography variant="h4" sx={{ ...styles.title, marginTop, marginBottom }}>
      {title}
    </Typography>
  );
}

export default SectionTitle;
