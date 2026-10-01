export const AVAILABLE_CARD_ICONS = ['box', 'home', 'mail', 'phone', 'quote', 'stars', 'users'] as const
export type IconName = typeof AVAILABLE_CARD_ICONS[number]