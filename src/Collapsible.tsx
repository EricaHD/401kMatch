import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import styles from './styles/Collapsible';

interface Props {
  title: string;
  body: React.ReactNode;
}

const Collapsible = ({ title, body }: Props) => {
  return (
    <Accordion sx={styles.accordian}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {body}
      </AccordionDetails>
    </Accordion>
  );
}

export default Collapsible;
