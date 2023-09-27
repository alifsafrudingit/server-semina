const Payments = require('../../api/v1/payments/model');
const { BadRequestError, NotFoundError } = require('../../errors');
const { checkingImage } = require('./images');

const getAllPayments = async (req) => {
  let { condition } = req.user.organizer;
  
  const result = await Payments.find({ condition })
    .populate({
      path: 'image',
      select: '_id name',
    })
    .select('_id type status image');
    
  return result;
};

const createPayment = async (req) => {
  const { type, image } = req.body;
  const { organizer } = req.user.organizer;
  
  await checkingImage(image);
  
  const check = await Payments.findOne({ type, organizer });
  
  if (check) throw new BadRequestError('Tipe pembayaran duplikat');
  
  const result = await Payments.create({
    image,
    type,
    organizer: req.user.organizer,
  });
  
  return result;
};

const getOnePayment = async (req) => {
  const { id } = req.params;
  console.log('req.user')
  console.log(req.user)
      
  const result = await Payments.findOne({
    _id: id,
    organizer: req.user.organizer
  })
    .populate({
      path: 'image',
      select: '_id name',
    })
    .select('_id type status image');
    
  if (!result) throw new NotFoundError(`Tidak ada tipe pembayaran dengan id : ${id}`);
  
  return result;
};

const updatePayment = async (req) => {
  const { id } = req.params;
  const { type, image } = req.body;
  
  await checkingImage(image);
  
  const check = await Payments.findOne({
    type,
    organizer: req.user.organizer,
    _id: { $ne: id },
  });
  
  if (check) throw new BadRequestError('Tipe pembayaran duplikat');
  
  const result = await Payments.findOneAndUpdate(
    { _id: id },
    { type, image, organizer: req.user.organizer },
    { new: true, runValidators: true }
  );
  
  if (!result) throw new NotFoundError(`Tidak ada pembayaran dengan id : ${id}`);
  
  return result;
};

const deletePayment = async (req) => {
  const { id } = req.params;
  
  const result = await Payments.findOneAndRemove({
    _id: id,
    organizer: req.user.organizer
  });
  
  if (!result)  throw new NotFoundError(`Tidak ada pembayaran dengan id : ${id}`);
  
  // await result.remove();
  
  return result;
};

const checkingPayment = async (id) => {
  const result = await Payments.findOne({ _id: id });
  
  if (!result) throw new NotFoundError(`Tidak ada tipe pembayaran dengan id : ${id}`);
  
  return result;
};

module.exports = {
  getAllPayments,
  createPayment,
  getOnePayment,
  updatePayment,
  deletePayment,
  checkingPayment,
};