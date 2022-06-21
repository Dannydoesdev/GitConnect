require("dotenv").config();
const cloudinary = require("cloudinary").v2;
// console.log(process.env.TOKEN);
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_KEY,
//   api_secret: process.env.CLOUD_SECRET,
// });
console.log("THIS IS THE CLOUD NAME",cloudinary.config().cloud_name);
cloudinary.uploader
    .upload("img1.jpg", {
      resource_type: "image",
    })
    .then((result) => {
      console.log("success", JSON.stringify(result, null, 2));
    })
    .catch((error) => {
      console.log("error", JSON.stringify(error, null, 2));
    });
