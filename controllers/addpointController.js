
const fs = require('fs');

const conn = require('../dbConnection').promise();


exports.addpoint = async (req, res, next) => {
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
        if (req.body.get == 'true') {
            const point = await conn.execute(
                "SELECT * FROM `addpoint`" ,
                
              );
              res.send(JSON.stringify(point[0]));
            
              
        } else {
        const [rows] = await conn.execute('INSERT INTO `addpoint`(`clear`,`name`,`photos`,`latitude`,`longitude`,`text`,`size`,`car`,`trash`,`anonim`,`date`) VALUES(?,?,?,?,?,?,?,?,?,?,?)',[
            req.body.clear,
            req.body.name,
            parseString(),
            JSON.parse(req.body.location).coords.latitude,
            JSON.parse(req.body.location).coords.longitude,
            req.body.text,
            req.body.size,
            req.body.car,
            req.body.trash,
            req.body.anonim,
            getDate()
        ]);

    }
    } catch(err) {
        next(err);
    }
    
    
}