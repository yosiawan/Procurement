import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Button, CircularProgress, DialogContent } from '@material-ui/core';

import Form from './Form';
import CommentBox from './CommentBox';

import './App.css'
import { rowData } from './MaterialTable';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      
    },
    title: {
      textAlign: "center"
    },
    buttonRow: {
      display: "flex",
      flexDirection: "row-reverse"
    },
    cancelButton: {
      marginRight: 10
    }
  }),
);

type formData = {
  [key: string]: string
}

type dummydatatype = {
  dummyTitle: string
  dummyType: string
  dummyDescription: string
  dummyStatus: "Accepted" | "Rejected" | ""
}

const dummyData: dummydatatype[]= [
  {
    dummyTitle: 'Minta yoghurt',
    dummyType: "Reimbursement",
    dummyDescription: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
    dummyStatus: ""
  },
  {
    dummyTitle: 'Minta yoghurt',
    dummyType: "Reimbursement",
    dummyDescription: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
    dummyStatus: ""
  },
  {
    dummyTitle: 'Minta asset untuk event',
    dummyType: "Marketing",
    dummyDescription: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
    dummyStatus: "Accepted"
  },
  {
    dummyTitle: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    dummyType: "Reimbursement",
    dummyDescription: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
    dummyStatus: "Rejected"
  }
]

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: number;
  data?: formData

  onClose: () => void;
}

const comments: {text: string, timestamp: string}[][] = [
  [{text: "", timestamp: ""}],
  [{text: "", timestamp: ""}],
  [{text: "All good", timestamp: "23 Sept 2019"}],
  [{text: "Too expensive, find an alternative", timestamp: "22 Sept 2019"}]
]

const status = "Accepted"

export default function SimpleDialog(props: SimpleDialogProps) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;
  const [files, setNewFile] = useState<Array<File>>([])
  const [title, setTitle] = useState<string>("")
  // const [comments] = useState<Array<{text: string, timestamp: string}>>([])
  const [description, setDescription] = useState<string>("")
  const [type, setType] = useState<string>("")
  const [status, setStatus] = useState<"Accepted" | "Rejected" | "">("Accepted")
  const [loading] = useState(false)
  const reader = new FileReader()

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewFile([...files, event.target.files![0]])
  }

  async function onCreateClicked() {
    let dataForAttachmentCall = files.map(file => JSON.stringify({name: file.name, datas: reader.readAsText(file)}))

    console.log(dataForAttachmentCall)
    function createOptions(bodyProps: any): RequestInit {
      return ({
        body: bodyProps,
        method: "POST",
        headers: {
          "Content-type": "Application/json"
        }
      })
    }

    try {
      let resultAttachment = await fetch("http://127.0.0.1:5000/create_attachment", createOptions(dataForAttachmentCall[0]))
      if (resultAttachment.ok) {
        let id = (await resultAttachment.json()).attachment_id
        // let taskBody = JSON.stringify({ })
        // let resultTask = await fetch("http://127.0.0.1:5000/create_financial_request", createOptions(id))
        console.log(id)
      }
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (selectedValue > 0) {
      const { dummyTitle, dummyDescription, dummyStatus, dummyType} = dummyData[selectedValue]
      setTitle(dummyTitle)
      setDescription(dummyDescription)
      setStatus(dummyStatus)
      setType(dummyType)
      console.log(dummyData[selectedValue])
    }
  },[selectedValue])
  
  return (
    <Dialog
      className={classes.root} 
      onClose={onClose} 
      fullWidth={true}
      maxWidth="lg"
      open={open}
    >
      {
        loading ? (
          <div style={{ height: 300 }} className="main-container__loading">
            <CircularProgress size={50}/>
            <div>Please wait . . .</div>
          </div>
        ) : (
          <>
            <DialogTitle className={classes.title}>
              {selectedValue < 0 ? "Create Request": "Edit Request"}
            </DialogTitle>
            <DialogContent>
              <Form
                onFileChange={onFileChange}
                files={files}
                title={title}
                type={type}
                status={status}
                setType={setType}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                requestID={selectedValue}
              />
              <div className={classes.buttonRow}>
                <span style={{ fontSize: 10, marginBottom: 10 }}><span style={{ color: "red" }}>*</span> required fields</span>
              </div>
              <div className={classes.buttonRow}>
                <Button disabled={title.length < 1 || description.length < 1} style={{ backgroundColor: "#ffaa1c" }} onClick={onCreateClicked} variant="contained" color="primary">
                  {/* TO DO: Show text based on modal type */}
                  {selectedValue < 0 ? "Create Request " : "Update Request"}
                </Button>
                <Button className={classes.cancelButton} onClick={() => onClose()}>
                  Cancel
                </Button>
              </div>
              {selectedValue > 0 && <CommentBox comments={comments[selectedValue]} />}
            </DialogContent>
          </>
        )
      }
    </Dialog>
  );
}
