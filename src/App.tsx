import React from 'react';
import { Button, makeStyles, Theme, createStyles, CircularProgress } from '@material-ui/core';

import MaterialTable, { rowData } from './MaterialTable';
import Header from './Header'
import SimpleDialog from './Dialog';

import './App.css';

function createData(id: number, name: string, category: string, createDate: string, status: string, deadline: string) {
  return { id, name, category, createDate, status, deadline };
}

const rows: rowData[] = [
  createData(1, 'Minta yoghurt', "Reimbursement", "23 Jan 2019", "", "30 Jan 2019"),
  createData(2, 'Minta asset untuk event', "Content", "21 Jan 2019", "Accepted", "25 Jan 2019"),
  createData(3, 'Lorem ipsum dolor sit amet consectetur adipiscing elit', "Reimbursement", "20 Jan 2019", "Rejected", "30 Aug 2019"),
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex", 
      flexDirection: "row-reverse", 
      marginRight: "5%", 
      marginLeft: "5%"
    },
    button: {
      marginTop: theme.spacing(3),
      backgroundColor: "#ffaa1c"
    }
  }),
);

function App(props: any) {
  const [open, setOpen] = React.useState(false);
  const [loading] = React.useState(false)
  const [selectedRequest, setSelectedRequest] = React.useState(-1);

  function handleClickOpen(id: number) {
    setSelectedRequest(id)
    setOpen(true);
  };

  const classes = useStyles()

  return (
    <div className="App">
      <Header 
        email={props.email} 
        onLogout={props.onLogout}
      />
      {
        loading ? (
          <div className="main-container__loading">
            <CircularProgress size={50}/>
            <div>Please wait . . .</div>
          </div>
        ) : (
          <>
            <div className={classes.root}>
              <Button 
                className={classes.button} 
                variant="contained" 
                onClick={() => {setOpen(true); setSelectedRequest(-1)}}
              >
                Create a Request
              </Button>
            </div>
            <MaterialTable rows={rows} onRequestClicked={handleClickOpen}/>
            <SimpleDialog 
              // data={rows[selectedRequest]}
              selectedValue={selectedRequest} 
              open={open} 
              onClose={() => setOpen(false)} 
            />
          </>
        )
      }
    </div>
  );
}

export default App;
