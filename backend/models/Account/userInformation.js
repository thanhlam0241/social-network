const mongoose = require('mongoose');

const UserInformationSchema = new mongoose.Schema({
    avatar: {
        type: String,
        require: false
    },
    background: {
        type: String,
        require: false
    },
    email: {
        type: String,
        require: false
    },
    phone: {
        type: String,
        require: false
    },
    address: {
        type: String,
        require: false
    },
    firstName: {
        type: String,
        require: false
    },
    lastName: {
        type: String,
        require: false
    },
    isActive: {
        type: Boolean,
        require: false
    }
});

UserInformationSchema.virtual('fullName').get(function () {
    let firstName = this.firstName || 'Unknown';
    let lastName = this.lastName || 'People';
    return firstName + ' ' + lastName;
});

module.exports = mongoose.model('UserInformation', UserInformationSchema)