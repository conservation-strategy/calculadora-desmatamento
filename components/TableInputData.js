import * as React from 'react';
import { useContext } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { formatCostNumber, formatCurrencyNoDecimals } from '../utils';
import { Language } from '../context/provider';

function createData(
  name,
  cost,
) {
  return { name, cost };
}

// to-do: deixar width da tabela responsivo
//        colocar os inputs na tabela (inputData ta dentro do obj data)
//          inputData={{ city: dadosMunicipio.Município, uf: dadosMunicipio.UF, ha: area, legal, restauracao, usoPosterior, app, recreacao, valoresMedios }}

export default function TableInputData({ data }) {
  console.log('[TableInputData] data', data);
  const { content } = useContext(Language);
  const { calculadora, results } = content;
  
  const rows = [
    ,
    {...(
      data.city && data.uf ? 
        { name: results.section_1.info_rectangle.city, value: `${data.city} / ${data.uf}` } :
        { name: results.section_1.info_rectangle.locatio, value: data.location }
    )},
    {name: calculadora.inputs.area, value: data.ha},
    {name: calculadora.inputs.app, value: data.app ? calculadora.inputs.true : calculadora.inputs.false},
    {name: calculadora.inputs.recreacao, value: data.recreacao ? calculadora.inputs.true : calculadora.inputs.false},
    {name: calculadora.inputs.uso_solo.title, value: data.usoPosterior},
    {name: calculadora.inputs.legalidade.title, value: data.legal ? calculadora.inputs.true : calculadora.inputs.false},
    {name: calculadora.inputs.restauracao.title, value: data.restauracao},
  ]

  // inputData =  { city, uf, ha, legal, restauracao, usoPosterior, app, recreacao, valoresMedios }
  
  return (
    <TableContainer component={Paper} elevation={0} sx={{ width: 'fit-content', borderRadius: '0px', border: '1px solid rgba(0, 0, 0, 0.3)' }}>
      {/* <Table sx={{ minWidth: 650 }}> */}
      <Table sx={{ width: '100%', '@media(min-width: 1080px)': { width: 800} }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ p: 3, fontSize: '1rem', fontWeight: 'bold', borderColor: 'rgba(0, 0, 0, 0.3)' }}>{calculadora.input_table.col1}</TableCell>
            <TableCell align="right" sx={{ p: 3, fontSize: '1em', fontWeight: 'bold', borderColor: 'rgba(0, 0, 0, 0.3)' }}>{calculadora.input_table.col2}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ p: 2.5, fontWeight: '500', fontSize: '0.8rem', '@media(min-width: 430px)': { fontSize: '1rem' }, borderColor: 'rgba(0, 0, 0, 0.3)' }}>
                {row.name}
              </TableCell>
              <TableCell align="right" sx={{ p: 2.5, textTransform: 'capitalize', whiteSpace: 'normal', fontSize: '0.8rem', '@media(min-width: 430px)': { fontSize: '1.1rem' }, borderColor: 'rgba(0, 0, 0, 0.3)' }}>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
