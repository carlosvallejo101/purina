import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import { getQuote } from '../../helpers/getQuote';
import './progressBar.css';
import { formatNumber } from '../../helpers/formatNumber';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 20,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#96D93B',
  },
}))(LinearProgress);

const ProgressBar = ({ value }) => {
  const formattedNumber = formatNumber(value, 0, 100);
  const quote = getQuote(formattedNumber);
  return (
    <div className="progress__bar">
      <p className="progress__quote">{quote}</p>
      <div className="progress__bar-container">
        <div>
          <BorderLinearProgress
            variant="determinate"
            value={formattedNumber}
            thickness={50}
          />
        </div>
        <p>{formattedNumber}%</p>
      </div>
    </div>
  );
};

export default ProgressBar;
