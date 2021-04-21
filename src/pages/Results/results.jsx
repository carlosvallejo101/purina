import React, { useState, useEffect } from 'react';
import './results.css';
import { useAuth } from '../../auth/useAuth.jsx';
import NumberFormat from 'react-number-format';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
// Icons
import EditIcon from '@material-ui/icons/EditOutlined';
import DoneIcon from '@material-ui/icons/DoneAllTwoTone';
import RevertIcon from '@material-ui/icons/NotInterestedOutlined';

import Wrapper from '../../components/Wrapper/wrapper.jsx';
import Home from '../Home/home.jsx';
import axios from 'axios';
import { backend } from '../../config';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  selectTableCell: {
    width: 60,
  },
  tableCell: {
    width: 130,
    height: 40,
  },
  input: {
    width: 130,
    height: 40,
  },
}));

const createData = ({ id, name, month1, month2, month3 }) => ({
  id: name.replace(' ', '_'),
  name,
  month1,
  month2,
  month3,
  total: month1 + month2 + month3,
  isEditMode: false,
});

const Results = () => {
  const { user } = useAuth();
  const classTitle = 'tabs__title';
  const classTitleActive = 'tabs__title tabs__title--active';
  const [currentTab, setCurrentTab] = useState('objetivos');

  const toggleTab = () => {
    switch (currentTab) {
      case 'objetivos':
        return <Objetivos />;
      case 'resultados':
        return <Resultados />;
      default:
        return null;
    }
  };
  return user ? (
    user.roles.includes('Admin') ? (
      <Wrapper>
        <div className="results">
          <h2 className="results__title">Cargar Resultados</h2>
          <div className="results__body">
            <div className="tabs">
              <div className="tabs__container">
                <h3
                  onClick={() => setCurrentTab('objetivos')}
                  className={
                    currentTab === 'objetivos' ? classTitleActive : classTitle
                  }
                >
                  Objetivos
                </h3>
                <h3
                  onClick={() => setCurrentTab('resultados')}
                  className={
                    currentTab === 'resultados' ? classTitleActive : classTitle
                  }
                >
                  Resultados
                </h3>
              </div>
              {toggleTab()}
            </div>
          </div>
        </div>
      </Wrapper>
    ) : (
      <Home />
    )
  ) : (
    <p>Cargando</p>
  );
};

const Objetivos = () => {
  const [rows, setRows] = React.useState([]);
  const [previous, setPrevious] = React.useState({});
  const classes = useStyles();

  useEffect(() => {
    async function getUsers() {
      const { data: users } = await axios.get(
        `${backend.url}/api/users/normal`
      );
      users.map((user) => {
        return setRows((prevState) => {
          return [
            ...prevState,
            createData({
              id: user._id,
              name: user.name,
              month1: user.objectivesNormalSupport[0].value,
              month2: user.objectivesNormalSupport[1].value,
              month3: user.objectivesNormalSupport[2].value,
            }),
          ];
        });
      });
    }
    getUsers();
  }, []);

  // console.log('rows', rows);

  const onToggleEditMode = (id) => {
    setRows((state) => {
      return rows.map((row) => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious((state) => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map((row) => {
      console.log('value', value);
      const newValue = value !== '' ? value : 0;
      let newTotal = 0;
      if (name === 'month1') {
        newTotal =
          parseInt(newValue.toString().replace(/\$|,/g, '')) +
          parseInt(row['month2'].toString().replace(/\$|,/g, '')) +
          parseInt(row['month3'].toString().replace(/\$|,/g, ''));
      }
      if (name === 'month2') {
        newTotal =
          parseInt(newValue.toString().replace(/\$|,/g, '')) +
          parseInt(row['month1'].toString().replace(/\$|,/g, '')) +
          parseInt(row['month3'].toString().replace(/\$|,/g, ''));
      }
      if (name === 'month3') {
        newTotal =
          parseInt(newValue.toString().replace(/\$|,/g, '')) +
          parseInt(row['month1'].toString().replace(/\$|,/g, '')) +
          parseInt(row['month2'].toString().replace(/\$|,/g, ''));
      }

      if (row.id === id) {
        return {
          ...row,
          [name]: value,
          total: newTotal,
        };
      }
      return row;
    });
    setRows(newRows);
  };

  const onRevert = (id) => {
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    setRows(newRows);
    setPrevious((state) => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell align="left" />
            <TableCell align="left">Usuario</TableCell>
            <TableCell align="left">Abril</TableCell>
            <TableCell align="left">Mayo</TableCell>
            <TableCell align="left">Junio</TableCell>
            <TableCell align="left">Objetivo Trimestral</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className={classes.selectTableCell}>
                {row.isEditMode ? (
                  <>
                    <IconButton
                      aria-label="done"
                      onClick={() => onToggleEditMode(row.id)}
                    >
                      <DoneIcon />
                    </IconButton>
                    <IconButton
                      aria-label="revert"
                      onClick={() => onRevert(row.id)}
                    >
                      <RevertIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    aria-label="delete"
                    onClick={() => onToggleEditMode(row.id)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
              <CustomTableCell {...{ row, name: 'name', onChange }} />
              <CustomTableCell {...{ row, name: 'month1', onChange }} />
              <CustomTableCell {...{ row, name: 'month2', onChange }} />
              <CustomTableCell {...{ row, name: 'month3', onChange }} />
              <CustomTableCell {...{ row, name: 'total', onChange }} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

const Resultados = () => {
  const [rows, setRows] = React.useState([
    createData('Usuario 1', 159, 0, 0, 6878, 789),
    createData('Usuario 2', 237, 0, 0, 3215, 789),
    createData('Usuario 3', 262, 0, 0, 5434, 789),
    createData('Usuario 4', 262, 0, 0, 9873, 789),
    createData('Usuario 5', 262, 0, 0, 3548, 789),
    createData('Usuario 6', 262, 0, 0, 9874, 789),
    createData('Usuario 7', 262, 0, 0, 3458, 789),
    createData('Usuario 8', 262, 0, 0, 9843, 789),
    createData('Usuario 9', 262, 0, 0, 8743, 789),
    createData('Usuario 10', 262, 0, 0, 9842, 789),
    createData('Usuario 11', 262, 0, 0, 4324, 789),
  ]);
  const [previous, setPrevious] = React.useState({});
  const classes = useStyles();

  const onToggleEditMode = (id) => {
    setRows((state) => {
      return rows.map((row) => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious((state) => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const onRevert = (id) => {
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    setRows(newRows);
    setPrevious((state) => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell align="left" />
            <TableCell align="left">Usuario</TableCell>
            <TableCell align="left">Abril</TableCell>
            <TableCell align="left">Mayo</TableCell>
            <TableCell align="left">Junio</TableCell>
            <TableCell align="left">Objetivo</TableCell>
            <TableCell align="left">Restante</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className={classes.selectTableCell}>
                {row.isEditMode ? (
                  <>
                    <IconButton
                      aria-label="done"
                      onClick={() => onToggleEditMode(row.id)}
                    >
                      <DoneIcon />
                    </IconButton>
                    <IconButton
                      aria-label="revert"
                      onClick={() => onRevert(row.id)}
                    >
                      <RevertIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    aria-label="delete"
                    onClick={() => onToggleEditMode(row.id)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
              <CustomTableCell {...{ row, name: 'name', onChange }} />
              <CustomTableCell {...{ row, name: 'calories', onChange }} />
              <CustomTableCell {...{ row, name: 'fat', onChange }} />
              <CustomTableCell {...{ row, name: 'carbs', onChange }} />
              <CustomTableCell {...{ row, name: 'protein', onChange }} />
              <CustomTableCell {...{ row, name: 'restante', onChange }} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

const CustomTableCell = ({ row, name, onChange }) => {
  const classes = useStyles();
  const { isEditMode } = row;
  let isAnEditableValue = true;
  // console.log('name', name);
  // console.log('row[name]', row[name]);
  if (name === 'name' || name === 'total') isAnEditableValue = false;
  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode && isAnEditableValue ? (
        <NumberFormat
          value={row[name]}
          thousandSeparator={true}
          prefix={'$ '}
          displayType={'input'}
          className={classes.input}
          name={name}
          onChange={(e) => onChange(e, row)}
          style={{ border: 'none', borderBottom: '1px solid #d8b414' }}
        />
      ) : name === 'name' ? (
        row[name]
      ) : (
        <NumberFormat
          value={row[name]}
          thousandSeparator={true}
          prefix={'$ '}
          displayType={'text'}
          name={name}
          onChange={(e) => onChange(e, row)}
          style={{ border: 'none' }}
        />
      )}
    </TableCell>
  );
};

export default Results;
