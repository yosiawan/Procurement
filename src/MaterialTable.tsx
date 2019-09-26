import React from 'react';
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
    button: {
      margin: theme.spacing(1),
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

function createData(id: string, name: string, category: string, createDate: string, status: string, deadline: string) {
  return { id, name, category, createDate, status, deadline };
}

const rows: any[] = [
  createData("1", 'Minta yoghurt', "Reimbursement", "23 Jan 2019", "-", "30 Jan 2019"),
  createData("2", 'Minta asset untuk event', "Content", "21 Jan 2019", "On-progress", "25 Jan 2019"),
  createData("3", 'Lorem ipsum dolor sit amet consectetur adipiscing elit', "Reimbursement", "20 Jan 2019", "On-Progress", "30 Aug 2019"),
];

const headerDatas = [
  "Nama Request", 
  "Kategori", 
  "Tanggal", 
  "Status", 
  "Request Deadline",
  ""
]

type materialTableProps = {
  onRequestClicked: (id: string) => void
}

export default function MaterialTable(props: materialTableProps) {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {headerDatas.map((headerData, key) => <TableCell key={key} align="center" >{headerData}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              rows.length > 0 ? 
              (rows.map((row, key) => (
                <TableRow key={key}>
                  <TableCell align="center" component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center" >{row.category}</TableCell>
                  <TableCell align="center" >{row.createDate}</TableCell>
                  <TableCell align="center" >{row.status}</TableCell>
                  <TableCell align="center" >{row.deadline}</TableCell>
                  <TableCell align="center" >
                    <Button variant="contained" className={classes.button} onClick={() => props.onRequestClicked(row.id)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))) : (
                <TableRow className={classes.noRequest}>
                  <TableCell/>
                  <TableCell/>
                  <TableCell align="center">
                    Anda belum memiliki request
                  </TableCell>
                  <TableCell/>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}
