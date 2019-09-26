import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },
    commentBox: {
      boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
      margin: "20px 0px",
      padding: 20,
    },
    comments: {
      borderBottom: "1px solid #ccc", 
      transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
      marginTop: 20,
      padding: 15,
      
    },
    timestamp: {
      fontSize: 8
    }
  }),
);

type CommentBoxPropType = {
  comments: {
    text: string
    timestamp: string
  }[]
}

export default function CommentBox(props: CommentBoxPropType) {
  const classes = useStyles()

  return (
    <div className={classes.commentBox}>
      <div>
        Comments:
      </div>
      {
        props.comments.map((comment, key) => {
          return (
            <div key={key} className={classes.comments}>
              <div>
                {comment.text}
              </div>
              <div className={classes.timestamp}>
                {comment.timestamp}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
