/* eslint-disable */

describe('participants', () => {
  const browserSleep = 1000;
  const participant = $$('.table tr').get(2).$$('td');
  const button = $$('.table tr').get(2).$$('td');

  const expectValue = (column, toEqual, notEqual = false) => {
    if (notEqual === false) {
      expect(participant.get(column).getText()).toEqual(toEqual);
    } else {
      expect(participant.get(column).getText()).not.toEqual(toEqual);
    }
  }

  beforeEach(() => {
    browser.get('http://localhost:3000/participants');
    browser.sleep(browserSleep);
  });

  it('should contain participant in 1 string', () => {
    expectValue(0, 'Секунов А. А.');
  });

  it('should add new participant', () => {
    $('.add-participant-name').sendKeys('Новое имя');
    $('.add-participant-address').sendKeys('Новый адрес');
    $('.add-participant-phone').sendKeys('Новый телефон');
    $('.add-participant-type').sendKeys('Новая сторона');
    $('.add-button').click();

    browser.sleep(browserSleep);

    expectValue(0, 'Новое имя');
    expectValue(1, 'Новый адрес');
    expectValue(2, 'Новый телефон');
    expectValue(3, 'Новая сторона');
  });

  it('should edit participant', () => {
    browser.actions().doubleClick(participant.get(0)).perform();
    browser.sleep(500);

    participant.get(0).$('input').clear().sendKeys('Имя');
    participant.get(1).$('input').clear().sendKeys('Адрес');
    participant.get(2).$('input').clear().sendKeys('Телефон');
    participant.get(3).$('input').clear().sendKeys('Сторона');

    button.get(4).click();

    browser.sleep(browserSleep);

    expectValue(0, 'Имя');
    expectValue(1, 'Адрес');
    expectValue(2, 'Телефон');
    expectValue(3, 'Сторона');
  });

  it('should remove participant', () => {
    button.get(4).click();

    browser.sleep(browserSleep);

    expectValue(3, 'Сторона', true);
  });
});