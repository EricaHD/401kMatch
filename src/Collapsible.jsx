import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import styles from './styles/Collapsible.ts';

export default function Collapsible({ title, body }) {
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
