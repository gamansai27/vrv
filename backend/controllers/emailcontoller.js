const { sendEmail } = require("../services/emailService");
const customercaremail = async(req,res)=>{
    const {formData} = req.body;
    try{
        await sendEmail(formData);
        res.status(200).json({success : true});
    }
    catch(error){
        res.status(401).json({message : error});
    }
};

module.exports={customercaremail};