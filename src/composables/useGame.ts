import type { GameElementIndexed, GameElement, GameElementStyled } from "@/model/game.model";
import { ref } from "vue";

export default function useGame() {
  const fieldList = ref<GameElementIndexed[]>([]);
  let fieldCounter = 0;
  const getKey = (item: GameElement, index: number) => {
    return `${item.id}-${index}`;
  }
  const replaceElements = (oldList: GameElementStyled[], newList: GameElement[]) => {
    const toAdd = [...newList];
    oldList.forEach((old, i) => {
      const replacer = toAdd.splice(i, 1).at(0);
      const oldIndex = fieldList.value.findIndex(el => el.key === old.key);
      if (replacer) {
        fieldCounter++;
        const replacerFinal = {
          ...old,
          ...replacer,
          x: old.x + i * old.size,
          y: old.y + i * old.size,
          index: fieldCounter,
          key: getKey(replacer, fieldCounter),
        };
        if (oldIndex > -1) fieldList.value.splice(oldIndex, 1, replacerFinal);
        else fieldList.value.push(replacerFinal);
      } else if (oldIndex > -1) fieldList.value.splice(oldIndex, 1);
    });
    toAdd.forEach(item => {
      fieldCounter++;
      fieldList.value.push({
        ...item,
        index: fieldCounter,
        key: getKey(item, fieldCounter),
      });
    });
  }
  const addElements = (items: GameElement[]) => {
    items.forEach(item => {
      fieldCounter++;
      fieldList.value.push({
        ...item,
        index: fieldCounter,
        key: getKey(item, fieldCounter),
      });
    });
  }
  const duplicateElement = (item: GameElementStyled) => {
    fieldCounter++;
    const copy = {
      ...item,
      x: item.x + item.size,
      y: item.y + item.size,
      index: fieldCounter,
      key: getKey(item, fieldCounter),
    };
    fieldList.value.push(copy);
  }
  const deleteElement = (item: GameElementStyled) => {
    const itemIndex = fieldList.value.findIndex(el => el.key === item.key);
    if (itemIndex > -1) fieldList.value.splice(itemIndex, 1);
    if (!fieldList.value.length) fieldCounter = 0;
  }
  const clearField = () => {
    fieldList.value = [];
    fieldCounter = 0;
  }

  return {
    fieldList,
    addElements,
    replaceElements,
    duplicateElement,
    deleteElement,
    clearField,
  }
}