const aws = require('aws-sdk')
const multer = require('multer')
const express = require('express')
const multerS3 = require('multer-s3')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const PORT = 5000

app.use(bodyParser.json())
app.use(cors())

var fileName = null
const spacesEndpoint = new aws.Endpoint('sgp1.digitaloceanspaces.com')
const spaces = new aws.S3({
    endpoint: spacesEndpoint,
    accessKeyId: 'AEYWLMXU4Z2L6FSOMNPC',
    secretAccessKey: 'AdbP2wQdI4jnIysBRMyuC5V9I+yOtFZambzpnFaAm0o'
    // access และ secret key ได้จากการสร้างโดยกด manage keys เมื่อสร้างแล้ว
    // ซักพัก secret จะไม่แสดงถ้าลืมต้องกด regenarate key หรือสร้างใหม่
})

const upload = multer({
    storage: multerS3({
        s3: spaces,
        bucket: 'photoims/photoims', //ถ้าเซฟลง space ใช้แค่ photoims แต่เซฟลงโฟลเดอร์อีกทีเลย / ตามด้วยชื่อโฟลเดอร์
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (request, file, cb) {
            console.log(file)
            fileName = file.originalname
            cb(null, file.originalname)
        }
    })
}).array('file', 1)

app.post('/upload', function (request, response, next) {
    fileName = null
    upload(request, response, function (error) {
        if (error) {
            console.log(error)
        } else {
            console.log('File has uploaded')
            const fileURL = `${spacesEndpoint.protocol}//photoims.${spacesEndpoint.host}/photoims/${fileName}`
            response.send(fileURL)
        }
    })
})

app.post('/test', (req, res) => {
    console.log(req.body)
    res.send('Ok')
})

app.get('/', (req, res) => {
    res.send('Hello')
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))