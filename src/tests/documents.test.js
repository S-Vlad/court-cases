/* eslint-disable */

describe('documents', function() {
  it('documents', function() {
    browser.get('http://localhost:3000/documents');

    browser.sleep(1000);
    const documentName = $$('.table tr').get(2).$$('td'); //element.all(by.css('.table tr')).get(2)...;
    expect(documentName.get(0).getText()).toEqual('Закон РБ О воинской обязанности и воинской службе Статья 17. Прием на воинский учет и снятие с воинского учета. Исключение с воинского учета');

    $('.add-field').sendKeys('Новое постановление'); //element(by.css('.add-field'))...
    $('.add-button').click();
    browser.sleep(1000);
    expect(documentName.get(0).getText()).toEqual('Новое постановление');

    browser.actions().doubleClick(documentName.get(0)).perform(); //double click on element
    browser.sleep(500);
    documentName.get(0).$('textarea').clear().sendKeys('Супер новое постановление'); //clear input value and then send new value
    const button = $$('.table tr').get(2).$$('td').get(2);
    button.click();
    browser.sleep(1000);
    expect(documentName.get(0).getText()).toEqual('Супер новое постановление');

    button.click();
    browser.sleep(1000);
    expect(documentName.get(0).getText()).not.toEqual('Супер новое постановление');
  });
});