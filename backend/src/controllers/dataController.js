import TreeData from '../models/dataModel.js';

const getData = async (req, res) => {
  try {
    const data = await TreeData.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { getData };
