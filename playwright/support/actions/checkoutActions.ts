import { Page, expect } from '@playwright/test'

export type CheckoutSummaryOptional = {
  label: string
  price: string
}

export type CheckoutSummary = {
  color: string
  interior: string
  wheels: string
  optionals?: CheckoutSummaryOptional[]
}

export function createCheckoutActions(page: Page) {
  const summaryCard = () => page.getByRole('heading', { name: 'Resumo' }).locator('..')

  const summaryRow = (label: string) =>
    summaryCard().locator('li').filter({
      has: page.locator('span', { hasText: label, exact: true }),
    })

  return {
    async expectPageVisible() {
      await expect(page.getByRole('heading', { name: 'Finalizar Pedido' })).toBeVisible()
    },

    async expectTotalPrice(price: string) {
      await expect(page.getByTestId('summary-total-price')).toHaveText(price)
    },

    async expectSummary(summary: CheckoutSummary) {
      const card = summaryCard()
      await expect(card.getByRole('heading', { name: 'Resumo' })).toBeVisible()
      await expect(card.getByRole('heading', { name: 'Velô Sprint', level: 3 })).toBeVisible()

      await expect(summaryRow('Cor').locator('span').last()).toHaveText(summary.color)
      await expect(summaryRow('Interior').locator('span').last()).toHaveText(summary.interior)
      await expect(summaryRow('Rodas').locator('span').last()).toHaveText(summary.wheels)

      if (summary.optionals?.length === 0) {
        await expect(card.getByText('Precision Park')).not.toBeVisible()
        await expect(card.getByText('Flux Capacitor')).not.toBeVisible()
      } else {
        for (const optional of summary.optionals ?? []) {
          const row = card.locator('li').filter({ has: card.getByText(optional.label) })
          await expect(row).toBeVisible()
          await expect(row.locator('span').last()).toHaveText(optional.price)
        }
      }
    },

    async expectFinalizeOrderForm() {
      await expect(page.getByRole('heading', { name: 'Dados Pessoais' })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Forma de Pagamento' })).toBeVisible()
      await expect(page.getByTestId('checkout-name')).toBeVisible()
      await expect(page.getByTestId('checkout-terms')).toBeVisible()
      await expect(page.getByTestId('payment-avista')).toBeVisible()
      await expect(page.getByTestId('payment-financiamento')).toBeVisible()
      await expect(page.getByTestId('checkout-submit')).toBeEnabled()
      await expect(page.getByTestId('checkout-submit')).toHaveText('Confirmar Pedido')
    },
  }
}
