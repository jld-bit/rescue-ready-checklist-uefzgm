
export interface ChecklistItemType {
  id: string;
  label: string;
  checked: boolean;
  isCustom?: boolean;
}

export const DEFAULT_FIRE_ITEMS: ChecklistItemType[] = [
  { id: 'fire-1', label: 'Fire Extinguisher', checked: false },
  { id: 'fire-2', label: 'Smoke Detectors (tested)', checked: false },
  { id: 'fire-3', label: 'Emergency Escape Plan', checked: false },
  { id: 'fire-4', label: 'Flashlight', checked: false },
  { id: 'fire-5', label: 'First Aid Kit', checked: false },
  { id: 'fire-6', label: 'Emergency Contact List', checked: false },
  { id: 'fire-7', label: 'Whistle', checked: false },
  { id: 'fire-8', label: 'Fire Blanket', checked: false },
  { id: 'fire-9', label: 'Battery-powered Radio', checked: false },
  { id: 'fire-10', label: 'Extra Batteries', checked: false },
];

export const DEFAULT_EARTHQUAKE_ITEMS: ChecklistItemType[] = [
  { id: 'earthquake-1', label: '3-day Water Supply', checked: false },
  { id: 'earthquake-2', label: '3-day Food Supply', checked: false },
  { id: 'earthquake-3', label: 'First Aid Kit', checked: false },
  { id: 'earthquake-4', label: 'Flashlight & Extra Batteries', checked: false },
  { id: 'earthquake-5', label: 'Battery-powered Radio', checked: false },
  { id: 'earthquake-6', label: 'Emergency Whistle', checked: false },
  { id: 'earthquake-7', label: 'Dust Masks', checked: false },
  { id: 'earthquake-8', label: 'Plastic Sheeting & Duct Tape', checked: false },
  { id: 'earthquake-9', label: 'Wrench or Pliers', checked: false },
  { id: 'earthquake-10', label: 'Manual Can Opener', checked: false },
  { id: 'earthquake-11', label: 'Local Maps', checked: false },
  { id: 'earthquake-12', label: 'Cell Phone with Chargers', checked: false },
];

export const DEFAULT_FLOOD_ITEMS: ChecklistItemType[] = [
  { id: 'flood-1', label: '3-day Water Supply', checked: false },
  { id: 'flood-2', label: '3-day Food Supply', checked: false },
  { id: 'flood-3', label: 'First Aid Kit', checked: false },
  { id: 'flood-4', label: 'Waterproof Flashlight', checked: false },
  { id: 'flood-5', label: 'Battery-powered Radio', checked: false },
  { id: 'flood-6', label: 'Waterproof Bags', checked: false },
  { id: 'flood-7', label: 'Life Jackets', checked: false },
  { id: 'flood-8', label: 'Rubber Boots', checked: false },
  { id: 'flood-9', label: 'Emergency Whistle', checked: false },
  { id: 'flood-10', label: 'Important Documents (waterproof container)', checked: false },
  { id: 'flood-11', label: 'Sandbags', checked: false },
  { id: 'flood-12', label: 'Water Purification Tablets', checked: false },
];

export const DEFAULT_HURRICANE_ITEMS: ChecklistItemType[] = [
  { id: 'hurricane-1', label: '3-day Water Supply', checked: false },
  { id: 'hurricane-2', label: '3-day Food Supply', checked: false },
  { id: 'hurricane-3', label: 'First Aid Kit', checked: false },
  { id: 'hurricane-4', label: 'Flashlight & Extra Batteries', checked: false },
  { id: 'hurricane-5', label: 'Battery-powered Radio', checked: false },
  { id: 'hurricane-6', label: 'Emergency Whistle', checked: false },
  { id: 'hurricane-7', label: 'Plastic Sheeting & Duct Tape', checked: false },
  { id: 'hurricane-8', label: 'Plywood for Windows', checked: false },
  { id: 'hurricane-9', label: 'Generator (if available)', checked: false },
  { id: 'hurricane-10', label: 'Fuel for Generator', checked: false },
  { id: 'hurricane-11', label: 'Important Documents (waterproof)', checked: false },
  { id: 'hurricane-12', label: 'Cash & Credit Cards', checked: false },
  { id: 'hurricane-13', label: 'Medications', checked: false },
  { id: 'hurricane-14', label: 'Pet Supplies', checked: false },
];

export const DEFAULT_POWEROUTAGE_ITEMS: ChecklistItemType[] = [
  { id: 'power-1', label: 'Flashlights', checked: false },
  { id: 'power-2', label: 'Extra Batteries', checked: false },
  { id: 'power-3', label: 'Battery-powered Radio', checked: false },
  { id: 'power-4', label: 'Candles & Matches', checked: false },
  { id: 'power-5', label: 'Portable Phone Chargers', checked: false },
  { id: 'power-6', label: 'Non-perishable Food', checked: false },
  { id: 'power-7', label: 'Manual Can Opener', checked: false },
  { id: 'power-8', label: 'Bottled Water', checked: false },
  { id: 'power-9', label: 'First Aid Kit', checked: false },
  { id: 'power-10', label: 'Blankets', checked: false },
  { id: 'power-11', label: 'Generator (if available)', checked: false },
  { id: 'power-12', label: 'Fuel for Generator', checked: false },
  { id: 'power-13', label: 'Ice Packs for Cooler', checked: false },
];

export const getDefaultItems = (category: string): ChecklistItemType[] => {
  switch (category) {
    case 'fire':
      return DEFAULT_FIRE_ITEMS;
    case 'earthquake':
      return DEFAULT_EARTHQUAKE_ITEMS;
    case 'flood':
      return DEFAULT_FLOOD_ITEMS;
    case 'hurricane':
      return DEFAULT_HURRICANE_ITEMS;
    case 'poweroutage':
      return DEFAULT_POWEROUTAGE_ITEMS;
    default:
      return [];
  }
};
