// @ts-nocheck
'use strict'

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */
const { isDraft } = require('strapi-utils').contentTypes
const Stripe = require('stripe').default
const stripe = new Stripe(process.env.STRIPE_RESTRICTED, {
  apiVersion: '2020-08-27',
})

module.exports = {
  async create(data, { files } = {}) {
    const isDraftBool = isDraft(data, strapi.models.restaurant)
    const stripePrice = await stripe.prices.create({
      unit_amount: data.price,
      currency: 'cad',
      product_data: {
        name: data.name,
      },
    })
    const newData = {
      ...data,
      stripe_id: stripePrice.id,
    }
    const validData = await strapi.entityValidator.validateEntityCreation(
      strapi.models.product,
      newData,
      { isDraftBool }
    )

    const entry = await strapi.query('product').create(validData)

    if (files) {
      // automatically uploads the files based on the entry and the model
      await strapi.entityService.uploadFiles(entry, files, {
        model: 'product',
        // if you are using a plugin's model you will have to add the `source` key (source: 'users-permissions')
      })
      return this.findOne({ id: entry.id })
    }

    return entry
  },
}
