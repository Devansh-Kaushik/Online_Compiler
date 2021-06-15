var mysql = require('mysql');
const AWS = require('aws-sdk');
const fs = require('fs');
const {c, cpp, node, python, java} = require('compile-run');
const ACCESS_KEY_ID = "AKIAW4GO5H52YS65OYFV";
const SECRET_ACCESS_KEY = "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";
const BUCKET_NAME = "code-compiler";
var s3 = new AWS.S3({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
})
var connection = mysql.createConnection({
    host     : 'remotemysql.com',
    user     : 'lO01dRyKJ0',
    password : 'ptMFxHu9do',
    database : 'lO01dRyKJ0'
});
connection.connect(function(err) {
    if(err){
        console.log(err.code);
        console.log(err.fatal);
    }
    else{
        console.log("connected")
    }
});

function work()
{
    connection.query('SELECT count(*) as total FROM detail', function(err, result) {
        const count = Number(result[0].total);
        if(count==0)
        {
            console.log("Empty DATABASE");
            work();
        }
        else{
            connection.query('SELECT Name FROM detail  ', function(err, rows, fields) {
                if(err) 
                {
                    throw err;
                }
                var resultArray = Object.values(JSON.parse(JSON.stringify(rows)));
                connection.query('SELECT Status FROM detail  ', function(err, rows_1, fields) {
                    if(err) 
                    {
                        throw err;
                    }
                    var resultArray_1 = Object.values(JSON.parse(JSON.stringify(rows_1)));
                    for(var i=0;i<count;i++)
                    {
                        var name=resultArray[i]["Name"];
                        var status=resultArray_1[i]["Status"];
                        if(status=="resume")
                        {
                            var path1=`./${name}.json`;
                            var path2=`./${name}.txt`;
                            var params1 = {
                                Key: `${name}.json`,
                                Bucket: BUCKET_NAME
                            }
                            s3.getObject(params1, function(err, data) {
                                if (err) {
                                    throw err
                                }
                                fs.writeFile(`./${name}.json`, data.Body, err => {
                                    if (err) {
                                    console.error(err)
                                    return
                                    }
                                    console.log("Done")
                                    fs.readFile(`./${name}.json`, function(err, data) {
                        
                                        // Check for errors
                                        if (err) throw err;
                                    
                                        // Converting to JSON
                                        const users = JSON.parse(data);
                                        if(users.lang=="C")
                                        {
                                            if(users.radio=="false")
                                            {
                                                let resultPromise = c.runSource(users.code);
                                                resultPromise
                                                    .then(result => {
                                                        console.log(result.stdout);//result object
                                                        fs.writeFile(`./${name}.txt`,result.stdout, err => {
                                                            if (err) {
                                                            console.error(err)
                                                            return
                                                            }
                                                            const fileName = `./${name}.txt`;
                                                            fs.readFile(fileName, (err, filedata) => {
                                                                if (err) throw err;
                                                                const params3 = {
                                                                    Bucket: BUCKET_NAME, // pass your bucket name
                                                                    Key: `${name}.txt`, // file will be saved as testBucket/contacts.csv
                                                                    Body: filedata
                                                                };
                                                                s3.upload(params3, function(s3Err, filedata1) {
                                                                    if (s3Err) throw s3Err
                                                                    console.log(`File uploaded successfully at ${filedata1.Location}`)
                                                                    if (fs.existsSync(path1)) {
                                                                        fs.unlinkSync(path1)
                                                                    }
                                                                    if (fs.existsSync(path2)) {
                                                                        fs.unlinkSync(path2)
                                                                    }
                                                                });
                                        
                                                            });
                                                            
                                                        })
                                                    })
                                                    .catch(err => {
                                                        console.log(err);
                                                    });
                                            }
                                            else
                                            {
                                                let resultPromise = c.runSource(users.code, { stdin:users.input});
                                                resultPromise
                                                    .then(result => {
                                                        console.log(result.stdout);//result object
                                                        fs.writeFile(`./${name}.txt`,result.stdout, err => {
                                                            if (err) {
                                                            console.error(err)
                                                            return
                                                            }
                                                            const fileName = `./${name}.txt`;
                                                            fs.readFile(fileName, (err, filedata) => {
                                                                if (err) throw err;
                                                                const params3 = {
                                                                    Bucket: BUCKET_NAME, // pass your bucket name
                                                                    Key: `${name}.txt`, // file will be saved as testBucket/contacts.csv
                                                                    Body: filedata
                                                                };
                                                                s3.upload(params3, function(s3Err, filedata1) {
                                                                    if (s3Err) throw s3Err
                                                                    console.log(`File uploaded successfully at ${filedata1.Location}`)
                                                                    if (fs.existsSync(path1)) {
                                                                        fs.unlinkSync(path1)
                                                                    }
                                                                    if (fs.existsSync(path2)) {
                                                                        fs.unlinkSync(path2)
                                                                    }
                                                                });
                                        
                                                            });
                                                        
                                                        })
                                                    })
                                                    .catch(err => {
                                                        console.log(err);
                                                    });
                                            }
                                        }
                                        if(users.lang=="C++")
                                        {
                                            if(users.radio=="false")
                                            {
                                                let resultPromise = cpp.runSource(users.code);
                                                resultPromise
                                                    .then(result => {
                                                        console.log(result.stdout);//result object
                                                        fs.writeFile(`./${name}.txt`,result.stdout, err => {
                                                            if (err) {
                                                            console.error(err)
                                                            return
                                                            }
                                                            const fileName = `./${name}.txt`;
                                                            fs.readFile(fileName, (err, filedata) => {
                                                                if (err) throw err;
                                                                const params3 = {
                                                                    Bucket: BUCKET_NAME, // pass your bucket name
                                                                    Key: `${name}.txt`, // file will be saved as testBucket/contacts.csv
                                                                    Body: filedata
                                                                };
                                                                s3.upload(params3, function(s3Err, filedata1) {
                                                                    if (s3Err) throw s3Err
                                                                    console.log(`File uploaded successfully at ${filedata1.Location}`)
                                                                    if (fs.existsSync(path1)) {
                                                                        fs.unlinkSync(path1)
                                                                    }
                                                                    if (fs.existsSync(path2)) {
                                                                        fs.unlinkSync(path2)
                                                                    }
                                                                });
                                        
                                                            });
                                                            
                                                        })
                                                    })
                                                    .catch(err => {
                                                        console.log(err);
                                                    });
                                            }
                                            else
                                            {
                                                let resultPromise = cpp.runSource(users.code, { stdin:users.input});
                                                resultPromise
                                                    .then(result => {
                                                        console.log(result.stdout);//result object
                                                        fs.writeFile(`./${name}.txt`,result.stdout, err => {
                                                            if (err) {
                                                            console.error(err)
                                                            return
                                                            }
                                                            const fileName = `./${name}.txt`;
                                                            fs.readFile(fileName, (err, filedata) => {
                                                                if (err) throw err;
                                                                const params3 = {
                                                                    Bucket: BUCKET_NAME, // pass your bucket name
                                                                    Key: `${name}.txt`, // file will be saved as testBucket/contacts.csv
                                                                    Body: filedata
                                                                };
                                                                s3.upload(params3, function(s3Err, filedata1) {
                                                                    if (s3Err) throw s3Err
                                                                    console.log(`File uploaded successfully at ${filedata1.Location}`)
                                                                    if (fs.existsSync(path1)) {
                                                                        fs.unlinkSync(path1)
                                                                    }
                                                                    if (fs.existsSync(path2)) {
                                                                        fs.unlinkSync(path2)
                                                                    }
                                                                });
                                        
                                                            });
                                                            
                                                        })
                                                    })
                                                    .catch(err => {
                                                        console.log(err);
                                                    });
                                            }
                                        }
                                        if(users.lang=="Python")
                                        {
                                            if(users.radio=="false")
                                            {
                                                let resultPromise = python.runSource(users.code);
                                                resultPromise
                                                    .then(result => {
                                                        console.log(result.stdout);//result object
                                                        fs.writeFile(`./${name}.txt`,result.stdout, err => {
                                                            if (err) {
                                                            console.error(err)
                                                            return
                                                            }
                                                            const fileName = `./${name}.txt`;
                                                            fs.readFile(fileName, (err, filedata) => {
                                                                if (err) throw err;
                                                                const params3 = {
                                                                    Bucket: BUCKET_NAME, // pass your bucket name
                                                                    Key: `${name}.txt`, // file will be saved as testBucket/contacts.csv
                                                                    Body: filedata
                                                                };
                                                                s3.upload(params3, function(s3Err, filedata1) {
                                                                    if (s3Err) throw s3Err
                                                                    console.log(`File uploaded successfully at ${filedata1.Location}`)
                                                                    if (fs.existsSync(path1)) {
                                                                        fs.unlinkSync(path1)
                                                                    }
                                                                    if (fs.existsSync(path2)) {
                                                                        fs.unlinkSync(path2)
                                                                    }
                                                                });
                                        
                                                            });
                                                        })
                                                    })
                                                    .catch(err => {
                                                        console.log(err);
                                                    });
                                            }
                                            else
                                            {
                                                let resultPromise = python.runSource(users.code, { stdin:users.input});
                                                resultPromise
                                                    .then(result => {
                                                        console.log(result.stdout);//result object
                                                        fs.writeFile(`./${name}.txt`,result.stdout, err => {
                                                            if (err) {
                                                            console.error(err)
                                                            return
                                                            }
                                                            const fileName = `./${name}.txt`;
                                                            fs.readFile(fileName, (err, filedata) => {
                                                                if (err) throw err;
                                                                const params3 = {
                                                                    Bucket: BUCKET_NAME, // pass your bucket name
                                                                    Key: `${name}.txt`, // file will be saved as testBucket/contacts.csv
                                                                    Body: filedata
                                                                };
                                                                s3.upload(params3, function(s3Err, filedata1) {
                                                                    if (s3Err) throw s3Err
                                                                    console.log(`File uploaded successfully at ${filedata1.Location}`)
                                                                    if (fs.existsSync(path1)) {
                                                                        fs.unlinkSync(path1)
                                                                    }
                                                                    if (fs.existsSync(path2)) {
                                                                        fs.unlinkSync(path2)
                                                                    }
                                                                });
                                        
                                                            });
                                                        
                                                        })
                                                    })
                                                    .catch(err => {
                                                        console.log(err);
                                                    });
                                            }
                                        }
                                        if(users.lang=="Java")
                                        {
                                            if(users.radio=="false")
                                            {
                                                let resultPromise = java.runSource(users.code);
                                                resultPromise
                                                    .then(result => {
                                                        console.log(result.stdout);//result object
                                                        fs.writeFile(`./${name}.txt`,result.stdout, err => {
                                                            if (err) {
                                                            console.error(err)
                                                            return
                                                            }
                                                            const fileName = `./${name}.txt`;
                                                            fs.readFile(fileName, (err, filedata) => {
                                                                if (err) throw err;
                                                                const params3 = {
                                                                    Bucket: BUCKET_NAME, // pass your bucket name
                                                                    Key: `${name}.txt`, // file will be saved as testBucket/contacts.csv
                                                                    Body: filedata
                                                                };
                                                                s3.upload(params3, function(s3Err, filedata1) {
                                                                    if (s3Err) throw s3Err
                                                                    console.log(`File uploaded successfully at ${filedata1.Location}`)
                                                                    if (fs.existsSync(path1)) {
                                                                        fs.unlinkSync(path1)
                                                                    }
                                                                    if (fs.existsSync(path2)) {
                                                                        fs.unlinkSync(path2)
                                                                    }
                                                                });
                                        
                                                            });
                                                            
                                                        })
                                                    })
                                                    .catch(err => {
                                                        console.log(err);
                                                    });
                                            }
                                            else
                                            {
                                                let resultPromise = java.runSource(users.code, { stdin:users.input});
                                                resultPromise
                                                    .then(result => {
                                                        console.log(result.stdout);//result object
                                                        fs.writeFile(`./${name}.txt`,result.stdout, err => {
                                                            if (err) {
                                                            console.error(err)
                                                            return
                                                            }
                                                            const fileName = `./${name}.txt`;
                                                            fs.readFile(fileName, (err, filedata) => {
                                                                if (err) throw err;
                                                                const params3 = {
                                                                    Bucket: BUCKET_NAME, // pass your bucket name
                                                                    Key: `${name}.txt`, // file will be saved as testBucket/contacts.csv
                                                                    Body: filedata
                                                                };
                                                                s3.upload(params3, function(s3Err, filedata1) {
                                                                    if (s3Err) throw s3Err
                                                                    console.log(`File uploaded successfully at ${filedata1.Location}`)
                                                                    if (fs.existsSync(path1)) {
                                                                        fs.unlinkSync(path1)
                                                                    }
                                                                    if (fs.existsSync(path2)) {
                                                                        fs.unlinkSync(path2)
                                                                    }
                                                                });
                                        
                                                            });
                                                            
                                                        })
                                                    })
                                                    .catch(err => {
                                                        console.log(err);
                                                    });
                                            }
                                        }
                                        
                                    });
                            
                                })
                            })
                            connection.query(`UPDATE detail SET Status='Done' WHERE Name='${name}' `,function(err,result){
                                if(err) throw err;
                            })
                            console.log("Done")
                        }
                        if(status=="Done")
                        {
                            console.log("status:DONE");
                            /*connection.query(" DELETE FROM detail WHERE Status='Done'",function(err,result){
                                if(err) throw err;
                            })*/
                        }
                        /*connection.query('SELECT count(*) as total FROM detail', function(err, result) {
                            const count = Number(result[0].total);
                            if(count==0)
                            {
                                console.log("Empty DATABASE");
                                work();
                            }
                        });*/
                    }
                });
            });
        };
        work();
    });
}
work();

