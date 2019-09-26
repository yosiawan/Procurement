import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Button } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';

import Form from './Form';
import CommentBox from './CommentBox';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      
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
    buttonRow: {
      display: "flex",
      flexDirection: "row-reverse"
    },
    cancelButton: {
      marginRight: 10
    }
  }),
);

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;

  onClose: () => void;
}

const status = "Accepted"

export default function SimpleDialog(props: SimpleDialogProps) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;
  const [files, setNewFile] = useState<Array<File>>([])
  const [title, setTitle] = useState<string>("")
  const [comments, setComments] = useState<Array<{text: string, timestamp: string}>>([])
  const [description, setDescription] = useState<string>("")

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewFile([...files, event.target.files![0]])
  }

  function onCreateClicked() {
    console.log({ files, title, description })
  }

    if (selectedValue !== "new") {
      // fetch from ODOO
      setTitle("JUDUL DARI ODOO")
      setDescription("DESKRIPSI DARI ODOO")
      setComments([{ text: "Kemahalan", timestamp: "23 Sept 2019" }])
    }
  
  return (
    <Dialog
      className={classes.root} 
      onClose={onClose} 
      fullWidth={true}
      maxWidth="lg"
      open={open}
    >
      <DialogTitle className={classes[selectedValue === "new" ? "" : status]}>
        {selectedValue === "new" ? "Create Request": status}
      </DialogTitle>
      <DialogContent>
        <Form
          onFileChange={onFileChange}
          files={files}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
        />
        <div className={classes.buttonRow}>
          <Button onClick={onCreateClicked} variant="contained" color="primary">
            {/* TO DO: Show text based on modal type */}
            Create Request 
          </Button>
          <Button className={classes.cancelButton} onClick={() => onClose()}>
            Cancel
          </Button>
        </div>
        {selectedValue !== "new" && <CommentBox comments={comments} />}
      </DialogContent>
    </Dialog>
  );
}
