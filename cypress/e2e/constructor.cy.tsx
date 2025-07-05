/// <reference types="cypress" />

// Из-за основного файла tsconfig.json и "types": ["node", "jest"], применить команды cypress не получилось, 
// поэтому использую константы

// Селекторы конструктора
const CONSTRUCTOR = {
  BUN_TOP: '[data-cy="constructor-bun-top"]',
  INGREDIENTS_LIST: '[data-cy="constructor-ingredients-list"]',
  INGREDIENT: '[data-cy="constructor-ingredient"]',
  SUBMIT_BUTTON: '[data-cy="submit-order-button"]'
};

// Селекторы модальных окон
const MODAL = {
  INGREDIENT: '[data-cy="ingredient-modal"]',
  ORDER: '[data-cy="order-modal"]',
  CLOSE_BUTTON: '[data-cy="modal-close-button"]',
};

describe('Конструктор бургера', () => {
  beforeEach(() => {
    // Загружаем моковые данные из fixtures
    cy.fixture('ingredients.json').then((ingredients) => {
      // Мокаем ответ API
      cy.intercept('GET', 'api/ingredients', {
        statusCode: 200,
        body: { success: true, data: ingredients }
      }).as('getIngredients');
    });
    // Переходим на страницу конструктора
    cy.visit('/');
    // Ждем загрузки ингредиентов
    cy.wait('@getIngredients');
  });

  it('должен отображать ингредиенты, полученные с API', () => {
    cy.get('#root').should('exist');
    cy.contains('Краторная булка N-200i').should('exist');
    cy.contains('Биокотлета из марсианской Магнолии').should('exist');
    cy.contains('Соус с шипами Антарианского плоскоходца').should('exist');
  });

  it('должен добавлять булку в конструктор по кнопке "добавить"', () => {
    // Находим булку и кликаем по кнопке внутри неё
    cy.contains('Краторная булка N-200i')
      .parent() // предполагаем, что название внутри обёртки с кнопкой
      .find('button') // или конкретный селектор: .add-button
      .click();
    
    // Проверяем, что булка появилась сверху
    cy.get(CONSTRUCTOR.BUN_TOP)
      .should('contain.text', 'Краторная булка N-200i');
  });

  it('должен добавлять начинку в конструктор по кнопке "добавить"', () => {
    cy.contains('Биокотлета из марсианской Магнолии')
      .parent()
      .find('button')
      .click();

    cy.get(CONSTRUCTOR.INGREDIENTS_LIST)
      .should('contain.text', 'Биокотлета из марсианской Магнолии');
  });

  it('должен добавлять соус в конструктор по кнопке "добавить"', () => {
    cy.contains('Соус с шипами Антарианского плоскоходца')
      .parent()
      .find('button')
      .click();

    cy.get(CONSTRUCTOR.INGREDIENTS_LIST)
      .should('contain.text', 'Соус с шипами Антарианского плоскоходца');
  });

});

describe('Модальные окна ингредиента', () => {
  beforeEach(() => {
    cy.fixture('ingredients.json').then((ingredients) => {
      cy.intercept('GET', 'api/ingredients', {
        statusCode: 200,
        body: { success: true, data: ingredients }
      }).as('getIngredients');
    });

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('должен открывать модальное окно ингредиента по клику', () => {
    cy.contains('Биокотлета из марсианской Магнолии').click();

    cy.get(MODAL.INGREDIENT).should('be.visible');
    cy.get('[data-cy="ingredient-title"]').should('contain.text', 'Биокотлета из марсианской Магнолии');
  });

  it('должен закрывать модальное окно ингредиента по клику на крестик', () => {
    cy.contains('Биокотлета из марсианской Магнолии').click();

    cy.get(MODAL.INGREDIENT).should('be.visible');
    cy.get(MODAL.CLOSE_BUTTON).click();
    cy.get(MODAL.INGREDIENT).should('not.exist');
  });

  it('должен закрывать модальное окно ингредиента по клику на оверлей', () => {
    cy.contains('Биокотлета из марсианской Магнолии').click();

    cy.get(MODAL.INGREDIENT).should('be.visible');
    cy.get('[data-cy="modal-overlay"]').click('topLeft', { force: true });
    cy.get(MODAL.INGREDIENT).should('not.exist');
  });
});

describe('Создание заказа на странице конструктора', () => {
 beforeEach(() => {
    // Моки данных
    cy.fixture('ingredients.json').then((ingredients) => {
      cy.intercept('GET', 'api/ingredients', {
        statusCode: 200,
        body: { success: true, data: ingredients }
      }).as('getIngredients');
    });

    // Моки авторизации
    cy.fixture('user.json').then((userData) => {
      cy.intercept('POST', 'api/auth/token', {
        statusCode: 200,
        body: { success: true, accessToken: 'mock-token' }
      }).as('refreshToken');
      
      cy.intercept('GET', 'api/auth/user', {
        statusCode: 200,
        body: userData
      }).as('getUser');
    });

    cy.fixture('order.json').then((orderData) => {
      cy.intercept('POST', 'api/orders', {
        statusCode: 200,
        body: orderData
      }).as('createOrder');
    });

    // Устанавливаем токены
    window.localStorage.setItem('accessToken', 'test-token');
    window.localStorage.setItem('refreshToken', 'test-refresh-token');

    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait('@refreshToken');
    cy.wait('@getUser');
  });

  afterEach(() => {
    // Очищаем токены после каждого теста
    cy.window().then((win) => {
      win.localStorage.removeItem('accessToken');
      win.localStorage.removeItem('refreshToken');
    });
    cy.clearCookies();
  });

  it('должен добавлять ингредиенты в конструктор', () => {
    // Добавляем булку
    cy.contains('Краторная булка N-200i')
      .parent()
      .find('button')
      .click();

    // Добавляем начинку
    cy.contains('Биокотлета из марсианской Магнолии')
      .parent()
      .find('button')
      .click();

    // Проверяем что добавлено
    cy.get(CONSTRUCTOR.BUN_TOP).should('exist');
    cy.get(CONSTRUCTOR.INGREDIENT).should('exist');
  });

  it('должен отображать модальное окно с номером заказа', () => {
    // Предварительно добавляем ингредиенты
    cy.contains('Краторная булка N-200i').parent().find('button').click();
    cy.contains('Биокотлета из марсианской Магнолии').parent().find('button').click();

    // Оформляем заказ и ждем ответа
    cy.get(CONSTRUCTOR.SUBMIT_BUTTON).click();
    cy.wait('@createOrder');
    
    // Проверяем модальное окно
    cy.get(MODAL.ORDER).should('be.visible');
    cy.get('[data-cy="order-number"]').should('contain', '123456');
  });

  it('должен закрывать модальное окно после создания заказа', () => {
    // Предварительные шаги
    cy.contains('Краторная булка N-200i').parent().find('button').click();
    cy.contains('Биокотлета из марсианской Магнолии').parent().find('button').click();
    cy.get(CONSTRUCTOR.SUBMIT_BUTTON).click();
    cy.wait('@createOrder');
    
    // Закрываем модальное окно
    cy.get(MODAL.CLOSE_BUTTON).click();
    cy.get(MODAL.ORDER).should('not.exist');
  });

  it('должен очищать конструктор после создания заказа', () => {
    // Предварительные шаги
    cy.contains('Краторная булка N-200i').parent().find('button').click();
    cy.contains('Биокотлета из марсианской Магнолии').parent().find('button').click();
    cy.get(CONSTRUCTOR.SUBMIT_BUTTON).click();
    cy.wait('@createOrder');
    cy.get(MODAL.CLOSE_BUTTON).click();
    
    // Проверяем очистку конструктора
    cy.get('[data-cy="no-bun-placeholder"]').should('exist');
    cy.get(CONSTRUCTOR.INGREDIENT).should('not.exist');
  });
});