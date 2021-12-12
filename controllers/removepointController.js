const conn = require('../dbConnection').promise();


exports.removepoint = async (req, res, next) => {
    console.log(req.body);
    console.log(req.files);
    if (req.body && req.files != undefined) {
        res.sendStatus(200);
        
    }

    function getDate() {
        let d = new Date()
        return `${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`;
    }
    

    function parseString() {
        let td = [];
        req.files.forEach((item) => {
            td.push({
                id: Date.now().toString(),
                photo: {
                    uri: 'http://restapi/uploads/' + item.filename
                }
            });
        });
        return JSON.stringify(td);

        
    }
    
    
    try {
        const [rows] = await conn.execute(`UPDATE addpoint SET clear = '${req.body.clear}', name = '${req.body.name}', photos = '${parseString()}', date = '${getDate()}'  WHERE id = ${req.body.id}`);
    } catch(err) {
        next(err);
    } 
}





// req.body.clear,
// req.body.name,
// parseString(),
// JSON.parse(req.body.location).coords.latitude,
// JSON.parse(req.body.location).coords.longitude,
// req.body.text,
// req.body.size,
// req.body.car,
// req.body.trash,
// req.body.anonim,
// getDate()