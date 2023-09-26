import React, { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useParams } from "react-router-dom";
import { Textarea } from "@mui/joy";
import { Button } from "@mui/material";
import { useCreateCommentMutation } from "../services/commentApi";
import { getToken } from "../services/LocalStorageService";
import { getAuthor } from "../services/author";
import { formatDate } from "../services/dateConversion";
import { Divider, Avatar, Grid, Paper } from "@mui/material";

const CommentArea = (props) => {
  const { id } = useParams();
  const [text, setText] = useState("");
  const { access_token } = getToken();
  const [createComment] = useCreateCommentMutation();
  const { id: userId } = useSelector((state) => state.user);

  let comments = props.data;
  const setComments = props.setComments;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const comment = {
      post: id,
      content: text,
      user: userId,
    };
    const res = await createComment({ comment, access_token });
    console.log(res);
    setText("");
    comments = [...comments, res.data];
    setComments(comments);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Textarea
          value={text}
          minRows={3}
          placeholder="Comment..."
          onChange={(e) => setText(e.target.value)}
          sx={{ width: "100%" }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "black",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          Send
        </Button>
      </form>
      <div className="comment-list">
        {comments.map((comment) => (
          <Paper
            sx={{
              paddingRight: "40px",
              paddingLeft: "40px",
            }}
          >
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar alt="Remy Sharp" />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 className="comment-user">{getAuthor(comment.user)}</h4>
                <p className="comment-text">{comment.content}</p>
                <p className="comment-date">{formatDate(comment.created_on)}</p>
              </Grid>
            </Grid>
            <Divider variant="fullWidth" sx={{ margin: "30px 0" }} />
          </Paper>
        ))}
      </div>
    </div>
  );
};

export default CommentArea;

