const express=require('express')
const router = express.Router();

const {uploadFile} =require('./../controller/upload')

router.route('/excel').post(uploadFile)

module.exports=router