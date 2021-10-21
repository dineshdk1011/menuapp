const qrcode = require("qrcode")

module.exports.qrCode=async(data)=>{
    const newqrcode=new Promise(async(resolve,reject)=>{
        await qrcode.toDataURL(data,((err,url)=>{
            if(err) return resolve("null")
            return  resolve(url)
        }))
    })
    return await newqrcode
}