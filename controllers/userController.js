import passport from 'passport';
import routes from "../routes";
import User from '../models/User';

export const getJoin = (req, res) => {
    res.render("join", {pageTitle: 'Join'});

}
export const postJoin = async (req, res, next) => {
    const{
        body: { name, email, password, password2}
    } = req;
    if(password !== password2){
        res.status(400);
        res.render("join", {pageTitle: 'Join'});
    }else{
       try{
        const user = await User({ //생성,db 저장
            name, 
            email
        })
        await User.register(user, password);
        next();
       }catch(error){
           console.log(error);
           res.redirect(routes.home)
       } 
    }
}


export const getLogin = (req, res) => res.render("login", {pageTitle: 'Login'});

export const postLogin = passport.authenticate('local', {
    failureRedirect: routes.login,
    successRedirect: routes.home
})

export const githubLogin = passport.authenticate('github')

export const githubLoginCallback = async (_, __, profile, cb) => {
    //필요없는 인자는 _ , __ 이런식으로 자리만 남겨둔다
    const { _json: { id, avatar_url: avatarUrl, name, email} } = profile;  //profile안에 있는 정보들을 받아올거야
    try{
        const user = await User.findOne({email}); //email: email 같을 경우
        if(user){
            user.githubId = id;
            //user.avataUrl =avatar_url;
            //user.name=name;
            user.save();
            return cb(null, user);  //(에러, 유저) : cb 기본 툴
            //가입된 유저라면 그 유저의 정보 업데이트
        }
        const newUser = await User.create({
            email,
            name,
            githubId: id,
            avataUrl   //model 셋팅해둔 이름: _json에서받아오는 정보
        })
        return cb(null, newUser);

    }catch(error){
        return cb(error)
    }
}
export const postGithubLogin = (req, res) => {
 res.redirect(routes.home);
}

export const facebookLogin = passport.authenticate('facebook');

export const facebookLoginCallback = (accessToken, refreshToken, profile, cb) => {
    console.log(accessToken, refreshToken, profile, cb);
}

export const postFacebookLogin = (req, res) => {
    res.redirect(route.home);
}

export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home);
}

export const users = (req, res) => res.render("users", {pageTitle: 'Users'});

export const getMe = (req, res) => {
    res.render("userDetail", {pageTitle: 'User Detail', user: req.user});
}
export const userDetail = async (req, res) => {
    const { params: {id}} =req;   //이상한 아이디가 포함된 디테일 페이지로 들어오면
    try{
        const user = await User.findById(id);
        res.render("userDetail", {pageTitle: 'User Detail', user});
    }catch(error){
        res.redirect(routes.home)
    }
}

export const editProfile = (req, res) => res.render("editProfile", {pageTitle: 'Edit Profile'});
export const changePassword = (req, res) => res.render("changePassword", {pageTitle: 'Change Password'});
