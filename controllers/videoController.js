
import routes from "../routes"
import Video from '../models/Video'; //database 의 element가 아님! model 받아오기

export const home = async(req, res) =>{
    try{
        const videos = await Video.find({}); 
        res.render("home", {pageTitle: 'Home', videos});
    }catch(error){
        console.log(error);
        res.render("home", {pageTitle: 'Home', videos: [] });
    }

}

export const search = (req, res) => {
    //const searchingBy = req.query.term;
    const {query: { term: searchingBy }} = req;
    res.render("search", {pageTitle: 'Search', searchingBy: searchingBy, videos});
}

export const getUpload = (req, res) => res.render("upload", {pageTitle: 'Upload'});

export const postUpload = async(req, res) => {
    const {
        body: { title, description},
        file: { path }
    } = req;
    const newVideo = await Video.create({
        //Video.js 에 작성했던 내용대로
        fileUrl: path,
        title,
        description
    })
    res.redirect(routes.videoDetail(newVideo.id))
}

export const videoDetail = async(req, res) => {
    const {
        params: {id}
    }=req;  //==req.params.id
    const video=await Video.findById
    res.render("videoDetail", {pageTitle: 'Video Detail'});
}

export const editVideo = (req, res) => res.render("editVideo", {pageTitle: 'Edit Video'});

export const deleteVideo = (req, res) => res.render("deleteVideo", {pageTitle: 'Delete Video'});