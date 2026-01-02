
export interface ChecklistItemType {
  id: string;
  label: string;
  checked: boolean;
  isCustom?: boolean;
}

const fireItems: ChecklistItemType[] = [
  { id: 'fire-1', label: 'Fire Extinguisher', checked: false },
  { id: 'fire-2', label: 'Smoke Detectors (tested)', checked: false },
  { id: 'fire-3', label: 'Escape Plan', checked: false },
  { id: 'fire-4', label: 'Emergency Contact List', checked: false },
  { id: 'fire-5', label: 'Flashlight', checked: false },
];

const earthquakeItems: ChecklistItemType[] = [
  { id: 'earthquake-1', label: 'Emergency Kit', checked: false },
  { id: 'earthquake-2', label: '3-Day Water Supply', checked: false },
  { id: 'earthquake-3', label: 'First Aid Kit', checked: false },
  { id: 'earthquake-4', label: 'Battery Radio', checked: false },
  { id: 'earthquake-5', label: 'Sturdy Shoes', checked: false },
];

const floodItems: ChecklistItemType[] = [
  { id: 'flood-1', label: 'Sandbags', checked: false },
  { id: 'flood-2', label: 'Waterproof Containers', checked: false },
  { id: 'flood-3', label: 'Evacuation Route Map', checked: false },
  { id: 'flood-4', label: 'Important Documents (waterproofed)', checked: false },
  { id: 'flood-5', label: 'Life Jackets', checked: false },
];

const hurricaneItems: ChecklistItemType[] = [
  { id: 'hurricane-1', label: 'Plywood for Windows', checked: false },
  { id: 'hurricane-2', label: '7-Day Food Supply', checked: false },
  { id: 'hurricane-3', label: 'Generator', checked: false },
  { id: 'hurricane-4', label: 'Fuel for Generator', checked: false },
  { id: 'hurricane-5', label: 'Battery-Powered Lights', checked: false },
];

const powerOutageItems: ChecklistItemType[] = [
  { id: 'power-1', label: 'Flashlights', checked: false },
  { id: 'power-2', label: 'Extra Batteries', checked: false },
  { id: 'power-3', label: 'Candles & Matches', checked: false },
  { id: 'power-4', label: 'Portable Phone Charger', checked: false },
  { id: 'power-5', label: 'Non-Perishable Food', checked: false },
];

export function getDefaultItems(category: string): ChecklistItemType[] {
  switch (category) {
    case 'fire':
      return JSON.parse(JSON.stringify(fireItems));
    case 'earthquake':
      return JSON.parse(JSON.stringify(earthquakeItems));
    case 'flood':
      return JSON.parse(JSON.stringify(floodItems));
    case 'hurricane':
      return JSON.parse(JSON.stringify(hurricaneItems));
    case 'poweroutage':
      return JSON.parse(JSON.stringify(powerOutageItems));
    default:
      return [];
  }
}
