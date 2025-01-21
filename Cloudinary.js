const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
// const app = express();

cloudinary.config({ 
    cloud_name: 'dmzen4ixs', 
    api_key: '895829659922337', 
    api_secret: 'V7COhidZKuubDCJFLo0AghYZk5M' // Click 'View API Keys' above to copy your API secret
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'SocialMediaTask',
    resource_type: 'auto', 
  },
});

const parser = multer({ storage: storage });
module.exports=parser;

