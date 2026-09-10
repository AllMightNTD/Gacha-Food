import { describe, it, expect } from 'vitest'
import { defaultFoods } from '../src/data/defaultFoods.js'
import { punishmentList } from '../src/data/punishmentList.js'
import { coupleQuotes } from '../src/data/quotes.js'

describe('Data Specifications', () => {
  it('defaultFoods should contain at least 25 items with valid rarities and categories', () => {
    expect(defaultFoods.length).toBeGreaterThanOrEqual(25)
    defaultFoods.forEach(food => {
      expect(['SSR', 'SR', 'R']).toContain(food.rarity)
      expect(['hotpot', 'bbq', 'noodle', 'rice', 'snack', 'dessert']).toContain(food.category)
      expect(food.name).toBeTruthy()
      expect(food.icon).toBeTruthy()
      expect(food.id).toBeTruthy()
      expect(food.priceLevel).toBeTruthy()
    })
  })

  it('punishmentList should have at least 8 romantic punishments', () => {
    expect(punishmentList.length).toBeGreaterThanOrEqual(8)
    punishmentList.forEach(p => {
      expect(p.id).toBeTruthy()
      expect(p.title).toBeTruthy()
      expect(p.description).toBeTruthy()
      expect(p.icon).toBeTruthy()
    })
  })

  it('coupleQuotes should contain funny excuses and quotes', () => {
    expect(coupleQuotes.length).toBeGreaterThanOrEqual(5)
    coupleQuotes.forEach(q => {
      expect(q.text).toBeTruthy()
    })
  })
})
