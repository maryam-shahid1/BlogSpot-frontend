const storeToken = (value) => {
  if (value) {
    const { access, refresh } = value;
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
  }
};

const getToken = () => {
  let access_token = localStorage.getItem("access_token");
  let refresh_token = localStorage.getItem("refresh_token");
  return { access_token, refresh_token };
};

const removeToken = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

const storeDraft = (value) => {
  if (value) {
    const { draftTitle, draftCategory, draftContent, draftImage } = value;
    localStorage.setItem("draftTitle", draftTitle);
    localStorage.setItem("draftCategory", draftCategory);
    localStorage.setItem("draftContent", draftContent);
    localStorage.setItem("draftImage", draftImage);
  }
};

const getDraft = () => {
  const draftTitle = localStorage.getItem("draftTitle");
  const draftContent = localStorage.getItem("draftContent");
  const draftCategory = localStorage.getItem("draftCategory");
  const draftImage = localStorage.getItem("draftImage");
  return { draftTitle, draftCategory, draftContent, draftImage };
};

const removeDraft = () => {
  localStorage.removeItem("draftTitle");
  localStorage.removeItem("draftContent");
  localStorage.removeItem("draftCategory");
  localStorage.removeItem("draftImage");
};

export { storeToken, getToken, removeToken, storeDraft, getDraft, removeDraft };

