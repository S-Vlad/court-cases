/* eslint-disable */

describe('all-lawsuits', () => {
  const browserSleep = 1000;
  const lawsuit = $$('.table tr').$$('td');

  const expectValue = (toEqual) => {
    expect(lawsuit.get(0).getText()).toEqual(toEqual);
  }

  beforeEach(() => {
    browser.get('http://localhost:3000/lawsuits');
    browser.sleep(browserSleep);
  });

  it('should contain lawsuit', () => {
    expectValue('Завершено');
  });

  it('should find lawsuit', () => {
    $('#search-field').sendKeys('Заве');
    $('.search-button').click();

    browser.sleep(browserSleep);

    expectValue('Завершено');
  });

  it('should open lawsuit page', () => {
    lawsuit.get(0).$('a').click();

    browser.sleep(browserSleep);

    expectValue('Завершено');
  });
});
