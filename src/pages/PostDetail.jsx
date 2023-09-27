import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import "../index.css";
import { useGetPostDetailQuery } from "../services/postApi";
import { getAuthor } from "../services/author";
import CommentArea from "../components/CommentArea";

const PostDetail = () => {
  const { id } = useParams();
  const { data, isSuccess } = useGetPostDetailQuery(id);
  const [comments, setComments] = useState(data?.comments);

  const Post = () => {
    if (data && isSuccess) {
      setComments(data.comments);
      return (
        <div>
          <div className="post-detail-div">
            <div className="post-category">
              <p>{data.category}</p>
            </div>
            <div className="title-div">
              <p className="post-detail-title">{data.title}</p>
            </div>
            <div className="author-div">{getAuthor(data.author)}</div>
            <div className="post-image-div">
              <img className="post-detail-img" src={data.image}></img>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: data.content }}
              className="content-div"
            ></div>
          </div>
        </div>
      );
    }
  };

  const CommentSection = () => {
    if (data && isSuccess) {
      return (
        <div className="comment-section">
          <h2>Add a comment</h2>
          <CommentArea data={comments} setComments={setComments} />
        </div>
      );
    }
  };
  return (
    <div>
      <Layout>
        <div className="post-detail-div">
          <Post />
          <CommentSection />
        </div>
      </Layout>
    </div>
  );
};

export default PostDetail;

