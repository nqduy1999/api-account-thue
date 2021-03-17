const cloudinary = require('cloudinary').v2;
const fs = require('fs');
require("dotenv").config();

cloudinary.config ({
    cloud_name: process.env.CLOUD_NAME,
    api_key: "498791393421432",
    api_secret: process.env.CLOUD_API_SECRET
})
const uploadService = {
    uploadAvatar: async (req, res) =>{
        try {
          const file = req.files.file;
          cloudinary.uploader.upload(file.tempFilePath, {
              folder: 'avatar'
          }, async(err, result) => 
          { 
              if(err) {
                  console.log(err);
                  throw err
              }
              removeTmp(file.tempFilePath);
              res.json({url : result.url });
          }
        )
        } catch (err) {
            console.log(err);
            return res.status(500).json({msg: err.message});
        }
    }
}
module.exports = uploadService;

const removeTmp = (path) =>{
    fs.unlink(path, err => {
        if(err){
            throw err;
        }
    })
}