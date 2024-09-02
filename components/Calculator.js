"use client"

//import { useState } from "react"
import Head from "next/head"
import Button from "@mui/material/Button"
import { RiPlantFill } from "react-icons/ri/"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { 
  custoTotalAssoreamento, 
  custoTotalBioprospeccao, 
  custoTotalCarbono,
  custoTotalEspecies,
  custoTotalRecSuperficialComFrete,
  custoTotalRecreacao,
  custoTotalPMNM,
  getUFList,
  getMunicipioList,
  getDadosMediosMun
} from "../utils";
import dynamic from "next/dynamic";
import Graficos from "./Graficos";
import { Alert, CircularProgress } from "@mui/material";
import data from "../data/dados-municipio.json";
import Results from "./Results";
import { lucroPecuaria, lucroSoja } from "../utils/globals";
import { useContext } from "react";
import { Language, useQuotation } from "../context/provider"
import Header2 from "./Header2"

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff'
    },
    secondary: {
      main: '#5C8D4A'
    },
  },
});


export default function Calculate() {
  //fetched data
  const [listaUf, setListaUf] = useState([]);
  const [listaMunicipios, setListaMunicipios] = useState([]);
  const [dadosMunicipio, setDadosMunicipio] = useState();
  // form inputs
  const [uf, setUf] = useState('');  
  const [municipio, setMunicipio] = useState('');
  const [area, setArea] = useState('');
  const [restauracao, setRestauracao] = useState('');
  const [app, setApp] = useState('');
  // const [preservacao, setPreservacao] = useState('');
  const [peso, setPeso] = useState('');
  const [recreacao, setRecreacao] = useState('');
  const [legal, setLegal] = useState('');
  const [usoPosterior, setUsoPosterior] = useState('');
  const [valoresMedios, setValoresMedios] = useState('');
  // cost outputs
  const [custoAssoreamento, setCustoAssoreamento] = useState();
  const [custoBiopros, setCustoBiopros] = useState();
  const [custoCarbono,setCustoCarbono] = useState();
  // const [custoEspecies, setCustoEspecies] = useState();
  const [custoRecup, setCustoRecup] = useState();
  const [custoMadeireiro, setCustoMadeireiro] = useState();
  const [custoNaoMadeireiro, setCustoNaoMadeireiro] = useState();
  const [custoMadeireiroOuNaoMadeireiro, setCustoMadeireiroOuNaoMadeireiro] = useState();
  const [custoRecreacao, setCustoRecreacao] = useState();
  const [custoTotal, setCustoTotal] = useState();
  // feedback
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { content } = useContext(Language);
  const { calculadora } = content;
  const quotation = useQuotation();
  console.log('quotation', quotation);
  // console.log(calculadora)
  useEffect(() => {
    // const fetchListaUf = async () => {
    //   const response = await fetch('/api/getUFList');
    //   const data = await response.json();
    //   setListaUf(data);
    // }
    // fetchListaUf();
    setListaUf(getUFList(data));
  }, [])

  useEffect(() => {
    if(!uf) return
    // const fetchListaMunicipios = async() => {
    //   const response = await fetch(`/api/filterMunicipios?uf=${uf}`);
    //   const data = await response.json();
    //   setListaMunicipios(data);
    // }
    // fetchListaMunicipios();
    setListaMunicipios(getMunicipioList(data, uf));
  }, [uf]);
  // console.log(listaMunicipios)

  useEffect(() => {
    if(valoresMedios)
      setDadosMunicipio(getDadosMediosMun());
  }, [valoresMedios])
  
  
  useEffect(() => {
    if(!municipio) return
    // const fetchDadosMunicipio = async() => {
    //   const response = await fetch(`/api/getDadosMunicipio?municipio=${municipio}`);
    //   const data = await response.json();
    //   setDadosMunicipio(data);
    // }
    // fetchDadosMunicipio();
    setDadosMunicipio(data.find(entry => entry.Município === municipio));
  }, [municipio]);
  // console.log('dados municipio', dadosMunicipio);

  useEffect(() => {
    if(app !== '') {
      setPeso(
        app ? 3.8 : 1
      );
    }
  }, [app]);
  // console.log('peso', peso);

  useEffect(() => {
    if (custoTotal) {
      const resultsElement = document.getElementById('results');
      if (resultsElement) {
        const topPos = resultsElement.getBoundingClientRect().top + window.scrollY - 109; // 109 is the Navbar height; to-do: change this value when navbar becomes dynamic
        setTimeout(() => window.scrollTo({ top: topPos, behavior: 'smooth' }), 100);
      }
    }
  }, [custoTotal]);

  const handleChange = (variable, value) => { 
    // console.log(variable, value);
    switch(variable) {
      case 'uf':
        setUf(value);
        break
      case 'municipio':
        setMunicipio(value);
        break
      case 'area':
        // console.log('type', typeof value, value)
        if(typeof value !== 'number' || isNaN(value) ) {
          alert("Entre um valor numérico em hectares no campo 'Área'");
          return
        }
        setArea(value);
        break
      case 'restauração':
        setRestauracao(value);
        break
      case 'app':
        setApp(value)
        break;
      // case 'preservação':
      //   setPreservacao(value);
      //   break
      case 'recreação':
        setRecreacao(value);
        break
      case 'legal':
        setLegal(value);
        break
      case 'usoPosterior':
        setUsoPosterior(value);
        break
      case 'valoresMedios':
        setValoresMedios(value);
        break
    }
  }


  const handleCalculate = () => {
    // checa se todos os inputs são validos

    setIsLoading(true);
    let _custoTotalAssoreamento,
        _custoTotalBioPros,
        _custoTotalCarbono,
        // _custoTotalEspecies,
        _custoTotalMadeireiro,
        _custoTotalNaoMadeireiro,
        _custoTotalMadeireiroOuNaoMadeireiro,
        _custoTotalRecup,
        _custoTotalRecreacao;
    try {
      _custoTotalAssoreamento = custoTotalAssoreamento(area*peso,usoPosterior, legal, quotation.value);
      _custoTotalBioPros = custoTotalBioprospeccao(area*peso, usoPosterior, legal);
      _custoTotalCarbono = custoTotalCarbono(area*peso, dadosMunicipio?.Carbono, usoPosterior, legal, quotation.value);
      // _custoTotalEspecies = custoTotalEspecies(area*peso, densidadeDemograficaTeste, dadosMunicipio?.["Riqueza de espécies"], uf, quotation.value);
      [_custoTotalNaoMadeireiro, _custoTotalMadeireiro] = custoTotalPMNM(
        area*peso,
        dadosMunicipio?.Madeira_Rent,
        dadosMunicipio?.Castanha_Borracha_Rent,
        legal
      );
      _custoTotalMadeireiroOuNaoMadeireiro = (_custoTotalMadeireiro + _custoTotalNaoMadeireiro) / 2;
      _custoTotalRecup = legal ? 0 : custoTotalRecSuperficialComFrete(
        area,
        restauracao,
        dadosMunicipio?.Distancia_Desmat_Centro
      );
      _custoTotalRecreacao = recreacao ? custoTotalRecreacao(area*peso, dadosMunicipio.densidade_demografica, dadosMunicipio?.["Riqueza de espécies"], legal, quotation.value) : 0;
    } catch (error) {
      console.error('Erro ao calcular custos:', error);
      setHasError(true);
      setIsLoading(false);
      return;
    }
    
    setHasError(false);
    setCustoAssoreamento(
      _custoTotalAssoreamento      
    );
    setCustoBiopros(
      _custoTotalBioPros
    );
    setCustoCarbono(
      _custoTotalCarbono
    );
    // setCustoEspecies(
    //   _custoTotalEspecies
    // );
    setCustoMadeireiro(
      _custoTotalMadeireiro
    );
    setCustoNaoMadeireiro(
      _custoTotalNaoMadeireiro
    );
    setCustoMadeireiroOuNaoMadeireiro(
      _custoTotalMadeireiroOuNaoMadeireiro
    );
    setCustoRecup(
      _custoTotalRecup
    );
    setCustoRecreacao(
      _custoTotalRecreacao
    );
    // console.log('legal', legal)
    console.log(
      'custos calc',
      _custoTotalAssoreamento , 
       _custoTotalBioPros , 
        _custoTotalCarbono , 
        _custoTotalMadeireiro,
        _custoTotalNaoMadeireiro,
        _custoTotalMadeireiroOuNaoMadeireiro,
        _custoTotalRecup, 
        _custoTotalRecreacao
    )
    setCustoTotal(
      _custoTotalAssoreamento + 
      _custoTotalBioPros + 
      _custoTotalCarbono + 
      // _custoTotalMadeireiro +
      // _custoTotalNaoMadeireiro +
      _custoTotalMadeireiroOuNaoMadeireiro +
      _custoTotalRecup + 
      _custoTotalRecreacao
    );
    setIsLoading(false);
  }

  // console.log('app', app)
  // console.log('recreação', recreacao)
  // console.log('preservacao', preservacao)
  // console.log('legal', legal)
  // console.log('custoTotal', custoTotal);
  // console.log('usoPosterior', usoPosterior)
  // console.log('custos', custoAssoreamento, custoBiopros, custoCarbono, custoRecup, custoPMNM, custoRecreacao );

  return (
    <>
      <Head>
        <title>CSF</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="-mt-40">
        <Header2 title={"Calculadora"} image="images/header2_bg_1.png" bgPosition={'center'} />

        {/* <h1 className="flex text-2xl md:text-2xl font-bold p-10 px-8 border-b-8 border-black gap-4 items-center">
          <RiPlantFill />
          {calculadora.heading}
        </h1> */}
        <div className="w-full flex justify-center">
          <div className="max-w-screen-sm md:max-w-screen-2xl box-content w-full flex flex-col lg:flex-row h-auto mx-0 justify-between items-stretch pt-16 pb-16 max-[500px]:px-8 px-14">
            {/* <div className={`flex w-full md:w-2/3 pb-44 md:border-r-8 md:flex-grow border-black ${hasError ? 'pb-56' : 'pb-44'}`}> */}
            <div className={`flex flex-col w-full lg:w-1/2 md:flex-grow`}>      
              <h1 className={`font-bold gap-4 items-center`}>
                <span className="pl-5 border-l-[6px] border-neutral100 text-neutral100 text-2xl min-[375px]:text-[1.75rem] min-[430px]:text-3xl min-[375px]:eading-[2.5rem]">{calculadora.guia.heading}</span>
              </h1>
              {/* <h3 className="py-1 font-bold text-[1.4rem]">{calculadora.guia.heading}</h3> */}
              <div className="mb-0 text-xl prose px-8 py-4 max-[375px]:px-0">              
                <div className="text-white">
                  <Accordion sx={{ backgroundColor: 'transparent', color: '#ffffff','&.MuiAccordion-root': { boxShadow: 'none', p: 1, px: 0  }, '&.MuiAccordion-root .MuiAccordionSummary-root': { px: 0 }, '&.MuiAccordion-root .MuiAccordionDetails-root': { px: 0}  }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      sx={{ color: '#ffffff' }}
                    >
                      <span className="text-lg font-bold">{calculadora.guia.local.title}</span>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" component="div">
                        <span>{calculadora.guia.local.intro}</span>
                        <ul className="flex flex-col gap-1 my-4">
                          {calculadora.guia.local.list.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                        <span>{calculadora.guia.local.conclusion}</span>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion sx={{ backgroundColor: 'transparent', color: '#ffffff', '&.MuiAccordion-root': { boxShadow: 'none', borderTop: '1px solid rgba(0, 0, 0, 0.05)', p: 1, px: 0  }, '&.MuiAccordion-root .MuiAccordionSummary-root': { px: 0}, '&.MuiAccordion-root .MuiAccordionDetails-root': { px: 0}    }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <span className="text-base font-bold">{calculadora.guia.app.title}</span>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2">
                        {calculadora.guia.app.description[0]}
                        <br/>
                        <br/>
                        {calculadora.guia.app.description[1]}
                        <br/>
                        <br/>
                        <span className="leading-4"><small> Gasparinetti, P.; Burner, A.; Vilela, T (2017) Definição de níveis de equivalência ecológica para a lei de compensação florestal do DF segundo o método de experimento de escolha. Conservação Estratégica. Série Técnica- Edição 51.</small></span>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  {/* <Accordion sx={{ '&.MuiAccordion-root': { boxShadow: 'none', borderTop: '1px solid rgba(0, 0, 0, 0.05)', p: 1, px: 0  }, '&.MuiAccordion-root .MuiAccordionSummary-root': { px: 0}, '&.MuiAccordion-root .MuiAccordionDetails-root': { px: 0}    }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel3a-header"
                    >
                      <span className="text-base font-bold">{calculadora.guia.conservacao.title}</span>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2">
                        <span>{calculadora.guia.conservacao.description[0]}</span>
                        <br/>
                        <br/>
                        <span>{calculadora.guia.conservacao.description[1]}</span>
                      </Typography>
                    </AccordionDetails>
                  </Accordion> */}
                  <Accordion sx={{ backgroundColor: 'transparent', color: '#ffffff', '&.MuiAccordion-root': { boxShadow: 'none', borderTop: '1px solid rgba(0, 0, 0, 0.05)', p: 1, px: 0  }, '&.MuiAccordion-root .MuiAccordionSummary-root': { px: 0}, '&.MuiAccordion-root .MuiAccordionDetails-root': { px: 0}    }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel4a-header"
                    >
                      <span className="text-base font-bold">{calculadora.guia.recreacao.title}</span>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2">
                        <span>
                          {calculadora.guia.recreacao.description[0]}
                        </span>
                        <br/>
                        <br/>
                        <span>{calculadora.guia.recreacao.description[1]}</span>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion sx={{ backgroundColor: 'transparent', color: '#ffffff', '&.MuiAccordion-root': { boxShadow: 'none', borderTop: '1px solid rgba(0, 0, 0, 0.05)', p: 1, px: 0  }, '&.MuiAccordion-root .MuiAccordionSummary-root': { px: 0}, '&.MuiAccordion-root .MuiAccordionDetails-root': { px: 0}    }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel4a-header"
                    >
                      <span className="text-base font-bold">{calculadora.guia.legalidade.title}</span>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2">
                        <span>
                          {calculadora.guia.legalidade.description}
                        </span>
                        {/* <br/>
                        <br/>
                        <span>
                          {calculadora.guia.legalidade.description[1]}
                        </span> */}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion sx={{ backgroundColor: 'transparent', color: '#ffffff', '&.MuiAccordion-root': { boxShadow: 'none', borderTop: '1px solid rgba(0, 0, 0, 0.05)', p: 1 , px: 0 }, '&.MuiAccordion-root .MuiAccordionSummary-root': { px: 0}, '&.MuiAccordion-root .MuiAccordionDetails-root': { px: 0}    }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel5a-header"
                    >
                      <span className="text-base font-bold">{calculadora.guia.restauracao.title}</span>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2">
                        <span className="font-bold">{calculadora.guia.restauracao.name[0]}</span>
                        {calculadora.guia.restauracao.description[0]}
                          <br/>
                          <br/>
                        <span className="font-bold">{calculadora.guia.restauracao.name[1]}</span>
                        {calculadora.guia.restauracao.description[1]}
                        
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion sx={{ backgroundColor: 'transparent', color: '#ffffff', '&.MuiAccordion-root': { mb: 3, boxShadow: 'none', borderTop: '1px solid rgba(0, 0, 0, 0.05)', borderBottom: '1px solid rgba(0, 0, 0, 0.17)', p: 1, px: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }, '&.MuiAccordion-root .MuiAccordionSummary-root': { px: 0}, '&.MuiAccordion-root .MuiAccordionDetails-root': { px: 0}    }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel6a-header"
                    >
                      <span className="text-base font-bold">{calculadora.guia.uso.title}</span>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" component="div">
                        <span>{calculadora.guia.uso.description}</span>
                        <ol className="flex flex-col gap-1 mt-4">
                          {calculadora.guia.uso.list.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                          {/* <li>Estimar valores de danos ambientais para apoiar a definição de compensações e indenizações;</li>
                          <li>Estimar níveis eficientes de investimentos para planejamento e prevenção de impactos;</li>
                          <li>Estimar receitas potenciais que o Estado poderia ter com seus ativos florestais.</li> */}
                        </ol>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
                
              </div>
            </div>
            
            {/* inputs */}
            <div className="flex flex-col gap-1 w-full h-fit lg:w-1/2 mx-auto py-5 text-white bg-[#717171]">
              {/* <h3 className="px-8 font-bold text-[1.4rem]">{calculadora.heading}</h3> */}
              <div className="flex flex-col mx-8 my-4 gap-4">
                <ThemeProvider theme={theme} >
                <FormControl className="w-full" variant="standard">
                    <InputLabel id="" error={hasError && app === ''} sx={{ color: '#ffffff' }}>
                      {calculadora.inputs.valores_medios.title}
                    </InputLabel>
                    <Select
                      labelId=""
                      id=""
                      value={valoresMedios}
                      onChange={(event) => handleChange('valoresMedios', event.target.value)}
                      label="Retort"
                      color="primary"
                      // sx={{ backgroundColor: '#717171', color: '#ffffff'}}
                    >
                      <MenuItem  value={true}>{calculadora.inputs.valores_medios.values[0]}</MenuItem>
                      <MenuItem value={false}>{calculadora.inputs.valores_medios.values[1]}</MenuItem>
                    </Select>
                </FormControl>
                {(valoresMedios === false) && 
                <div className="flex grid-cols-2 gap-4 justify-between">
                  <FormControl className="w-full" variant="standard">
                    <InputLabel id="" color="primary" error={hasError && uf === ''} sx={{ color: '#ffffff'}}>
                      {calculadora.inputs.UF}
                    </InputLabel>
                    <Select
                      labelId=""
                      id=""
                      value={uf}
                      onChange={(event) => handleChange('uf', event.target.value)}
                      label="Estado"
                      color="primary"
                      disabled={!listaUf.length}
                    >
                      {listaUf.map((uf, i) => (
                        <MenuItem key={i} value={uf}>{uf}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl className="w-full" variant="standard" error={hasError && municipio === ''}>
                    <InputLabel id="" color="primary" sx={{ color: '#ffffff'}}>
                      {calculadora.inputs.mun}
                    </InputLabel>
                    <Select
                      labelId=""
                      id=""
                      value={municipio}
                      onChange={(event) => handleChange('municipio', event.target.value)}
                      label="Município"
                      color="primary"
                      disabled={!listaMunicipios.length}
                    >
                      {listaMunicipios.map((mun, i) => (
                        <MenuItem key={i} value={mun}>{mun}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>}
                <div className="grid grid-cols-2 max-[460px]:grid-cols-1 gap-4 justify-between">
                  <TextField
                    id="standard-basic"
                    label={calculadora.inputs.area}
                    variant="standard"
                    color="primary"
                    className="w-full"
                    onChange={(event) => handleChange('area', Number(event.target.value))}
                    error={hasError && !area}
                    sx={{ color: '#ffffff'}}
                  />
                  <FormControl className="w-full" variant="standard">
                    <InputLabel id="" color="primary" error={hasError && app === ''} sx={{ color: '#ffffff'}}>
                      {calculadora.inputs.app}
                    </InputLabel>
                    <Select
                      labelId=""
                      id=""
                      value={app}
                      onChange={(event) => handleChange('app', event.target.value)}
                      label="Retort"
                      color="primary"
                    >
                      <MenuItem value={true}>{calculadora.inputs.true}</MenuItem>
                      <MenuItem value={false}>{calculadora.inputs.false}</MenuItem>
                    </Select>
                  </FormControl>
                </div>              
                {/* <FormControl className="w-full" variant="standard">
                  <InputLabel id="" color="primary" error={hasError && preservacao === ''}>
                    Área prioritária para preservação
                  </InputLabel>
                  <Select
                    labelId=""
                    id=""
                    value={preservacao}
                    onChange={(event) => handleChange('preservação', event.target.value)}
                    label="Unit(s) of measurement"
                    color="primary"
                  >
                    <MenuItem value={true}>Sim</MenuItem>
                    <MenuItem value={false}>Não</MenuItem>
                  </Select>
                </FormControl> */}
                <FormControl className="w-full" variant="standard">
                  <InputLabel id="" color="primary" error={hasError && recreacao === ''} sx={{ color: '#ffffff'}}>
                    {calculadora.inputs.recreacao}
                  </InputLabel>
                  <Select
                    labelId=""
                    id=""
                    value={recreacao}
                    onChange={(event) => handleChange('recreação', event.target.value)}
                    label="Unit(s) of measurement"
                    color="primary"
                  >
                    <MenuItem value={true}>{calculadora.inputs.true}</MenuItem>
                    <MenuItem value={false}>{calculadora.inputs.false}</MenuItem>
                  </Select>
                </FormControl>
                <FormControl className="w-full" variant="standard">
                  <InputLabel id="" color="primary" error={hasError && recreacao === ''} sx={{ color: '#ffffff'}}>
                    {calculadora.inputs.uso_solo.title}
                  </InputLabel>
                  <Select
                    labelId=""
                    id=""
                    value={usoPosterior}
                    onChange={(event) => handleChange('usoPosterior', event.target.value)}
                    label="Unit(s) of measurement"
                    color="primary"
                  >
                    <MenuItem value={'pecuária'}>{calculadora.inputs.uso_solo.values[0]}</MenuItem>
                    <MenuItem value={'agricultura'}>{calculadora.inputs.uso_solo.values[1]}</MenuItem>
                  </Select>
                </FormControl>     
                <FormControl className="w-full" variant="standard">
                  <InputLabel id="" color="primary" error={hasError && legal === ''} sx={{ color: '#ffffff'}}>
                    {calculadora.inputs.legalidade.title}
                  </InputLabel>
                  <Select
                    labelId=""
                    id=""
                    value={legal}
                    onChange={(event) => handleChange('legal', event.target.value)}
                    label="Unit(s) of measurement"
                    color="primary"
                  >
                    <MenuItem value={true}>Legal</MenuItem>
                    <MenuItem value={false}>Ilegal</MenuItem>
                  </Select>
                </FormControl>
                {(legal === false) && <FormControl className="w-full" variant="standard">
                  <InputLabel id="" color="primary" error={hasError && (legal === false && restauracao === '')} sx={{ color: '#ffffff'}}>
                    {calculadora.inputs.restauracao.title}
                  </InputLabel>
                  <Select
                    labelId=""
                    id=""
                    value={restauracao}
                    onChange={(event) => handleChange('restauração', event.target.value)}
                    label="Unit(s) of measurement"
                    color="primary"
                  >
                    <MenuItem value={"natural"}>{calculadora.inputs.restauracao.values[0]}</MenuItem>
                    <MenuItem value={"direta"}>{calculadora.inputs.restauracao.values[1]}</MenuItem>
                  </Select>
                </FormControl>}
                </ThemeProvider>
                {/* <Button
                  sx={{
                    boxShadow: "sm",
                    fontWeight: "bold",
                    width: "100%",
                    padding: "16px",
                    marginY: "32px",
                    color: "#166534",
                    borderColor: "#4ade80",
                    "&:hover": {
                      borderColor: "#4ade80",
                      backgroundColor: "#22c55e",
                    },
                    backgroundColor: "#4ade80",
                    "&:hover:not(:disabled)": {
                      backgroundColor: "#22c55e",
                    },
                  }}
                  variant="outlined"
                  color="primary"
                  size="medium"
                  // href="/"
                  // target="_blank"
                  onClick={handleCalculate}
                >
                  Calculate
                </Button> */}
                <button
                  className={`w-full py-4 mt-8 rounded flex justify-center items-center font-bold text-[#FCF8F7] uppercase transition-all border border-[#6AA65B] bg-[#6AA65B] shadow-sm  ${isLoading ? 'bg-[#436A39] border-[#436A39] text-[#FCF8F7] cursor-default hover:bg-[#40615C] hover:border-[#40615C]' : 'hover:bg-[#40615C] hover:border-[#40615C] cursor-pointer'}`}
                  onClick={handleCalculate}
                  disabled={isLoading}
                >
                  {calculadora.button}
                  { 
                    isLoading && 
                    <CircularProgress size={16} color="inherit" sx={{ ml: 1 }}/>
                  }
                </button>
                {
                  hasError &&
                  <Alert severity="error" sx={{ mb: 1, '& .MuiAlert-icon': { marginTop: '1px' } }}>Todos os campos são obrigatórios. Por favor, preencha os campos vazios e depois tente novamente.</Alert>
                }
                {/* <Typography variant="subtitle2">Todos os campos são obrigatórios. Por favor, preencha os campos vazios antes de submeter o cálculo.</Typography> */}
              </div>
            </div>
          </div>
        </div>
        {
          custoTotal && 
          <Results 
            custos={{ 
              custoTotal: custoTotal,  
              custosDeRecuperacao: custoRecup, 
              custosAmbientais: {
                custoAssoreamento,
                custoBiopros,
                custoCarbono,
                custoMadeireiro,
                custoNaoMadeireiro,
                custoMadeireiroOuNaoMadeireiro,
                custoRecreacao,
                total: custoAssoreamento + custoBiopros + custoCarbono + (custoMadeireiro + custoNaoMadeireiro) / 2 + custoRecreacao
              },
              custoDeOportunidade: usoPosterior === 'agricultura' ? area*lucroSoja : usoPosterior === 'pecuária' ? area*lucroPecuaria : undefined
            }}
            // custos={ {
            //   custoTotal: 21951251,
            //   custosDeRecuperacao: 15354229,
            //   custosAmbientais: {
            //     custoAssoreamento: 1291008,
            //     custoBiopros: 102696,
            //     custoCarbono: 4587672,
            //     custoMadeireiro: 1000,
            //     custoNaoMadeireiro: 210671,
            //     custoMadeireiroOuNaoMadeireiro: 211671 / 2,
            //     custoRecreacao: 174304,
            //     total: 6597021
            //   },
            //   custoDeOportunidade: 1800000
            // } }
            inputData={{ city: dadosMunicipio.Município, uf: dadosMunicipio.UF, ha: area, legal, restauracao, usoPosterior, app, recreacao, valoresMedios }}
            // inputData={{ city: 'Pedra Branca do Amapari', uf: 'AP', ha: 90, legal: false, restauracao: 'direta', usoPosterior: 'agricultura', app: true, recreacao: true, valoresMedios: false }}
          />
          // <div id="graph" className="flex flex-col justify-center items-center">
          //    Testes (seção temporária)
          //   <DownloadPDFButton data={{ custoTotal: custoTotal }} />
          //   <div className="flex flex-col gap-4">
          //     <div className="flex gap-4">
          //       <h3>Custo Recuperação</h3>
          //       <p>{ new Intl.NumberFormat('br-BR', { style: 'currency', currency: 'BRL' }).format(custoRecup)}{' ('}{custoRecup}{')'}</p>
          //     </div>
          //     <div className="flex gap-4">
          //       <h3>Custo Bioprocessamento</h3>
          //       <p>{ new Intl.NumberFormat('br-BR', { style: 'currency', currency: 'BRL' }).format(custoBiopros)}{' ('}{custoBiopros}{')'}</p>
          //     </div>
          //     <div className="flex gap-4">
          //       <h3>Custo Carbono</h3>
          //       <p>{ new Intl.NumberFormat('br-BR', { style: 'currency', currency: 'BRL' }).format(custoCarbono)}{' ('}{custoCarbono}{')'}</p>
          //     </div>
          //     <div className="flex gap-4">
          //       <h3>Custo Erosão</h3>
          //       <p>{ new Intl.NumberFormat('br-BR', { style: 'currency', currency: 'BRL' }).format(custoAssoreamento)}{' ('}{custoAssoreamento}{')'}</p>
          //     </div>
          //     <div className="flex gap-4">
          //       <h3>Custo Madeireiro</h3>
          //       <p>{ new Intl.NumberFormat('br-BR', { style: 'currency', currency: 'BRL' }).format(custoMadeireiro)}{' ('}{custoMadeireiro}{')'}</p>
          //     </div>
          //     <div className="flex gap-4">
          //       <h3>Custo Não Madeireiro</h3>
          //       <p>{ new Intl.NumberFormat('br-BR', { style: 'currency', currency: 'BRL' }).format(custoNaoMadeireiro)}{' ('}{custoNaoMadeireiro}{')'}</p>
          //     </div>
          //     <div className="flex gap-4">
          //       <h3>Custo Recreação</h3>
          //       <p>{ new Intl.NumberFormat('br-BR', { style: 'currency', currency: 'BRL' }).format(custoRecreacao)}{' ('}{custoRecreacao}{')'}</p>
          //     </div>
          //     <div className="flex gap-4">
          //       <h3>Custo Total</h3>
          //       <p>{ new Intl.NumberFormat('br-BR', { style: 'currency', currency: 'BRL' }).format(custoTotal)}{' ('}{custoTotal}{')'}</p>
          //     </div>
          //   </div> 
          // </div>
        }
      </div>
    </>
  )
}
