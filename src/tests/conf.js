exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    'allLawsuits.test.js',
    'documents.test.js',
    'openLawsuits.test.js',
    'participants.test.js',
  ],
  onPrepare: () => {
    browser.ignoreSynchronization = true;
  },
  capabilities: {
    browserName: 'chrome',
    shardTestFiles: true,
    maxInstances: 4,
  },
};