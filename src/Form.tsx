import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

type formPropType = {
  requestID?: string
  files: File[]
  title: string
  description: string

  setTitle: (e: string) => void
  setDescription: (e: string) => void
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
    }
  }),
);

export default function Form(props: formPropType) {
  const classes = useStyles()
  
  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <span>
          Judul:
        </span> 
        <TextField 
          value={props.title}
          onChange={event => props.setTitle(event.target.value)}
          className={classes.textField} 
          variant={"outlined"} 
          placeholder="Masukkan judul dari request Anda"
        />
      </div>
      <div className={classes.row}>
        <span>
          Deskripsi:  
        </span>
        <TextField 
          onChange={event => props.setDescription(event.target.value)}
          multiline={true} 
          value={props.description}
          rows="4" 
          className={classes.textField} 
          variant={"outlined"} 
          placeholder="Masukkan deskripsi"
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input type="file" onChange={props.onFileChange}/>
        {props.files.map((importer, key) =>  <input key={key} type="file" onChange={props.onFileChange}/>)}
      </div>
    </div>
  )
}
