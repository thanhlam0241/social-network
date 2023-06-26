const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const protoObjectIdentification = protoLoader.loadSync(path.resolve(__dirname, "./identification.proto"));

const protoObjectRegister = protoLoader.loadSync(path.resolve(__dirname, "./register.proto"));

const protoVerification = protoLoader.loadSync(path.resolve(__dirname, "./verification.proto"));

const IdentificationDefinition = grpc.loadPackageDefinition(protoObjectIdentification);

const VerificationDefinition = grpc.loadPackageDefinition(protoVerification);

const RegisterDefinition = grpc.loadPackageDefinition(protoObjectRegister);


const clientIdentification = new IdentificationDefinition.IdentificationService("localhost:50051", grpc.credentials.createInsecure());
const clientVerification = new VerificationDefinition.VerificationService("localhost:50051", grpc.credentials.createInsecure());
const clientRegister = new RegisterDefinition.RegisterService("localhost:50051", grpc.credentials.createInsecure());

module.exports = {
    IdentificationService: {
        identify: (videoPath) => {
            return new Promise((resolve, reject) => {
                clientIdentification.Identify({ videoPath: videoPath }, (err, response) => {
                    if (err) {
                        return reject(err)
                    }
                    return resolve(response)
                });
            });
        }
    },
    VerificationService: {
        verify: (userId, videoPath) => {
            return new Promise((resolve, reject) => {
                clientVerification.Verify({ userId: userId, videoPath: videoPath }, (err, response) => {
                    if (err) {
                        return reject(err)
                    }
                    return resolve(response)
                });
            });
        }
    },
    RegisterService: {
        register: (userId, videoPath) => {
            return new Promise((resolve, reject) => {
                clientRegister.Register({ userId: userId, videoPath: videoPath }, (err, response) => {
                    if (err) {
                        return reject(err)
                    }
                    return resolve(response)
                });
            });
        }
    }

}