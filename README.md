# CSF calculadora do desmatamento

## API health-check
### Red flags
Esses são sinais de que a api pode não estar funcionando como deveria. Nesses casos a aplicação deve continuar funcionando e no pior dos casos utilizará uma cotação de dólar desatualizada.
- Na nota da cotação na página de resultados a fonte aparece como Currencybeacon (a api secundária) repetidos dias.
- Na nota de cotação aparece uma data com idade maior que 3 dias.

### Error logs
Em ambos os casos acima deverá haver uma arquivo chamado `failure.json` em CI-calculadora-desmatamento/api contendo a resposta da última falha encontrada pelo workflow fetch-And-Save que faz requisições semanais a api primária.