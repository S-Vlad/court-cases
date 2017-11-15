/* eslint-disable */

describe('all-lawsuits', function() {
  it('all-lawsuits', function() {
    browser.get('http://localhost:3000/lawsuits');

    $('#search-field').sendKeys('Админ');
    $('.search-button').click();
    browser.sleep(1000);

    let searchResult = $$('.table tr').$$('td').get(2);
    expect(searchResult.getText()).toEqual('Административный');
    browser.sleep(1000);

    $('#search-field').clear().sendKeys('');
    $('.search-button').click();
    browser.sleep(1000);
    expect(searchResult.getText()).toEqual('Гражданский');
  });
});