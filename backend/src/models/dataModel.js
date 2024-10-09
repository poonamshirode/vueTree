import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  parent: {
    type: String,
    default: '',
  },
});

const TreeData = mongoose.model('tree', dataSchema);

export default TreeData;
