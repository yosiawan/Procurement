import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TextField, Select, Input, MenuItem, InputLabel, FormControl } from '@material-ui/core';

type formPropType = {
  requestID: number
  files: File[]
  title: string
  type: string
  status: "Accepted" | "Rejected" | ""
  description: string

  setType: (e: any) => void
  setTitle: (val: string) => void
  setDescription: (val: string) => void
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 20,
      minWidth: "50%"
    },
    textField: {
      width: "60%"
    },
    Rejected: {
      color: "red",
      textAlign: "center"
    },
    Accepted: {
      color: "green",
      textAlign: "center"
    },
    "": {
      color: "black",
      textAlign: "center"
    },
  }),
);

export default function Form(props: formPropType) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {
        props.requestID >= 0 ? (
          <div className={classes.row}>
            <span>
              Status:
            </span>
            <div className={classes.textField}>
              <span className={classes[props.status]}>{props.status === "" ? "-" : props.status}</span>
            </div>
          </div>
        ) : null
      }
      <div className={classes.row}>
        <span>
          Request Type:<span style={{ color: "red" }}>*</span>
        </span>
          <FormControl className={classes.textField}>
            <InputLabel htmlFor="type">Select your request type</InputLabel>
            <Select
              inputProps={{ id: "type" }}
              value={props.type}
              variant={"outlined"}
              className={classes.textField}
              onChange={event => props.setType(event.target.value)}
              input={<Input style={{ width: "100%" }} name="circle" id="circle" />}
              >
              <MenuItem value="" disabled>
                <em>Select your request type</em>
              </MenuItem>
              <MenuItem value={"Finance"}>Finance</MenuItem>
              <MenuItem value={"Reimbursement"}>Reimbursement</MenuItem>
              <MenuItem value={"Marketing"}>Marketing</MenuItem>
            </Select>
          </FormControl>
      </div>
      <div className={classes.row}>
        <span>
          Title:<span style={{ color: "red" }}>*</span>
        </span> 
        <TextField 
          value={props.title}
          onChange={event => props.setTitle(event.target.value)}
          className={classes.textField} 
          variant={"outlined"} 
          placeholder="Enter request title"
        />
      </div>
      <div className={classes.row}>
        <span>
          Description: <span style={{ color: "red" }}>*</span>
        </span>
        <TextField 
          onChange={event => props.setDescription(event.target.value)}
          multiline={true} 
          value={props.description}
          rows="4" 
          className={classes.textField} 
          variant={"outlined"} 
          placeholder="Enter request description"
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input style={{ fontSize: 14 }} type="file" onChange={props.onFileChange}/>
        {props.files.map((importer, key) =>  <input style={{ fontSize: 14 }} key={key} type="file" onChange={props.onFileChange}/>)}
      </div>
    </div>
  )
}
