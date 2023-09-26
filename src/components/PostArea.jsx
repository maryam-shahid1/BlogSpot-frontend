import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats } from "../constants/postArea";

const PostArea = () => {
  const [text, setText] = useState("");
  const handleChange = (value) => {
    setText(value);
  };

  return (
    <div>
      <ReactQuill
        value={text}
        modules={modules}
        formats={formats}
        onChange={handleChange}
      />
    </div>
  );
};

export default PostArea;

