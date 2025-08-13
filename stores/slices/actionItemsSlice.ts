// Action items utilities and types

export type ActionItemType = {
  id: string;
  type: "LINK_LIST" | "OTHER_ACTION";
  config: {
    title?: string;
    links?: { title: string; url: string; icon?: string }[];
  };
  order: number;
};

export const defaultActionItems: ActionItemType[] = [
  {
    id: "default",
    order: 0,
    type: "LINK_LIST",
    config: {
      links: [
        { title: "Link 1", url: "" },
        { title: "Link 2", url: "" },
        { title: "Link 3", url: "" },
        { title: "Link 4", url: "" },
      ],
    },
  },
];

// Action item utilities
export function isTemporaryId(id: string): boolean {
  return id === "default" || id.startsWith("temp_");
}

export function generateTempId(): string {
  return `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function sortActionItems(items: ActionItemType[]): ActionItemType[] {
  return [...items].sort((a, b) => a.order - b.order);
}

export function isValidActionItem(item: ActionItemType): boolean {
  return (
    typeof item.id === 'string' &&
    item.id.length > 0 &&
    ['LINK_LIST', 'OTHER_ACTION'].includes(item.type) &&
    typeof item.order === 'number'
  );
}