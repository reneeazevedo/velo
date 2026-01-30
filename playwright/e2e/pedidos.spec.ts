import { test, expect } from '@playwright/test';

// AAA - Arrange, Act, Assert
// PAV - Preparar, Agir, Verificar
test('deve consultar um pedido aprovado', async ({ page }) => {
  //test Data
  const order = 'VLO-SUG3M1'

  // Arrange
  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  // Act
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order);
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();

  // Assert
  const orderCode = page.locator('//p[text()="Pedido"]/../p[text()="VLO-SUG3M1"]')
  await expect(orderCode).toBeVisible({timeout:10_000});

  const containerPedido =page.getByRole('paragraph')
    .filter({hasText:/^Pedido$/})
    .locator('..')//Sobre para o elemento pai (a div que agrupa ambas)

  await expect(containerPedido).toContainText(order,{ timeout: 10_000})


  
});

test('deve exibir mensagem quando o pedido não é encontrado', async ({page}) => {

  const order = 'VLO-ABC123'

  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order);
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();

  await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - img
    - heading "Pedido não encontrado" [level=3]
    - paragraph: Verifique o número do pedido e tente novamente
    `);

})