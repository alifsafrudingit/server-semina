const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Tipe pembayaran harus diisi'],
    minlength: 3,
    maxlength: 50,
  },
  status: {
    type: Boolean,
    enum: ['true', false],
    default: true,
  },
  image: {
    type: mongoose.Types.ObjectId,
    ref: 'Image',
    required: true,
  },
  organizer: {
    type: mongoose.Types.ObjectId,
    ref: 'Organizer',
    required: true,
  },
},
{ timestamps : true }
);

module.exports = mongoose.model('Payment', paymentSchema);