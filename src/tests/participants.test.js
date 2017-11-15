/* eslint-disable */

describe('participants', function() {
  it('participants', function() {
    browser.get('http://localhost:3000/participants');

    browser.sleep(1000);
    const participant = $$('.table tr').get(2).$$('td');
    expect(participant.get(0).getText()).toEqual('Секунов А. А.');

    $('.add-participant-name').sendKeys('Новое имя');
    $('.add-participant-address').sendKeys('Новый адрес');
    $('.add-participant-phone').sendKeys('Новый телефон');
    $('.add-participant-type').sendKeys('Новая сторона');
    $('.add-button').click();
    browser.sleep(1000);
    expect(participant.get(0).getText()).toEqual('Новое имя');
    expect(participant.get(1).getText()).toEqual('Новый адрес');
    expect(participant.get(2).getText()).toEqual('Новый телефон');
    expect(participant.get(3).getText()).toEqual('Новая сторона');

    browser.actions().doubleClick(participant.get(0)).perform();
    browser.sleep(500);
    participant.get(0).$('input').clear().sendKeys('Имя');
    participant.get(1).$('input').clear().sendKeys('Адрес');
    participant.get(2).$('input').clear().sendKeys('Телефон');
    participant.get(3).$('input').clear().sendKeys('Сторона');
    const button = $$('.table tr').get(2).$$('td').get(4);
    button.click();
    browser.sleep(1000);
    expect(participant.get(0).getText()).toEqual('Имя');
    expect(participant.get(1).getText()).toEqual('Адрес');
    expect(participant.get(2).getText()).toEqual('Телефон');
    expect(participant.get(3).getText()).toEqual('Сторона');

    button.click();
    browser.sleep(1000);
    expect(participant.get(0).getText()).not.toEqual('Имя');
  });
});