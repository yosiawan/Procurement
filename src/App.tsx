import React from 'react';
import { Button, makeStyles, Theme, createStyles } from '@material-ui/core';

import MaterialTable from './MaterialTable';
import Header from './Header'

import './App.css';
import SimpleDialog from './Dialog';

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
    }
  }),
);

function App() {
  const [open, setOpen] = React.useState(false);
  const [selectedRequest, setSelectedRequest] = React.useState("new");

  function handleClickOpen(id: string) {
    setSelectedRequest(id)
    setOpen(true);
  };

  const classes = useStyles()

  return (
    <div className="App">
      <Header 
        email="yosia@sirclo.co.id" 
        onLogout={() => null}
      />
      <div className={classes.root}>
        <Button 
          className={classes.button} 
          variant="contained" 
          color="primary"
          onClick={() => {setOpen(true); setSelectedRequest("new")}}
        >
          Create a Request
        </Button>
      </div>
      <MaterialTable onRequestClicked={handleClickOpen}/>
      <SimpleDialog 
        selectedValue={selectedRequest} 
        open={open} 
        onClose={() => setOpen(false)} 
      />
    </div>
  );
}

export default App;
