const express = require('express');

const { check } = require('express-validator')
const router = express.Router();

const MangaController = require('../controllers/Manga');
const CategoryController = require('../controllers/Category');
const CommentController = require('../controllers/Comment');
const UserController = require('../controllers/Users');
const EpisodeController = require('../controllers/Episode');
const HistoryController = require('../controllers/History');
// /admin/add-product => GET


router.get('/searcManga', MangaController.getSearchMangas);
router.get('/searchCategory', CategoryController.getSearchCategory);
router.get('/searcUser', UserController.getSearchUsers);
router.get('/searchComment', CommentController.getSearchComment); 
router.get('/searchHistory', HistoryController.getSearchHistory);


///////////////////////////////////////....Insert....////////////////////////////////////////////////////////

router.post('/insertManga', [
    check('name').trim().not().isEmpty().withMessage("Manga name is required"),
    check('writer').trim().not().isEmpty().withMessage("Manga writer is required"),
    check('year').isFloat({ gt: 0 }).withMessage("year than zero"),
    check('description').trim().not().isEmpty().withMessage("Manga description is required"),
    check('cover').trim().not().isEmpty().withMessage("Manga cover is required"),
    check('score').isFloat({ gt: 0 }).withMessage("score than zero"),
    check('view').isFloat({ gt: 0 }).withMessage("view than zero"),
    check('categories').isArray().not().withMessage("Manga categories is required")

], MangaController.postAddMangas);



router.post('/insertCategory', [

    check('name').trim().not().isEmpty().withMessage("Manga name is required")
    
],CategoryController.postAddCategory);


router.post('/insertComment', [

    check('manga_id').isFloat({ gt: 0 }).withMessage("Manga_id than zero"),
    check('user_id').isFloat({ gt: 0 }).withMessage("User_id than zero"),
    check('comment').trim().not().isEmpty().withMessage("Comment  is required"),
    check('date').trim().not().isEmpty().withMessage("Date  is required")
    
],CommentController.postAddComment);



router.post('/insertUser', [

    check('user_name').trim().not().isEmpty().withMessage("username  is required"),
    check('password').isFloat({ gt: 0 }).withMessage("Password than zero"),
    check('favorite').isArray().not().withMessage("Favorite is required"),
    check('history').isArray().not().withMessage("History is required")
    
],UserController.postAddUsers);

router.post('/insertEpisode', [

    check('manga_ep').isArray().not().withMessage("manga_ep is required"),
    check('manga_id').not().isEmpty().withMessage('manga_id is require')
    
],EpisodeController.postAddEpisode);


////////////////////////////////////////////....Update....//////////////////////////////////////////////////////////////

router.post('/updatemangas', 
[
    check('name').trim().not().isEmpty().withMessage("Manga name is required"),
    check('writer').trim().not().isEmpty().withMessage("Manga writer is required"),
    check('year').isFloat({ gt: 0 }).withMessage("year than zero"),
    check('description').trim().not().isEmpty().withMessage("Manga description is required"),
    check('cover').trim().not().isEmpty().withMessage("Manga cover is required"),
    check('score').isFloat({ gt: 0 }).withMessage("score than zero"),
    check('view').isFloat({ gt: 0 }).withMessage("view than zero"),
    check('categories').isArray().not().withMessage("Manga categories is required")
], MangaController.postUpdateMangas);


router.post('/updatecategory', 
[
    check('name').trim().not().isEmpty().withMessage("Manga name is required")
], CategoryController.postUpdateCategory);


router.post('/updatecomment', 
[
    check('Comment_id').not().isEmpty().withMessage("empty"),
    check('manga_id').not().isEmpty().withMessage("episode than zero"),
    check('user_id').not().isEmpty().withMessage("episode than zero"),
    check('comment').trim().not().isEmpty().withMessage("manga name is required"),
    check('date').trim().not().isEmpty().withMessage("Date  is required")
], CommentController.postUpdateComment);

router.post('/updateUser', [
    check('Users_id').not().isEmpty().withMessage("empty"),
    check('user_name').trim().not().isEmpty().withMessage("username  is required"),
    check('password').isFloat({ gt: 0 }).withMessage("Password than zero"),
    check('favorite').isFloat({ gt: 0 }).withMessage("favorite than zero"),
    check('history').isArray().not().withMessage("History is required")
    
],UserController.postUpdateUsers);

router.post('/updateEpisode', [

    check('manga_ep').isArray().not().withMessage("manga_ep is required"),
    check('manga_id').isFloat({ gt: 0 }).withMessage("Manga_id than zero")
    
],EpisodeController.postUpdateEpisode);


router.get('/delete/:Manga_id', MangaController.getDeleteMangas);
router.get('/delete/:Users_id', UserController.getDeleteUsers);
router.get('/deleteCategory/:Category_id', CategoryController.getDeleteCategory);
router.get('/deleteComment/:Comment_id', CommentController.getDeleteComment);
router.get('/delete/:Episode_id', EpisodeController.getDeleteEpisode);


router.get('/update/:Manga_id', MangaController.getUpdateMangas);
router.get('/update/:Users_id', UserController.getUpdateUsers);
router.get('/updateCategory/:Category_id', CategoryController.getUpdateCategory);
router.get('/updateComment/:Comment_id', CommentController.getUpdateComment);
router.get('/update/:Episode_id', EpisodeController.getUpdateEpisode);


router.post('/insertHistory', [
    check('user_id').not().isEmpty().withMessage('user_id is require'),
    check('history').not().isEmpty().withMessage('history is require')
], HistoryController.postAddHistory);


exports.routes = router;