const { IdentificationService, RegisterService, VerificationService } = require("./grpcServices");

//const response = clientIdentification.Identify({ video_path: 'C:/Users/HP PAVILION/Pictures/Camera Roll/WIN_20230523_13_43_24_Pro.mp4' })
const main = async () => {
    try {
        console.log('Hello world 1')
        RegisterService.register('TranPhucManhLinh', 'C:/Users/linh2/OneDrive/Ảnh kỉ niệm/Camera Roll/WIN_20230522_15_49_32_Pro.mp4')
            .then(response => {
                console.log('IdentificationService.identify result 1:', response)
            });
    }
    catch (err) {
        console.log('Try-catch Error: ', err)
        return err
    }
}



module.exports = {
    main
}

