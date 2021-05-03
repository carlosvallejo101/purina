import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { formatNumber } from '../../../helpers/formatNumber';

import ProgressBar from '../../../components/ProgressBar/ProgressBar.jsx';

const MonthlyTable = ({ month, data }) => {
  const [progressMonthly, setProgressMonthly] = useState({
    objective: 0,
    total: 0,
    remaining: 0,
    progressValue: 0,
  });

  const updateMonthlyValues = () => {
    if (data) {
      const objective = data.objectivesNormalSupport[month].value;
      const total = data.resultsNormalSupport[month].value;
      const remaining = formatNumber(
        data.objectivesNormalSupport[month].value -
          data.resultsNormalSupport[month].value,
        0,
        null,
        2
      );
      const progressValue = formatNumber((total * 100) / objective, 0, 100);

      setProgressMonthly({
        objective,
        total,
        remaining,
        progressValue,
      });
    }
  };

  useEffect(() => {
    updateMonthlyValues();
    // eslint-disable-next-line
  }, [month]);

  return (
    <>
      <div className="invoice-box">
        <table cellPadding={0} cellSpacing={0}>
          <thead>
            <tr className="item">
              <td>
                {`Tu objetivo de ${data.objectivesNormalSupport[month].month}:`}
              </td>
              <td>
                <NumberFormat
                  value={progressMonthly.objective}
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
                  value={progressMonthly.total}
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
                  value={progressMonthly.remaining}
                  thousandSeparator={true}
                  prefix={'$ '}
                  displayType={'text'}
                />
              </td>
            </tr>
          </thead>
        </table>
      </div>
      <ProgressBar value={progressMonthly.progressValue} />
    </>
  );
};

export default MonthlyTable;
