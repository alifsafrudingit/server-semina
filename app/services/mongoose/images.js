const Images = require('../../api/v1/images/model');
const { NotFoundError } = require('../../errors');

/**
 * 1. Langsung save ke model Table Image
 * 2. Generate url setelah submit baru kita simpan images 
 */

// 1. Langsung save ke model Table Image
const createImages = async (req) => {
    const result = await Images.create({
        name: req.file ? `upload/${req.file.filename}` : 'uploads/avatar/default-avatar.jpeg'
    });

    return result;
};

// 2. Generate url setelah submit baru kita simpan images 
// const generateUrlImage = async (req) => {
//     const result = `upload/${req.file.filename}`;

//     return result;
// }

const checkingImage = async (id) => {
    const result = await Images.findOne({ _id: id });
    console.log(result);

    if (!result) throw new NotFoundError(`Tidak ada Gambar dengan id : ${id}`);

    return result;
}

module.exports = { createImages, checkingImage };