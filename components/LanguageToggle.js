import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Language, PORTUGUES, ENGLISH } from "../context/provider";
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from '@mui/material/ToggleButtonGroup';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: theme.spacing(0.5),
    border: 0,
    borderRadius: theme.shape.borderRadius,
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: 0,
    },
    [`&.${toggleButtonGroupClasses.selected}`]: {
      color: 'white',
    },
    color: 'rgba(255, 255, 255, 0.5)',

  },
  [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
    {
      marginLeft: -1,
      borderLeft: '1px solid transparent',
    },
}));

export default function LanguageToggle({ onLanguageChange }) {
  const { language } = React.useContext(Language);
  const [currentLanguage, setCurrentLanguage] = React.useState(language === PORTUGUES ? 'portugues' : 'english');

  const handleToggleLanguage = (event) => {
    if (currentLanguage === 'portugues') {
      setCurrentLanguage('english');
      onLanguageChange(ENGLISH );
    } else {
      setCurrentLanguage('portugues');
      onLanguageChange(PORTUGUES);
    }
  };

  return (
    <div>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          flexWrap: 'wrap',
          width: 'fit-content',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
        }}
      >
        <StyledToggleButtonGroup
          size="small"
          value={currentLanguage}
          exclusive
          onChange={handleToggleLanguage}
          aria-label="Idioma: Português"
          
        >
          <ToggleButton value="portugues" aria-label="Portugues">
            <span className='text-center font-bold text-xl'>PT</span>
          </ToggleButton>
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1, border: '1px solid rgba(255, 255, 255, 0.3)' }} />
        <StyledToggleButtonGroup
          size="small"
          value={currentLanguage}
          exclusive
          onChange={handleToggleLanguage}
          aria-label="Language: English"
        >
          <ToggleButton value="english" aria-label="English">
            <span className='text-center font-bold text-xl'>EN</span>
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
    </div>
  );
}
