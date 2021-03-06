import {INGREDIENTS_ENDPOINT, USER_AUTH_ENDPOINT} from "../../../src/utils/api-сonstants";

describe('app constructor tests', function () {
    beforeEach(function () {
        // Эмулируем логин юзера
        cy.intercept('GET', USER_AUTH_ENDPOINT, {
            success: true, user: {
                email: "test@test.re",
                name: "TestUser",
                password: undefined,
            }
        });

        // Ждем ингредиентов
        cy.intercept('GET', INGREDIENTS_ENDPOINT).as('getIngredients');
        cy.visit('http://localhost:3000');
        cy.wait('@getIngredients');
    });

    it('Проверка конструктора по умолчанию', function () {
        // Нужный хэдер
        cy.contains('Соберите бургер');

        // Линк активен
        cy.get('nav > a').first().should('have.class', 'active')

        // Конструктор пустой
        cy.get('article[class^=burger-constructor_ingredientsContainer__]').first().as('selectedConstructor');

        cy.get('@selectedConstructor').should('contain', 'Положите булку сюда');
        cy.get('@selectedConstructor').should('contain', 'Положите ингредиенты сюда');

        // Кнопка выключена
        cy.get('div[class^=summary_summary__] > button').should('be.disabled');
        // Сумма 0
        cy.get('div[class^=summary_summary__] > div').first().should('contain', 0);
    });

    it('Открытие модального окна с описанием ингредиента и закрытие по нажатию на кнопку', function () {
        // Жмем на один из них
        cy.get('[data-cy=bun-ingredient]').first().as('firstIngredient');
        cy.get('@firstIngredient').click();

        // Проверяем модалку
        cy.get('div[class^=modal_modal__]').as('modal');
        cy.get('@modal').should('contain', 'Детали ингредиента');
        cy.get('@modal').should('contain', 'Калории,ккал');
        cy.get('@modal').should('contain', 'Белки, г');
        cy.get('@modal').should('contain', 'Жиры, г');
        cy.get('@modal').should('contain', 'Углеводы, г');

        // Закрываем её
        cy.get('div[class^=modal_header__] > svg').as('closeButton');
        cy.get('@closeButton').click();
        cy.get('@modal').should('not.exist');
    });

    it('Открытие модального окна с описанием ингредиента и закрытие по нажатию на overlay', function () {
        // Жмем на один из них
        cy.get('[data-cy=bun-ingredient]').first().as('firstIngredient');
        cy.get('@firstIngredient').click();

        // Проверяем модалку
        cy.get('div[class^=modal_modal__]').as('modal');
        cy.get('@modal').should('contain', 'Детали ингредиента');
        cy.get('@modal').should('contain', 'Калории,ккал');
        cy.get('@modal').should('contain', 'Белки, г');
        cy.get('@modal').should('contain', 'Жиры, г');
        cy.get('@modal').should('contain', 'Углеводы, г');

        // Закрываем её
        cy.get('section[class^=modal-overlay_overlay__]').as('closeOverlay');
        cy.get('@closeOverlay').click({force: true});
        cy.get('@modal').should('not.exist');
    });

    it('Открытие модального окна с описанием ингредиента и закрытие по esc', function () {
        // Жмем на один из них
        cy.get('[data-cy=bun-ingredient]').first().as('firstIngredient');
        cy.get('@firstIngredient').click();

        // Проверяем модалку
        cy.get('div[class^=modal_modal__]').as('modal');
        cy.get('@modal').should('contain', 'Детали ингредиента');
        cy.get('@modal').should('contain', 'Калории,ккал');
        cy.get('@modal').should('contain', 'Белки, г');
        cy.get('@modal').should('contain', 'Жиры, г');
        cy.get('@modal').should('contain', 'Углеводы, г');

        // Закрываем её
        cy.get('body').type('{esc}');
        cy.get('@modal').should('not.exist');
    });

    it('Перетаскивание булки в конструкторе на верхний элемент', function () {
        // Берем ингредиент
        cy.get('[data-cy=bun-ingredient]').first().as('firstBun');
        cy.get('@firstBun')
            .trigger("dragstart")
            .trigger("dragleave");

        // Дропаем
        cy.get('div[class^=burger-constructor_topBun__]').first().as('topBun');
        cy.get('@topBun')
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop")
            .trigger("dragend");

        // Текст исчезает
        cy.get('article[class^=burger-constructor_ingredientsContainer__]').first().as('selectedConstructor');
        cy.get('@selectedConstructor').should('not.contain', 'Положите булку сюда');
    });

    it('Перетаскивание булки в конструкторе на нижний элемент', function () {
        // Берем ингредиент
        cy.get('[data-cy=bun-ingredient]').last().as('lastBun');
        cy.get('@lastBun')
            .trigger("dragstart")
            .trigger("dragleave");

        // Дропаем
        cy.get('div[class^=burger-constructor_bottomBun__]').first().as('bottomBun');
        cy.get('@bottomBun')
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop")
            .trigger("dragend");

        // Текст исчезает
        cy.get('article[class^=burger-constructor_ingredientsContainer__]').first().as('selectedConstructor');
        cy.get('@selectedConstructor').should('not.contain', 'Положите булку сюда');
    });

    it('Перетаскивание ингредиентов разных типов в конструкторе', function () {
        // Берем ингредиент
        cy.get('[data-cy=bun-ingredient]').last().as('lastBun');
        cy.get('@lastBun')
            .trigger("dragstart")
            .trigger("dragleave");

        // Дропаем
        cy.get('div[class^=burger-constructor_bottomBun__]').first().as('bottomBun');
        cy.get('@bottomBun')
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop")
            .trigger("dragend");

        // Текст ещё есть - булку нельзя дропнуть сюда
        cy.get('article[class^=burger-constructor_ingredientsContainer__]').first().as('selectedConstructor');
        cy.get('@selectedConstructor').should('contain', 'Положите ингредиенты сюда');

        // Берем ингредиент
        cy.get('[data-cy=main-ingredient]').first().as('ingredientMain');
        cy.get('@ingredientMain')
            .trigger("dragstart")
            .trigger("dragleave");

        // Дропаем
        cy.get('ul[class^=burger-constructor_list__]').first().as('dropPlace');
        cy.get('@dropPlace')
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop")
            .trigger("dragend");

        // Берем соус
        cy.get('[data-cy=sauce-ingredient]').first().as('ingredientSauce');
        cy.get('@ingredientSauce')
            .trigger("dragstart")
            .trigger("dragleave");

        // Дропаем
        cy.get('@dropPlace')
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop")
            .trigger("dragend");

        // Текст исчезает
        cy.get('@selectedConstructor').should('not.contain', 'Положите ингредиенты сюда');
    });

    it('Оформить заказ', function () {
        // Берем булку
        cy.get('[data-cy=bun-ingredient]').first().as('firstBun');
        cy.get('@firstBun')
            .trigger("dragstart")
            .trigger("dragleave");

        // Дропаем
        cy.get('div[class^=burger-constructor_topBun__]').first().as('topBun');
        cy.get('@topBun')
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop")
            .trigger("dragend");

        // Берем ингредиент
        cy.get('[data-cy=main-ingredient]').first().as('ingredientMain');
        cy.get('@ingredientMain')
            .trigger("dragstart")
            .trigger("dragleave");

        // Дропаем
        cy.get('ul[class^=burger-constructor_list__]').first().as('dropPlace');
        cy.get('@dropPlace')
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop")
            .trigger("dragend");

        // Берем соус
        cy.get('[data-cy=sauce-ingredient]').first().as('ingredientSauce');
        cy.get('@ingredientSauce')
            .trigger("dragstart")
            .trigger("dragleave");

        // Дропаем
        cy.get('@dropPlace')
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop")
            .trigger("dragend");

        // Нажатие кнопки
        cy.get('div[class^=summary_summary__] > button').as('orderButton')
        cy.get('@orderButton').should('not.be.disabled');
        cy.get('@orderButton').click();

        // Проверяем модалку
        cy.get('div[class^=modal_modal__]').as('modal');
        cy.get('@modal').contains("идентификатор заказа");

        // Закрываем её
        cy.get('section[class^=modal-overlay_overlay__]').as('closeOverlay');
        cy.get('@closeOverlay').click({force: true});
        cy.get('@modal').should('not.exist');

        // Бургер очищается
        cy.get('article[class^=burger-constructor_ingredientsContainer__]').first().as('selectedConstructor');
        cy.get('@selectedConstructor').should('contain', 'Положите булку сюда');
        cy.get('@selectedConstructor').should('contain', 'Положите ингредиенты сюда');
    });
});