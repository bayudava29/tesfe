import axios from "axios";

const ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT;

export const StorePosts = (payload) => {
  const data = payload;
  return new Promise((resolve, reject) => {
    axios
      .post(ENDPOINT + "article", {
        title: data.title,
        content: data.content,
        category: data.category,
        status: data.status,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const UpdatePosts = (payload) => {
  const data = payload;
  return new Promise((resolve, reject) => {
    axios
      .post(ENDPOINT + "article/" + data.id, {
        title: data.title,
        content: data.content,
        category: data.category,
        status: data.status,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const GetPosts = (payload) => {
  const data = payload;
  return new Promise((resolve, reject) => {
    axios
      .get(
        ENDPOINT + "article?filter[status]=" + data.status + "&sort=-created_at"
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const GetPostsPage = (payload) => {
  const data = payload;
  return new Promise((resolve, reject) => {
    axios
      .get(
        ENDPOINT +
          "article?filter[status]=" +
          data.status +
          "&sort=-created_at&page[size]=6&page[number]=" +
          data.pageNumber
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
