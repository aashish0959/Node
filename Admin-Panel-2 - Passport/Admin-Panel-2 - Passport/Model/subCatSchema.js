const mongoose = require("mongoose");
const schema = mongoose.Schema({
  subCatName: {
    type: String,
    required: true,
  },
  CatagoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Catagorie',
    required: true,
  },
});

let subCatSchema = mongoose.model('SubCatagorie', schema);

module.exports = subCatSchema;
