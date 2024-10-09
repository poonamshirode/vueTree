import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import TreeData from './models/dataModel.js';

describe('Database Connection and Operations', () => {
  let consoleLogSpy;
  let consoleErrorSpy;
  let connectStub, onStub, onceStub, closeStub, deleteManyStub, insertManyStub;

  beforeEach(() => {
    // Mongoose connection stubs
    connectStub = sinon.stub(mongoose, 'connect').resolves();
    onStub = sinon.stub(mongoose.connection, 'on');
    onceStub = sinon.stub(mongoose.connection, 'once').callsFake((event, callback) => {
      if (event === 'open') callback(); // Directly invoke callback for 'open'
    });
    closeStub = sinon.stub(mongoose.connection, 'close').resolves();

    // TreeData model stubs
    deleteManyStub = sinon.stub(TreeData, 'deleteMany').resolves();
    insertManyStub = sinon.stub(TreeData, 'insertMany').resolves();

    // Console log spies
    consoleLogSpy = sinon.spy(console, 'log');
    consoleErrorSpy = sinon.spy(console, 'error');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should connect to MongoDB, delete existing data, and insert new data', async () => {
    await import('./seed.js');

    // Assertions
    expect(connectStub.calledWith(process.env.MONGODB_URI, { dbName: 'treedata' })).to.be.true;
    expect(deleteManyStub.calledWith({})).to.be.true;
    expect(insertManyStub.calledWith([
      { name: 'A', description: 'This is a description of A', parent: '' },
      { name: 'B', description: 'This is a description of B', parent: 'A' },
      { name: 'C', description: 'This is a description of C', parent: 'A' },
      { name: 'D', description: 'This is a description of D', parent: 'A' },
      { name: 'B-1', description: 'This is a description of B-1', parent: 'B' },
      { name: 'B-2', description: 'This is a description of B-2', parent: 'B' },
      { name: 'B-3', description: 'This is a description of B-3', parent: 'B' },
    ])).to.be.true;

    expect(consoleLogSpy.calledWith('Connected to MongoDB')).to.be.true;
    expect(consoleLogSpy.calledWith('Sample data inserted')).to.be.true;
    expect(closeStub.called).to.be.true;
  });

  // Optional: Add error handling tests
  it('should handle connection errors gracefully', async () => {
    connectStub.rejects(new Error('Connection error'));

    await import('./seed.js');

    expect(consoleErrorSpy.calledWith('Connection error')).to.be.true;
  });
});
