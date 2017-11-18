/* eslint-disable */

describe('documents', () => {
  const browserSleep = 1000;
  const documentName = $$('.table tr').get(2).$$('td'); //element.all(by.css('.table tr')).get(2)...;
  const button = $$('.table tr').get(2).$$('td');

  const expectValue = (column, toEqual, notEqual = false) => {
    if (notEqual === false) {
      expect(documentName.get(column).getText()).toEqual(toEqual);
    } else {
      expect(documentName.get(column).getText()).not.toEqual(toEqual);
    }
  }

  beforeEach(() => {
    browser.get('http://localhost:3000/documents');
    browser.sleep(browserSleep);
  });

  it('should contain document', () => {
    expectValue(0, 'Закон РБ О воинской обязанности и воинской службе Статья 17. Прием на воинский учет и снятие с воинского учета. Исключение с воинского учета');
    });

  it('should add document', () => {
    $('.add-field').sendKeys('Новое постановление'); //element(by.css('.add-field'))...
    $('.add-button').click();

    browser.sleep(browserSleep);

    expectValue(0, 'Новое постановление');
  });

  it('should edit document', () => {
    browser.actions().doubleClick(documentName.get(0)).perform(); //double click on element
    browser.sleep(500);

    documentName.get(0).$('textarea').clear().sendKeys('Супер новое постановление'); //clear input value and then send new value
    button.get(2).click();

    browser.sleep(browserSleep);

    expectValue(0, 'Супер новое постановление');
  });

  it('should remove document', () => {
    button.get(2).click();

    browser.sleep(browserSleep);

    expectValue(0, 'Супер новое постановление', true);
  });

});