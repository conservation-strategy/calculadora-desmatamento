import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { IconCaretDownFilled, IconMinus, IconPlus } from "@tabler/icons-react";

const AccordionGuide = ({ summary, children, expanded = false, onChange = () => {}, isFirstItem = false, isLastItem = false }) => {
  return (
    <Accordion
      expanded={expanded}
      onChange={onChange}
      sx={{ 
        backgroundColor: 'transparent',
        letterSpacing: '0.025em', 
        color: '#F7EEEE', 
        '&.MuiAccordion-root': { 
          boxShadow: 'none', 
          borderTop: isFirstItem ? 'none' : '1px solid rgba(223, 223, 223, 0.7)',
          mb: isLastItem ? 3 : 0,
          borderBottom: isLastItem ? '1px solid rgba(223, 223, 223, 0.7)' : 'none',
          ...(isLastItem ? {borderBottomLeftRadius: 0} : {}),
          ...(isLastItem ? {borderBottomRightRadius: 0} : {}),
          borderBottomRightRadius: 0,
          p: 1,
          px: 0  
        }, 
        '&.MuiAccordion-root .MuiAccordionSummary-root': { px: 0}, 
        '&.MuiAccordion-root .MuiAccordionDetails-root': { px: 0}
      }}>
      <AccordionSummary
        expandIcon={expanded ? <IconMinus color="#F7EEEE" size={18} /> : <IconPlus color="#F7EEEE" size={18} />}
        aria-controls="panel2a-content"
        id="panel4a-header"
      >
        <span className="text-base font-semibold">{summary}</span>
      </AccordionSummary>
      <AccordionDetails>
          {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionGuide;