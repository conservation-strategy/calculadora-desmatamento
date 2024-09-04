import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { formatCostNumber, formatCurrencyNoDecimals } from '../utils';

function createData(
  name,
  cost,
) {
  return { name, cost };
}

// to-do: deixar width da tabela responsivo
//        colocar os inputs na tabela (inputData ta dentro do obj data)
//          inputData={{ city: dadosMunicipio.Município, uf: dadosMunicipio.UF, ha: area, legal, restauracao, usoPosterior, app, recreacao, valoresMedios }}

export default function TableOutputData({ data, description }) {
  // console.log('table data',data)
  
  const rows = [
    createData(description.bioprospeccao, data.custosAmbientais.custoBiopros),
    createData(description.carbono, data.custosAmbientais.custoCarbono),
    createData(description.erosao, data.custosAmbientais.custoAssoreamento),
    createData(description.pmnm, data.custosAmbientais.custoMadeireiroOuNaoMadeireiro),
    // createData('Perda de produtos não-mdeireiros', data.custosAmbientais.custoNaoMadeireiro),
    createData(description.recreacao, data.custosAmbientais.custoRecreacao),
    createData(description.total_eco, data.custosAmbientais.total),
    createData(description.recuperacao, data.custosDeRecuperacao),
    // createData('Custo de oportunidade da pecuária', data.custoDeOportunidade),
    createData(description.total, data.custoTotal),
  ]

  // inputData =  { city, uf, ha, legal, restauracao, usoPosterior, app, recreacao, valoresMedios }
  
  return (
    <TableContainer component={Paper} elevation={0} sx={{ width: 'fit-content', borderRadius: '0px', border: '1px solid rgba(0, 0, 0, 0.3)' }}>
      {/* <Table sx={{ minWidth: 650 }}> */}
      <Table sx={{ width: '100%', '@media(min-width: 1080px)': { width: 800} }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ p: 3, fontSize: '1rem', fontWeight: 'bold', borderColor: 'rgba(0, 0, 0, 0.3)' }}>Descrição do custo</TableCell>
            <TableCell align="right" sx={{ p: 3, fontSize: '1em', fontWeight: 'bold', borderColor: 'rgba(0, 0, 0, 0.3)' }}>Valor</TableCell>
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
              <TableCell align="right" sx={{ p: 2.5, whiteSpace: 'nowrap', fontSize: '0.8rem', '@media(min-width: 430px)': { fontSize: '1.1rem' }, borderColor: 'rgba(0, 0, 0, 0.3)' }}>{formatCurrencyNoDecimals(row.cost)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
