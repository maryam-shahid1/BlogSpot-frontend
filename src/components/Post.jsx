import { Link } from "react-router-dom";
import "../index.css";
import { getAuthor } from "../services/author";
import { Chip } from "@mui/material";
import { formatDate } from "../services/dateConversion";
import "../index.css";

export default function Post({ post, page }) {
  const Status = () => {
    if (page !== "profile") {
      return null;
    }

    const status = post.status;
    const colorMap = {
      Approved: "success",
      Pending: "warning",
      Draft: "info",
      Rejected: "error",
    };

    const color = colorMap[status];

    return (
      <Chip
        variant="outlined"
        sx={{ textTransform: "capitalize" }}
        color={color}
        size="small"
        label={status}
      />
    );
  };

  return (
    <div className="post-view-div">
      <Link to={`/post/${post.id}/`}>
        <div className="div-img">
          <img className="post-img"  src={post.image} />
        </div>
      </Link>

      <div className="text-container">
        <Link>
          <p className="post-category">{post.category}</p>

          <Status />
        </Link>
        <Link to={`post/${post.id}`}>
          <p className="post-title">{post.title}</p>
        </Link>
        <Link>
          <p className="post-details">
            {getAuthor(post.author)} &#8226; {formatDate(post.created_on)}
          </p>
        </Link>
      </div>
    </div>
  );
}
