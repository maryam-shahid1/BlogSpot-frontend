import { useGetAuthorQuery } from "./postApi";

export const getAuthor = (id) => {
  const { data, isSuccess } = useGetAuthorQuery(id);
  let author = "";
  if (data && isSuccess) {
    let firstName = data.first_name;
    let lastName = data.last_name;
    author = firstName + " " + lastName;
    console.log(author);
  }
  return author;
};

