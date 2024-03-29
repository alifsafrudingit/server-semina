const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let organizersSchema = Schema(
    {
        organizer: {
            type: String,
            minlength: [3, 'Panjang nama penyelenggara minimal 3 karakter'],
            maxlength: [20, 'Panjang nama penyelenggara maksimal 20 karakter'],
            required: [true, 'Penyelenggara harus diisi'],
        },
    },
    { timestamps: true }
);

module.exports = model('Organizer', organizersSchema);