const router = require('express').Router();
const { status } = require('express/lib/response.js');
let empData=require('../employee.js');
const errorHandler = require('../errorHandler.js');

// router.get('/list',(req,res)=>{
//     res.send('employees are listed');
// })
router.get('/list',(req,res)=>{
    res.json({
        items: empData
    });
})

router.get('/list/:id',(req,res)=>{
    const empByID = empData.filter((items)=> items.id == req.params.id)
    res.json({
        items: empByID
    });
}) 

router.post('/create', (req, res) => {
    let dataFromClient = req.body;
    if(dataFromClient == null){
        res.send('Employee can not be created');
    }else{
        empData.push(dataFromClient);
        res.json({
            items: empData
        });
    }
    console.log(req.body)
    
}); 


// router.put('/update/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const newEmpData = req.body;
//     empData = empData.map(items => {
//         if (items.id === id) {
//             return { ...items, ...newEmpData };
//         }
//         return items;
//     });
//     res.json({
//         items: empData
//     });
// });

router.put('/update/:id', (req, res, next) => {
  
    let id = parseInt(req.params.id);
    const updateEmp = req.body;
    let data;
    const updateEmployee = empData.find((item) => item.id === id);
    try{
    if(updateEmployee == null)
          throw new Error();

     data = empData.map((item)=>{
   
        if(item.id===Number(id)){
               item=updateEmp;
        }
        return item;
        });

    }catch(error)
    {
       next(errorHandler)
    }
       res.json({
        message: "Updated Successfully",
        items: data,
      });
    });


router.put('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    empData = empData.filter(items => items.id != id);
    res.json({
        items: empData
    });
});


module.exports = router;

