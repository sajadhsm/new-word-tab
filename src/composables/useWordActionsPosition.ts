import storage from '@/modules/localStorage';

const ACTIONS_POSITION_STORAGE_KET = 'ap';

export enum ActionPositions {
  HORIZONTAL = "H",
  HORIZONTAL_REVERSED = "HR",
  VERTICAL = "V"
}

export const positionToNameMap = {
  [ActionPositions.HORIZONTAL]: "Horizontal",
  [ActionPositions.HORIZONTAL_REVERSED]: "Horizontal Reversed",
  [ActionPositions.VERTICAL]: "Vertical",
}

export default function useWordActionsPosition() {
  const actionsPosition = getActionsPositionFromStorage();

  function storeActionsPosition(position: ActionPositions) {
    storage.set(ACTIONS_POSITION_STORAGE_KET, position)
  }

  return { actionsPosition, storeActionsPosition }
}

function getActionsPositionFromStorage(fallbackPosition = ActionPositions.HORIZONTAL): ActionPositions {
  try {
    const localPosition = storage.get(ACTIONS_POSITION_STORAGE_KET) as ActionPositions | null;

    const isPositionValid = localPosition && Object.values(ActionPositions).includes(localPosition);

    return isPositionValid ? localPosition : fallbackPosition;
  } catch {
    return fallbackPosition;
  }
}