const {Router} = require("express")
const AboutUsController = require("../controllers/aboutus-controller")
const CatalogController = require("../controllers/catalog-controller")
const CategoryController = require("../controllers/category_controller")
const ContactUsController = require("../controllers/contactus-controller")
const HomeController = require("../controllers/home-controller")
const UserController = require("../controllers/user-controller")
const { uploadImageMultiple, resizeImageMultiple, uploadImageSingle, reszieImageSingle } = require("../helpers/upload-images")

const login = require("../middlewares/authenticate")

const router = Router()

router.get('/', (req,res) => {
    return res.json({code: 0, message: 'success', description: 'api endPoint product catalog apps'})
})


// ```AUTHENTICATION```
router.post('/sign-in', login)
router.post('/sign-up', UserController.addUser)


// ```USER```
router.post('/user-new', UserController.addUser)
router.get('/user-all', UserController.getAllUser)
router.get('/user-one', UserController.getOneUser)
router.patch('/user-update/:id', UserController.editUser)
router.delete('/user-delete/:id', UserController.deleteUser)


// ```HOME```
router.get('/article-get', HomeController.getOneArticle)
router.patch('/article-update', HomeController.editArticle)

router.get('/client-all', HomeController.getAllClient)
router.get('/client-one', HomeController.getOneClient)
router.post('/client-new', uploadImageSingle, reszieImageSingle, HomeController.addClient)
router.patch('/client-update/:id', uploadImageSingle, reszieImageSingle, HomeController.editClient)
router.delete('/client-delete/:id', HomeController.deleteClient)


// ```ABOUT US```
router.get('/aboutus-get', AboutUsController.getAboutUs)
router.patch('/aboutus-update', uploadImageMultiple, resizeImageMultiple, AboutUsController.editAboutUs)


// ```CONTACT US```
router.get('/contactus-get', ContactUsController.getContactUs)
router.patch('/contactus-update', ContactUsController.editContactUs)


// ```CATALOG```
router.get('/catalog-all', CatalogController.getAllCatalog)
router.get('/catalog-one', CatalogController.getCatalog)
router.post('/catalog-new', uploadImageMultiple, resizeImageMultiple, CatalogController.addCatalog)
router.patch('/catalog-update/:id', uploadImageMultiple, resizeImageMultiple, CatalogController.editCatalog)
router.delete('/catalog-delete/:id', CatalogController.deleteCatalog)


// ```CATEGORY```
router.get('/catalog-category-get', CatalogController.getAllCategories)

router.post('/catalog-category-new', CategoryController.addCategory)
router.get('/catalog-category-all', CategoryController.getAllCategory)
router.get('/catalog-category-one', CategoryController.getOneCategory)
router.patch('/catalog-category-update/:id', CategoryController.editCategory)
router.delete('/catalog-category-delete/:id', CategoryController.deleteCategory)

module.exports = router