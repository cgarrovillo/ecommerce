/**
 * Formats a unit_amount for display as a whole integer.
 * @param unit_amount
 * @param currency
 */
export function formatAmountForDisplay(unit_amount: number, currency: string = 'CAD'): string {
  if (!unit_amount) {
    return ''
  }

  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  const amt = integerToCents(unit_amount)
  return numberFormat
    .format(amt)
    .toString()
    .replace(/[a-zA-Z]*/i, '')
}

/**
 * Formats a unit_amount for display as a decimal.
 * @param unit_amount
 * @param currency
 */
export function formatAmountForDisplayDecimal(unit_amount: number, currency: string = 'CAD'): string {
  if (!unit_amount) return ''

  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  })
  const amt = integerToCents(unit_amount)
  return numberFormat
    .format(amt)
    .toString()
    .replace(/[a-zA-Z]*/i, '')
}

/**
 * Converts a unit_amount integer to a String containing the Dollar & Cent amount
 * @param unit_amount The unit_amount integer to convert.
 */
function integerToCents(unit_amount: number): number {
  const dollar = unit_amount.toString().substr(0, unit_amount.toString().length - 2)
  const cents = unit_amount
    .toString()
    .substr(unit_amount.toString().length - 2, unit_amount.toString().length)
  return Number(`${dollar}.${cents}`)
}

export function formatAmountForStripe(amount: number, currency: string): number {
  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  })
  const parts = numberFormat.formatToParts(amount)
  let zeroDecimalCurrency: boolean = true
  for (let part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100)
}
