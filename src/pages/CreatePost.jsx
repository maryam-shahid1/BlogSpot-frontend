import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import { useState, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import { TextField } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useCreatePostMutation } from "../services/postApi";
import { Button } from "@mui/material";
import { getToken } from "../services/LocalStorageService";
import {
  storeDraft,
  getDraft,
  removeDraft,
} from "../services/LocalStorageService";
import "../index.css";
import Layout from "../components/Layout";
import { formats, modules } from "../constants/postArea";
import CustomToast from "../components/CustomToast";

const CreatePost = () => {
  const { access_token } = getToken();
  const [createPost] = useCreatePostMutation();

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const formRef = useRef();

  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const quill = editorRef.current.getEditor();
      quill.container.style.width = "800px";
      quill.options.resize = false;
    }
  }, []);

  const handleDraft = () => {
    const draft = {
      draftTitle: formRef.current.values.title,
      draftCategory: formRef.current.values.category,
      draftContent: text,
      draftImage: image + image.name,
    };
    storeDraft(draft);
    setMessage("Draft saved successfully.");
  };

  useEffect(() => {
    const { draftTitle, draftContent, draftCategory, draftImage } = getDraft();
    if (draftContent) setText(draftContent);
    if (draftImage) setImage(draftImage);
  }, []);

  return (
    <div>
      <Layout>
        <div className="create-post-container">
          <div>
            <h1>Create Post</h1>
          </div>
          <CustomToast message={message} severity={"success"}></CustomToast>

          <Formik
            initialValues={{
              title: localStorage.getItem("draftTitle") || "",
              category: localStorage.getItem("draftCategory") || "Technology",
            }}
            innerRef={formRef}
            validate={(values) => {
              const errors = {};
              if (!values.title) {
                errors.title = "Required";
              }
              return errors;
            }}
            onSubmit={async (
              values,
              { setSubmitting, resetForm, setFieldValue }
            ) => {
              const data = {
                title: values.title,
                content: text,
                category: values.category,
                status: "Approved",
              };

              let form_data = new FormData();
              if (image) {
                form_data.append("image", image, image.name);
              }

              form_data.append("title", values.title);
              form_data.append("content", text);
              form_data.append("category", values.category);
              form_data.append("status", "Approved");

              console.log("form_data:", form_data.title);
              for (var key of form_data.entries()) {
                console.log(key[0] + ", " + key[1]);
              }

              console.log(form_data);
              const res = await createPost({ access_token, post: form_data });
              console.log(res);

              setSubmitting(false);
              resetForm();
              setText("");
              removeDraft();
              setMessage("Post submitted successfully.");
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit} enctype="multipart/form-data">
                <div>
                  <div className="post-title-container">
                    <TextField
                      value={values.title}
                      name="title"
                      placeholder="Title"
                      onChange={handleChange}
                      sx={{ width: "800px" }}
                    />
                  </div>

                  {errors.title && touched.title && errors.title}
                  <div className="create-category">
                    <label className="create-category-label">Category:</label>
                    <Field as="select" name="category">
                      <option value="Technology">Technology</option>
                      <option value="Lifestyle">Lifestyle</option>
                      <option value="Food">Food</option>
                    </Field>
                  </div>
                  <div className="editor-container">
                    <ReactQuill
                      modules={modules}
                      formats={formats}
                      name="content"
                      ref={editorRef}
                      value={text} // Set the value from Formik
                      onChange={(content) => setText(content)}
                      className="quill"
                      placeholder="Share your story..."
                    />
                    {errors.content && touched.content && errors.content}
                  </div>
                </div>

                <div>
                  <Button></Button>
                  <input
                    type="file"
                    id="image"
                    accept="image/png, image/jpeg"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                    required
                  />

                  <Button
                    sx={{
                      marginTop: "30px",
                      marginBottom: "70px",
                      marginRight: "30px",
                      marginLeft: "220px",
                      backgroundColor: "grey",
                    }}
                    disabled={isSubmitting}
                    variant="contained"
                    onClick={handleDraft}
                  >
                    Save as Draft
                  </Button>
                  <Button
                    sx={{
                      marginTop: "30px",
                      marginBottom: "70px",
                      backgroundColor: "black",
                    }}
                    type="submit"
                    disabled={isSubmitting}
                    variant="contained"
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Layout>
    </div>
  );
};

export default CreatePost;

