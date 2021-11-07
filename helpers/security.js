const CryptoJS = require("crypto-js");


const { AES_KEY, AES_IV } = process.env

 // AES ENCRYPT
const encryptAes = async (plainText, urlSafe = false) => {
    let key = await CryptoJS.enc.Utf8.parse(AES_KEY);
    let iv = await CryptoJS.enc.Utf8.parse(AES_IV);
    try {
        let chiperText = await CryptoJS.AES.encrypt(plainText, key, { iv: iv });
        let base64 = await chiperText.toString();

        if (urlSafe){
            base64 = base64.replace(/\+/g, '-');
            base64 = base64.replace(/\//g, '_');
        }

        return base64;
    }
    catch(err) {
        console.log(err);
        return false;
    }
}

// AES DECRYPT
const decryptAes = async (chiperText, urlSafe = false) => {
    let key = await CryptoJS.enc.Utf8.parse(AES_KEY);
    let iv = await CryptoJS.enc.Utf8.parse(AES_IV);

    try {
        if (urlSafe) {
            // eslint-disable-next-line
            chiperText = chiperText.replace(/\-/g, '+'); 
            // eslint-disable-next-line
            chiperText = chiperText.replace(/\_/g, '/'); 
        }

        let plainText = await CryptoJS.AES.decrypt(chiperText, key, {iv:iv});
        
        return plainText.toString(CryptoJS.enc.Utf8);
    }
    catch(err) {
        console.log(err);
        return false;
    }
}


// Encode Base64
const base64Encode = (plainText) => {
    try {
        var words = CryptoJS.enc.Utf8.parse(plainText); // WordArray object
        var base64 = CryptoJS.enc.Base64.stringify(words); // string: 'SGVsbG8gd29ybGQ='
        
        return base64
    } catch (error) {
        return error
    }
}


// Decode Base64
const base64Decode = (base64) => {
    try {
        var words = CryptoJS.enc.Base64.parse(base64);
        var textString = CryptoJS.enc.Utf8.stringify(words); // 'Hello world'

        return textString
    } catch (error) {
        
    }
}

module.exports = {
    encryptAes, decryptAes, base64Encode, base64Decode
}