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


const spacesEndpoint = new aws.Endpoint('sgp1.digitaloceanspaces.com')
const spaces = new aws.S3({
    endpoint: spacesEndpoint,
    accessKeyId: '2S4WCDEYR2MBFU5VTI2R',
    secretAccessKey: '+Z5G/LgaGaMM/L6/lNWMWxdVvBbtwsAV1+3n4rx+E2Q'
})

const upload = multer({
    storage: multerS3({
    s3: spaces,
    bucket: 'photoims/photoims',
    acl: 'public-read',
    key: function (request, file, cb) {
        // console.log(file)
        cb(null, file.originalname)
    }
    })
}).array('upload', 1)

app.post('/upload', function (request, response, next) {
    upload(request, response, function (error) {
        if (error) {
            console.log(error)
            response.send(error)
        }
        console.log('File has uploaded')
        // response.send('success')
    })
})

app.get('/', (req, res) => {
    res.send('Hello')
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))