
const checkReqBodyItems = (req, res, next) => {
    if(!req.body.item_name || req.body.item_name.trim().length == 0){
        res.status(422).json({message: 'item name required'})
    }
    else {
        next()
    }
}

module.exports = {
    checkReqBodyItems
}