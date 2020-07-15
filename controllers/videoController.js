import routes from "../routes";
import Video from "../models/Video"; //database 의 element가 아님! model 받아오기

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", {
    pageTitle: "Search",
    searchingBy: searchingBy,
    videos,
  });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }, //파일은 더이상 바디에서 받아오지않고 path로 받는다
  } = req;
  const newVideo = await Video.create({
    //Video.js 에 작성했던 내용대로
    fileUrl: path,
    title,
    description,
  });
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req; //==req.params.id
  try {
    const video = await Video.findById(id);
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    //존재하지않는 아이디 유알엘로 가면 홈으로 리다이렉트
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  //get  -  랜더링템플릿
  const {
    params: { id }, //어떤 비디오를 수정할 건지 알아야함.
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description }); //Video.js model과 같은 이름
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

//post 필요없음 get만 있으면 됨
export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Video.findOneAndRemove({ _id: id });
  } catch (error) {}
  res.redirect(routes.home); //에러가 있건없건 redirect 시킬 거라서 {} 에서 빼내옴
};
