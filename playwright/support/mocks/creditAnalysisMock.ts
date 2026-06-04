import { Page } from '@playwright/test'

const CREDIT_ANALYSIS_ROUTE = '**/functions/v1/credit-analysis'

export async function mockCreditAnalysis(page: Page, score: number) {
    await page.route(CREDIT_ANALYSIS_ROUTE, async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                status: 'Done',
                score,
            }),
        })
    })
}
