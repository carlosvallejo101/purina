import React, { useState, useEffect } from 'react';
import './loadDealer.css';
import '../LoadNormal/loadNormal.css';
import { useAuth } from '../../../auth/useAuth.jsx';
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

import Home from '../../Home/home.jsx';
import axios from 'axios';
import { backend } from '../../../config';

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

const createData = ({
  id,
  name,
  purinaMonth1,
  purinaMonth2,
  purinaMonth3,
  ladrinaMonth1,
  ladrinaMonth2,
  ladrinaMonth3,
  gatsyMonth1,
  gatsyMonth2,
  gatsyMonth3,
}) => ({
  id,
  name,
  purinaMonth1,
  purinaMonth2,
  purinaMonth3,
  ladrinaMonth1,
  ladrinaMonth2,
  ladrinaMonth3,
  gatsyMonth1,
  gatsyMonth2,
  gatsyMonth3,
  total: 2,
  isEditMode: false,
});

const LoadDealer = () => {
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
      <div className="load-dealer">
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
        `${backend.url}/api/users/dealer`
      );
      users.map((user) => {
        return setRows((prevState) => {
          return [
            ...prevState,
            createData({
              id: user._id,
              name: user.name,
              purinaMonth1: user.objectivesDealer.purina[0].value,
              purinaMonth2: user.objectivesDealer.purina[1].value,
              purinaMonth3: user.objectivesDealer.purina[2].value,
              ladrinaMonth1: user.objectivesDealer.ladrina[0].value,
              ladrinaMonth2: user.objectivesDealer.ladrina[1].value,
              ladrinaMonth3: user.objectivesDealer.ladrina[2].value,
              gatsyMonth1: user.objectivesDealer.gatsy[0].value,
              gatsyMonth2: user.objectivesDealer.gatsy[1].value,
              gatsyMonth3: user.objectivesDealer.gatsy[2].value,
            }),
          ];
        });
      });
    }
    getUsers();
  }, []);

  const onToggleEditMode = async (id, isSaving = false, row = null) => {
    setRows((state) => {
      return rows.map((row) => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
    if (isSaving) {
      try {
        await axios.patch(`${backend.url}/api/users`, {
          id: row.id,
          purina: [
            {
              month: 'Abril',
              value: row[`purinaMonth1`].toString().replace(/\$|,/g, ''),
            },
          ],
          category: 'purina',
          type: 'objectives',
        });
        await axios.patch(`${backend.url}/api/users`, {
          id: row.id,
          purina: [
            {
              month: 'Mayo',
              value: row[`purinaMonth2`].toString().replace(/\$|,/g, ''),
            },
          ],
          category: 'purina',
          type: 'objectives',
        });
        await axios.patch(`${backend.url}/api/users`, {
          id: row.id,
          purina: [
            {
              month: 'Junio',
              value: row[`purinaMonth3`].toString().replace(/\$|,/g, ''),
            },
          ],
          category: 'purina',
          type: 'objectives',
        });
        await axios.patch(`${backend.url}/api/users`, {
          id: row.id,
          ladrina: [
            {
              month: 'Abril',
              value: row[`ladrinaMonth1`].toString().replace(/\$|,/g, ''),
            },
          ],
          category: 'ladrina',
          type: 'objectives',
        });
        await axios.patch(`${backend.url}/api/users`, {
          id: row.id,
          ladrina: [
            {
              month: 'Mayo',
              value: row[`ladrinaMonth2`].toString().replace(/\$|,/g, ''),
            },
          ],
          category: 'ladrina',
          type: 'objectives',
        });
        await axios.patch(`${backend.url}/api/users`, {
          id: row.id,
          ladrina: [
            {
              month: 'Junio',
              value: row[`ladrinaMonth3`].toString().replace(/\$|,/g, ''),
            },
          ],
          category: 'ladrina',
          type: 'objectives',
        });
        await axios.patch(`${backend.url}/api/users`, {
          id: row.id,
          gatsy: [
            {
              month: 'Abril',
              value: row[`gatsyMonth1`].toString().replace(/\$|,/g, ''),
            },
          ],
          category: 'gatsy',
          type: 'objectives',
        });
        await axios.patch(`${backend.url}/api/users`, {
          id: row.id,
          gatsy: [
            {
              month: 'Mayo',
              value: row[`gatsyMonth2`].toString().replace(/\$|,/g, ''),
            },
          ],
          category: 'gatsy',
          type: 'objectives',
        });
        await axios.patch(`${backend.url}/api/users`, {
          id: row.id,
          gatsy: [
            {
              month: 'Junio',
              value: row[`gatsyMonth3`].toString().replace(/\$|,/g, ''),
            },
          ],
          category: 'gatsy',
          type: 'objectives',
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious((state) => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map((row) => {
      const newValue = value !== '' ? value : 0;
      // let newTotal = 0;
      // if (name === 'month1') {
      //   newTotal =
      //     parseInt(newValue.toString().replace(/\$|,/g, '')) +
      //     parseInt(row['month2'].toString().replace(/\$|,/g, '')) +
      //     parseInt(row['month3'].toString().replace(/\$|,/g, ''));
      // }
      // if (name === 'month2') {
      //   newTotal =
      //     parseInt(newValue.toString().replace(/\$|,/g, '')) +
      //     parseInt(row['month1'].toString().replace(/\$|,/g, '')) +
      //     parseInt(row['month3'].toString().replace(/\$|,/g, ''));
      // }
      // if (name === 'month3') {
      //   newTotal =
      //     parseInt(newValue.toString().replace(/\$|,/g, '')) +
      //     parseInt(row['month1'].toString().replace(/\$|,/g, '')) +
      //     parseInt(row['month2'].toString().replace(/\$|,/g, ''));
      // }

      if (row.id === id) {
        return {
          ...row,
          [name]: value,
          // total: newTotal,
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
            <TableCell align="center" style={{ backgroundColor: '#e88585' }}>
              Ladrina <br /> Abril
            </TableCell>
            <TableCell align="center" style={{ backgroundColor: '#e88585' }}>
              Ladrina <br /> Mayo
            </TableCell>
            <TableCell align="center" style={{ backgroundColor: '#e88585' }}>
              Ladrina <br /> Junio
            </TableCell>
            <TableCell align="center" style={{ backgroundColor: '#a2ff91' }}>
              Purina <br /> Abril
            </TableCell>
            <TableCell align="center" style={{ backgroundColor: '#a2ff91' }}>
              Purina <br /> Mayo
            </TableCell>
            <TableCell align="center" style={{ backgroundColor: '#a2ff91' }}>
              Purina <br /> Junio
            </TableCell>
            <TableCell
              align="center"
              style={{ backgroundColor: 'rgb(145, 235, 255)' }}
            >
              Gatsy <br /> Abril
            </TableCell>
            <TableCell
              align="center"
              style={{ backgroundColor: 'rgb(145, 235, 255)' }}
            >
              Gatsy <br /> Mayo
            </TableCell>
            <TableCell
              align="center"
              style={{ backgroundColor: 'rgb(145, 235, 255)' }}
            >
              Gatsy <br /> Junio
            </TableCell>
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
                      onClick={() => onToggleEditMode(row.id, true, row)}
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
              <CustomTableCell {...{ row, name: 'purinaMonth1', onChange }} />
              <CustomTableCell {...{ row, name: 'purinaMonth2', onChange }} />
              <CustomTableCell {...{ row, name: 'purinaMonth3', onChange }} />
              <CustomTableCell {...{ row, name: 'ladrinaMonth1', onChange }} />
              <CustomTableCell {...{ row, name: 'ladrinaMonth2', onChange }} />
              <CustomTableCell {...{ row, name: 'ladrinaMonth3', onChange }} />
              <CustomTableCell {...{ row, name: 'gatsyMonth1', onChange }} />
              <CustomTableCell {...{ row, name: 'gatsyMonth2', onChange }} />
              <CustomTableCell {...{ row, name: 'gatsyMonth3', onChange }} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

const Resultados = () => {
  const [rows, setRows] = React.useState([]);
  const [previous, setPrevious] = React.useState({});
  const classes = useStyles();

  useEffect(() => {
    async function getUsers() {
      const { data: users } = await axios.get(
        `${backend.url}/api/users/dealer`
      );
      users.map((user) => {
        return setRows((prevState) => {
          return [
            ...prevState,
            createData({
              id: user._id,
              name: user.name,
              purinaMonth1: user.resultsDealer.purina[0].value,
              purinaMonth2: user.resultsDealer.purina[1].value,
              purinaMonth3: user.resultsDealer.purina[2].value,
              ladrinaMonth1: user.resultsDealer.ladrina[0].value,
              ladrinaMonth2: user.resultsDealer.ladrina[1].value,
              ladrinaMonth3: user.resultsDealer.ladrina[2].value,
              gatsyMonth1: user.resultsDealer.gatsy[0].value,
              gatsyMonth2: user.resultsDealer.gatsy[1].value,
              gatsyMonth3: user.resultsDealer.gatsy[2].value,
            }),
          ];
        });
      });
    }
    getUsers();
  }, []);

  const onToggleEditMode = async (id, isSaving = false, row = null) => {
    setRows((state) => {
      return rows.map((row) => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
    if (isSaving) {
      try {
        await axios.patch(`${backend.url}/api/users`, {
          id: row.id,
          purina: [
            {
              month: 'Abril',
              value: row[`purinaMonth1`].toString().replace(/\$|,/g, ''),
            },
          ],
          category: 'purina',
          type: 'results',
        });
        await axios.patch(`${backend.url}/api/users`, {
          id: row.id,
          purina: [
            {
              month: 'Mayo',
              value: row[`purinaMonth2`].toString().replace(/\$|,/g, ''),
            },
          ],
          category: 'purina',
          type: 'results',
        });
        await axios.patch(`${backend.url}/api/users`, {
          id: row.id,
          purina: [
            {
              month: 'Junio',
              value: row[`purinaMonth3`].toString().replace(/\$|,/g, ''),
            },
          ],
          category: 'purina',
          type: 'results',
        });
        await axios.patch(`${backend.url}/api/users`, {
          id: row.id,
          ladrina: [
            {
              month: 'Abril',
              value: row[`ladrinaMonth1`].toString().replace(/\$|,/g, ''),
            },
          ],
          category: 'ladrina',
          type: 'results',
        });
        await axios.patch(`${backend.url}/api/users`, {
          id: row.id,
          ladrina: [
            {
              month: 'Mayo',
              value: row[`ladrinaMonth2`].toString().replace(/\$|,/g, ''),
            },
          ],
          category: 'ladrina',
          type: 'results',
        });
        await axios.patch(`${backend.url}/api/users`, {
          id: row.id,
          ladrina: [
            {
              month: 'Junio',
              value: row[`ladrinaMonth3`].toString().replace(/\$|,/g, ''),
            },
          ],
          category: 'ladrina',
          type: 'results',
        });
        await axios.patch(`${backend.url}/api/users`, {
          id: row.id,
          gatsy: [
            {
              month: 'Abril',
              value: row[`gatsyMonth1`].toString().replace(/\$|,/g, ''),
            },
          ],
          category: 'gatsy',
          type: 'results',
        });
        await axios.patch(`${backend.url}/api/users`, {
          id: row.id,
          gatsy: [
            {
              month: 'Mayo',
              value: row[`gatsyMonth2`].toString().replace(/\$|,/g, ''),
            },
          ],
          category: 'gatsy',
          type: 'results',
        });
        await axios.patch(`${backend.url}/api/users`, {
          id: row.id,
          gatsy: [
            {
              month: 'Junio',
              value: row[`gatsyMonth3`].toString().replace(/\$|,/g, ''),
            },
          ],
          category: 'gatsy',
          type: 'results',
        });
      } catch (e) {
        console.log(e);
      }
    }
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
        return {
          ...row,
          [name]: value,
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
            <TableCell align="center" style={{ backgroundColor: '#e88585' }}>
              Ladrina <br /> Abril
            </TableCell>
            <TableCell align="center" style={{ backgroundColor: '#e88585' }}>
              Ladrina <br /> Mayo
            </TableCell>
            <TableCell align="center" style={{ backgroundColor: '#e88585' }}>
              Ladrina <br /> Junio
            </TableCell>
            <TableCell align="center" style={{ backgroundColor: '#a2ff91' }}>
              Purina <br /> Abril
            </TableCell>
            <TableCell align="center" style={{ backgroundColor: '#a2ff91' }}>
              Purina <br /> Mayo
            </TableCell>
            <TableCell align="center" style={{ backgroundColor: '#a2ff91' }}>
              Purina <br /> Junio
            </TableCell>
            <TableCell
              align="center"
              style={{ backgroundColor: 'rgb(145, 235, 255)' }}
            >
              Gatsy <br /> Abril
            </TableCell>
            <TableCell
              align="center"
              style={{ backgroundColor: 'rgb(145, 235, 255)' }}
            >
              Gatsy <br /> Mayo
            </TableCell>
            <TableCell
              align="center"
              style={{ backgroundColor: 'rgb(145, 235, 255)' }}
            >
              Gatsy <br /> Junio
            </TableCell>
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
                      onClick={() => onToggleEditMode(row.id, true, row)}
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
              <CustomTableCell {...{ row, name: 'purinaMonth1', onChange }} />
              <CustomTableCell {...{ row, name: 'purinaMonth2', onChange }} />
              <CustomTableCell {...{ row, name: 'purinaMonth3', onChange }} />
              <CustomTableCell {...{ row, name: 'ladrinaMonth1', onChange }} />
              <CustomTableCell {...{ row, name: 'ladrinaMonth2', onChange }} />
              <CustomTableCell {...{ row, name: 'ladrinaMonth3', onChange }} />
              <CustomTableCell {...{ row, name: 'gatsyMonth1', onChange }} />
              <CustomTableCell {...{ row, name: 'gatsyMonth2', onChange }} />
              <CustomTableCell {...{ row, name: 'gatsyMonth3', onChange }} />
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

export default LoadDealer;
