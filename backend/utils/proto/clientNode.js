const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const protoObjectIdentification = protoLoader.loadSync(path.resolve(__dirname, "./identification.proto"));

const protoObjectRegister = protoLoader.loadSync(path.resolve(__dirname, "./register.proto"));

const protoVerification = protoLoader.loadSync(path.resolve(__dirname, "./verification.proto"));

const IdentificationDefinition = grpc.loadPackageDefinition(protoObjectIdentification);

console.log(IdentificationDefinition)

const clientIdentification = new IdentificationDefinition.IdentificationService("localhost:50051", grpc.credentials.createInsecure());

console.log(clientIdentification)

const identifycationByVideo = async (video_path) => {
    try {
        console.log('Hello world 1')
        await clientIdentification.Identify({ video_path: video_path }, (err, response) => {
            if (err) {
                console.log('Error when identify video')
                return err
            }
            console.log('Hello world 2')
            console.log(response)
            return response
        })
    }
    catch (err) {
        console.log('Error when identify video')
        return err
    }
}

// const response = clientIdentification.Identify({ video_path: 'C:/Users/HP PAVILION/Pictures/Camera Roll/WIN_20230523_13_43_24_Pro.mp4' })

module.exports = {
    identifycationByVideo
}

