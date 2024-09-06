import * as React from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from '@mui/material/ToggleButtonGroup';
import { currencies } from '../context/provider';

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

export default function CurrencyToggle({ onCurrencyChange, currency }) {
  // const { currency } = useCurrency();
  const [currentCurrency, setCurrentCurrency] = React.useState(currency === currencies.real ? 'real' : 'dollar');

  const handleToggleCurrency = (event) => {
    if (currentCurrency === 'real') {
      setCurrentCurrency('dollar');
    } else {
      setCurrentCurrency('real');
    }

    onCurrencyChange();
  };

  return (
    <>
      <label className='themeSwitcherThree relative inline-flex cursor-pointer select-none items-center'>
        <input
          type='checkbox'
          checked={currentCurrency === 'real'}
          onChange={handleToggleCurrency}
          className='sr-only'
        />
        <div className='shadow-card flex gap-1 h-[46px] w-[90px] items-center justify-center rounded-md bg-white'>
          <span
            className={`flex h-10 w-10 items-center justify-center rounded ${
              currentCurrency === 'real' ? 'bg-[#6AA65B] text-white' : 'text-body-color'
            }`}
          >
            R$
          </span>
          <span
            className={`flex h-10 w-10 items-center justify-center rounded ${
              currentCurrency === 'dollar' ? 'bg-[#6AA65B] text-white' : 'text-body-color'
            }`}
          >
            US$
          </span>
        </div>
      </label>
    </>
  )

  // return (
  //   <div>
  //     <Paper
  //       elevation={0}
  //       sx={{
  //         display: 'flex',
  //         border: (theme) => `1px solid ${theme.palette.divider}`,
  //         flexWrap: 'wrap',
  //         width: 'fit-content',
  //         backgroundColor: '#0A0F0F',
  //         border: '1px solid rgba(255, 255, 255, 0.5)',
  //       }}
  //     >
  //       <StyledToggleButtonGroup
  //         size="small"
  //         value={currentCurrency}
  //         exclusive
  //         onChange={handleToggleCurrency}
  //         aria-label="Moeda: Real"
          
  //       >
  //         <ToggleButton value="real" aria-label="Real">
  //           <span className='text-center font-bold text-xl'>{currencies.real}</span>
  //         </ToggleButton>
  //       </StyledToggleButtonGroup>
  //       <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1, border: '1px solid rgba(255, 255, 255, 0.3)' }} />
  //       <StyledToggleButtonGroup
  //         size="small"
  //         value={currentCurrency}
  //         exclusive
  //         onChange={handleToggleCurrency}
  //         aria-label="Currency: United States dollar"
  //       >
  //         <ToggleButton value="dollar" aria-label="Dollar">
  //           <span className='text-center font-bold text-xl'>{currencies.dollar}</span>
  //         </ToggleButton>
  //       </StyledToggleButtonGroup>
  //     </Paper>
  //   </div>
  // );
}
