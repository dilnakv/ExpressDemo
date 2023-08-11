const errorHandler=(error,req,res,next)=>{
    console.log(error)
    res.status(500);
    res.send({"error":true,
      "message":"Error occurred"});
    // next();
}

module.exports=errorHandler;