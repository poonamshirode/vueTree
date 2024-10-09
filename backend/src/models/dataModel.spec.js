import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { expect } from 'chai';
import TreeData from './dataModel.js';

describe('TreeData Model Test with mongodb-memory-server', () => {
  let mongoServer;

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await TreeData.deleteMany({});
  });

  it('should create a new TreeData document', async () => {
    const TreeData = new TreeData({
      name: 'A',
      description: 'This is a description of A',
      parent: '',
    });

    const savedTreeData = await TreeData.save();

    expect(savedTreeData.name).to.equal('A');
    expect(savedTreeData.description).to.equal('This is a description of A');
    expect(savedTreeData.parent).to.equal('');
  });

  it('should require the name field', async () => {
    const TreeData = new TreeData({
      description: 'This is a description without a name',
      parent: '',
    });

    let err;
    try {
      await TreeData.save();
    } catch (error) {
      err = error;
    }

    expect(err).to.exist;
    expect(err.errors.name).to.exist;
  });

  it('should update a TreeData document', async () => {
    const treeData = new TreeData({
      name: 'A',
      description: 'Initial description',
      parent: '',
    });

    const savedTreeData = await treeData.save();

    savedTreeData.description = 'Updated description';
    const updatedTreeData = await savedTreeData.save();

    expect(updatedTreeData.description).to.equal('Updated description');
  });

  it('should delete a TreeData document', async () => {
    const treeData = new TreeData({
      name: 'A',
      description: 'This is a description',
      parent: '',
    });

    const savedTreeData = await treeData.save();
    await TreeData.deleteOne({ _id: savedTreeData._id });

    const foundTreeData = await TreeData.findById(savedTreeData._id);
    expect(foundTreeData).to.be.null;
  });
});
