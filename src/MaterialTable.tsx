import React, { useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '90%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
      margin: "auto"
    },
    headers: {
      fontSize: 14,
      borderBottom: "1px solid #ffaa1c"
    },
    button: {
      margin: theme.spacing(1),
      borderColor: "#ffaa1c"
    },
    table: {
      minWidth: 650,
    },
    dialog: {
      width: "80%"
    },
    noRequest: {
      textAlign: "center",
      padding: 10
    }
  }),
);

const headerDatas = [
  "Title", 
  "Type", 
  "Created at", 
  "Status", 
  "Request Deadline",
  ""
]

export type rowData = {
  id: number
  name: string
  status: string
  deadline: string
  category: string
  createDate: string
}

type materialTableProps = {
  rows: rowData[]

  onRequestClicked: (id: number) => void
}

export default function MaterialTable(props: materialTableProps) {
  const classes = useStyles();

  // async function fetchRequests() {
  //   let res = await fetch("http://127.0.0.1:5000/get_projects")
  //   if (res.ok) {
  //     let data = await res.json()
  //     console.log(data)
  //   }

  // }

  // useEffect(() => {
  //   fetchRequests()
  // }, [])

  return (
    <>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {headerDatas.map((headerData, key) => <TableCell className={classes.headers} key={key} align="center" >{headerData}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              props.rows.length > 0 ? 
              (props.rows.map((row, key) => (
                <TableRow key={key}>
                  <TableCell align="center" component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center" >{row.category}</TableCell>
                  <TableCell align="center" >{row.createDate}</TableCell>
                  <TableCell align="center" >{row.status === "" ? "---" : row.status}</TableCell>
                  <TableCell align="center" >{row.deadline}</TableCell>
                  <TableCell align="center" >
                    <Button variant="outlined" className={classes.button} onClick={() => props.onRequestClicked(row.id)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))) : (
                <TableRow className={classes.noRequest}>
                  <TableCell colSpan={6} align="center">
                    <img style={{ maxHeight: 400, maxWidth: 1000 }} src={require('./empty_placeholder_img.jpg')} alt="nothing to see, yet"/>
                    <div style={{ fontSize: 18, marginBottom: 10 }}>Oops, You haven't made any request yet!</div>
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}
