exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['documents.test.js', 'all-lawsuits.test.js', 'participants.test.js'],
  onPrepare: () => {
    browser.ignoreSynchronization = true
  },
  capabilities: {
    browserName: 'chrome',
    shardTestFiles: true,
    maxInstances: 3,
  },
};