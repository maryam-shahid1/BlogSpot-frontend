import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetPostListQuery } from "../services/postApi";
import { useGetLoggedUserQuery } from "../services/userAuthApi";
import { setUserInfo } from "../features/userSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import PostList from "../components/PostList";
import Layout from "../components/Layout";
import Filter from "../components/Filter";
import "../index.css";

const Home = () => {
  const { access_token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { data, isSuccess } = useGetLoggedUserQuery(access_token);
  const [checkedItems, setCheckedItems] = useState({
    Technology: false,
    Food: false,
    Lifestyle: false,
  });

  const updateCheckedItems = (newCheckedItems) => {
    setCheckedItems(newCheckedItems);
  };

  useEffect(() => {
    if (data && isSuccess) {
      dispatch(
        setUserInfo({
          id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          username: data.username,
          password: data.password,
        })
      );
    }
  }, [data, isSuccess]);

  return (
    <div>
      <Layout>
        <div className="outer-div">
          <div className="inner-div">
            <h1>Blogs</h1>
            <p className="sub-text">See all posts we have ever written.</p>
            <Filter
              checkedItems={checkedItems}
              updateCheckedItems={updateCheckedItems}
            ></Filter>
            <PostList
              query={useGetPostListQuery}
              page={"home"}
              filter={checkedItems}
            />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;

