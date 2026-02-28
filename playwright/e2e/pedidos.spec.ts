import { test, expect } from '@playwright/test'

import { generateOrderCode } from '../support/helpers'

import { Navbar } from '../support/components/NavBar'

import { LandingPage } from '../support/pages/LandingPage'
import { OrderLockupPage,OrderDetails } from '../support/pages/OrderLockupPage'

/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {

  let orderLockupPage: OrderLockupPage

  test.beforeEach(async ({ page }) => {
    // Arrange
    await new LandingPage(page).goto()
    await new Navbar(page).orderLockupLink()

    orderLockupPage = new OrderLockupPage(page)
    orderLockupPage.validatePageLoaded()
  })

  test('deve consultar um pedido aprovado', async ({ page }) => {

    // Test Data
    const order: OrderDetails = {
      number: 'VLO-SUG3M1',
      status: 'APROVADO' as const,
      color: 'Lunar White',
      wheels: 'sport Wheels',
      customer: {
        name: 'Renee Azevedo',
        email: 'renee.moura@hotmail.com'
      },
      payment: 'À Vista'
    }

    // Act  
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order.number)

    // Assert
    orderLockupPage.validateOrderDetails(order)

    // Validação do badge de status encapsulada no Page Object
    await orderLockupPage.validateStatusBadge(order.status)

  })

  test('deve consultar um pedido reprovado', async ({ page }) => {

    // Test Data
    const order:OrderDetails = {
      number: 'VLO-3NO30X',
      status: 'REPROVADO' as const,
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Steve Jobs',
        email: 'steve@apple.com'
      },
      payment: 'À Vista'
    }

    // Act  
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order.number)

    // Assert
    orderLockupPage.validateOrderDetails(order)

    // Validação do badge de status encapsulada no Page Object
    await orderLockupPage.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido em analise', async ({ page }) => {

    // Test Data
    const order: OrderDetails = {
      number: 'VLO-4ZO0NW',
      status: 'EM_ANALISE' as const,
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'João Silva',
        email: 'joao@mock.com'
      },
      payment: 'À Vista'
    }

    // Act  
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order.number)

    // Assert
    orderLockupPage.validateOrderDetails(order)

    // Validação do badge de status encapsulada no Page Object
    await orderLockupPage.validateStatusBadge(order.status)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

    const order = generateOrderCode()

    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order)

    await orderLockupPage.validateOrderNotFound()

  })
  test('deve exibir mensagem quando o código do pedido está fora do padrão', async ({ page }) => {


    const orderCode = 'XYZ-999-INVALIDO'
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(orderCode)
    await orderLockupPage.validateOrderNotFound()
  })
})