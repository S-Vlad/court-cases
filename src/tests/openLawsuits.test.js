/* eslint-disable */

describe('open-lawsuits', () => {
  const browserSleep = 1000;
  const lawsuit = $$('.table tr').$$('td');

  const expectValue = (toEqual) => {
    expect(lawsuit.get(0).getText()).toEqual(toEqual);
  }

  beforeEach(() => {
    browser.get('http://localhost:3000/open-lawsuits');
    browser.sleep(browserSleep);
  });

  it('should contain lawsuit', () => {
    expectValue('Начато');
  });

  it('should open lawsuit page', () => {
    lawsuit.get(0).$('a').click();

    browser.sleep(browserSleep);

    expectValue('Начато');
  });
});