const fs = require('fs');
const path = require('path');
const detectFace = async (req, res) => {

    if (!req.file) {
        return res.json({ msgs: "Please select a file to upload" });
    }

    return res.json({
        message: 'success'
    })
}

module.exports = {
    detectFace
}