const multer = require("multer");
const sharp = require("sharp");
var fs = require('fs');
const { ApplicationError } = require("./error-handler");
require('dotenv').config()

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb("Please upload only images.", false);
	}
};

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter
});


//#region IMAGE SINGLE
const uploadFile = upload.single('image')

// Upload single image
const uploadImageSingle = async (req, res, next) => {
	uploadFile(req, res, err => {
		if (err instanceof multer.MulterError) {
            console.log(err)
			if (err.code === "LIMIT_UNEXPECTED_FILE") {
				return next(new ApplicationError(err.name + ' ' + err.message))
			}
		} else if (err) {
			console.log(err)
            return next(new ApplicationError(err))
		}

		next();
	});
};

const reszieImageSingle = async (req, res, next) => {
    try {
        if (!req.file) return next();
        
        var dir = './' + process.env.IMAGE_PATH;
        
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }

        const file = req.file
        const filename = file.originalname.replace(/\..+$/, "");
        const newFilename = `${filename}-${Date.now()}.png`;
        // const newFilename = `${Date.now()}.png`;
    
        await sharp(file.buffer)
            .toFile(`${process.env.IMAGE_PATH}/${newFilename}`);
        req.body.image = newFilename
    
        next();
    } catch (error) {
        return next(new ApplicationError(error.message))
    }
}
//#endregion



//#region IMAGE MULTIPLE
const uploadFiles = upload.array("images", 20);

const uploadImageMultiple = async (req, res, next) => {
	uploadFiles(req, res, err => {
		if (err instanceof multer.MulterError) {
            console.log(err)
			if (err.code === "LIMIT_UNEXPECTED_FILE") {
				return next(new ApplicationError(err.name + ' ' + err.message))
			}
		} else if (err) {
			console.log(err)
            return next(new ApplicationError(err))
		}

		next();
	});
};

const resizeImageMultiple = async (req, res, next) => {
    try {
        if (!req.files) return next();
    
        var dir = './' + process.env.IMAGE_PATH;
    
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
    
        req.body.images = [];
        await Promise.all(req.files.map(async file => {
            const filename = file.originalname.replace(/\..+$/, "");
            const newFilename = `${filename}-${Date.now()}.png`;
            // const newFilename = `${Date.now()}.png`;
    
            await sharp(file.buffer)
                .toFile(`${process.env.IMAGE_PATH}/${newFilename}`);
            req.body.images.push(newFilename);
        })
        );
    
        next();
    } catch (error) {
        return next(new ApplicationError(error.message))
    }
};
//#endregion



//#region CUSTOM FIELD
const customerFields = upload.fields([
    { name: 'ktp_var', maxCount: 1, maxSize: '1MB' }, 
    { name: 'spouse_ktp_var', maxCount: 1, maxSize: '1MB' },
    { name: 'kk_var', maxCount: 1, maxSize: '1MB' },
    { name: 'photos_var', maxCount: 1, maxSize: '1MB' },
    { name: 'spouse_photos_var', maxCount: 1, maxSize: '1MB' },
    { name: 'farmer_photos_var', maxCount: 1, maxSize: '1MB' },
    { name: 'house_photos_var', maxCount: 3, maxSize: '3'  },
    { name: 'other_doc_photos_var', maxCount: 5, maxSize: '5MB'  },
    { name: 'land_photos_var', maxCount: 5, maxSize: '5MB'  },
    { name: 'comodity_photo_var', maxCount: 5, maxSize: '5MB'  }
]
)
const uploadCustomerPhotos = async (req, res, next) => {
    try {
        customerFields(req, res, err => {
            if (err instanceof multer.MulterError) {
                console.log(err)
                if (err.code === "LIMIT_UNEXPECTED_FILE") {
                    return next(new ApplicationError(err.name + ' ' + err.message))
                }
            } else if (err) {
                console.log(err)
                return next(new ApplicationError(err))
            }
    
            next();
        });
        
    } catch (error) {
        return next(new ApplicationError(error.message))
    }
}

const resizeCustomerPhotos = async (req, res, next) => {
    try {
        if (req.files){
            var dir = './' + process.env.IMAGE_PATH + '/customer-pictures';
        
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir, { recursive: true });
            }
        
            // req.body.images = [];
            const files = req.files
            await Promise.all(Object.keys(files).map(async key => {
                const arrImages = []
                await Promise.all(files[key].map(async file => {
                    const filename = file.originalname.replace(/\..+$/, "");
                    const newFilename = `${req.body.user_id_int}-${filename.substring(filename.length-10,filename.length)}-${Date.now()}.png`;
                    // const newFilename = `${filename}-${Date.now()}.png`;
            
                    await sharp(file.buffer).toFile(`${process.env.IMAGE_PATH}/customer-pictures/${newFilename}`);
                    // req.body.images.push(newFilename);
                    arrImages.push(newFilename)
                    // req.body[key] = [...req.body[key], newFilename]
                }));
                req.body[key] = arrImages
            }))
        
            return next();
        }

        return next();
    } catch (error) {
        return next(new ApplicationError(error.message))
    }
};
//#endregion


const getResult = async (req, res) => {
	if (req.body.images?.length <= 0) {
		return res.send(`You must select at least 1 image.`);
	}

	const images = req.body.images
		.map(image => "" + image + "")
		.join("");

	return res.send(`Images were uploaded:${images}`);
};

module.exports = {
    uploadImageSingle,
    reszieImageSingle,
	uploadImageMultiple,
	resizeImageMultiple,
    uploadCustomerPhotos,
    resizeCustomerPhotos,
	getResult
};
