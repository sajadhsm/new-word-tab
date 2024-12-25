import { computed, ref } from 'vue'

import MdiSortAlphabeticalAscending from '~icons/mdi/sort-alphabetical-ascending'
import MdiSortAlphabeticalDescending from '~icons/mdi/sort-alphabetical-descending'
import MdiSortClockAscending from '~icons/mdi/sort-clock-ascending'
import MdiSortClockDescending from '~icons/mdi/sort-clock-descending'

const SORT_STATES = [
  {
    text: 'Time - Ascending',
    icon: MdiSortClockAscending,
    sortMethod: (list: string[]) => list,
  },
  {
    text: 'Time - Descending',
    icon: MdiSortClockDescending,
    sortMethod: (list: string[]) => list.reverse(),
  },
  {
    text: 'Alphabet - Ascending',
    icon: MdiSortAlphabeticalAscending,
    sortMethod: (list: string[]) => list.sort((a, b) => a.localeCompare(b)),
  },
  {
    text: 'Alphabet - Descending',
    icon: MdiSortAlphabeticalDescending,
    sortMethod: (list: string[]) => list.sort((a, b) => b.localeCompare(a)),
  },
]

export default function useSort() {
  const sortState = ref(0)

  const sortStateMeta = computed(() => SORT_STATES[sortState.value])

  function setNextSortState() {
    sortState.value = (sortState.value + 1) % SORT_STATES.length
  }

  return {
    sortStateMeta,
    setNextSortState,
  }
}
