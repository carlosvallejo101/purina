import React from 'react';
import NumberFormat from 'react-number-format';

import ProgressBar from '../../../components/ProgressBar/ProgressBar.jsx';

const QuarterlyTable = ({ data, progressValue }) => {
  return (
    <>
      <div className="invoice-box">
        <table cellPadding={0} cellSpacing={0}>
          <thead>
            <tr className="item">
              <td>Tu objetivo trimestral: </td>
              <td>
                <NumberFormat
                  value={data.objective}
                  // value={1111}
                  thousandSeparator={true}
                  prefix={'$ '}
                  displayType={'text'}
                />
              </td>
            </tr>
            <tr className="item">
              <td>Resultado acumulado: </td>
              <td>
                <NumberFormat
                  value={data.total}
                  // value={2222}
                  thousandSeparator={true}
                  prefix={'$ '}
                  displayType={'text'}
                />
              </td>
            </tr>
            <tr className="item last">
              <td>Te falta: </td>
              <td>
                <NumberFormat
                  value={data.remaining}
                  // value={3333}
                  thousandSeparator={true}
                  prefix={'$ '}
                  displayType={'text'}
                />
              </td>
            </tr>
            <tr className="heading">
              <td>Mes</td>
              <td>Resultado</td>
            </tr>
            {data.resultsNormalSupport.map((result, index) => {
              let resultClassName = 'item';
              if (index === data.resultsNormalSupport.length - 1) {
                resultClassName = 'item last';
              }
              return (
                <tr className={resultClassName} key={index}>
                  <td>{result.month}</td>
                  <td>
                    <NumberFormat
                      value={result.value}
                      thousandSeparator={true}
                      prefix={'$ '}
                      displayType={'text'}
                    />
                  </td>
                </tr>
              );
            })}
          </thead>
        </table>
      </div>
      <ProgressBar value={progressValue} />
    </>
  );
};

export default QuarterlyTable;
