<template>
  <div class="op-section">
    <h2 class="op-section__title">Vocabulary lists</h2>
    <p class="op-section__subtitle">
      Select the vocabulary lists that you would like to get a random word from.
    </p>

    <ul class="vocab-list">
      <li
        v-for="(listValue, listKey) in WORD_LISTS"
        :key="listKey"
        class="vocab-list__item"
      >
        <label class="checkbox">
          <b class="vocab-list__item__name">{{ listValue.name }}</b>
          <small class="vocab-list__item__count">
            ({{ listValue.list.length }} words)
          </small>

          <input v-model="selectedListKeys" type="checkbox" :value="listKey" />
          <span class="checkmark"></span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import WORD_LISTS from '@/data/words';

import useWordLists from '@/composables/useWordLists';

export default {
  name: 'VocabularyLists',

  setup() {
    const { selectedListKeys } = useWordLists();

    return { selectedListKeys, WORD_LISTS };
  },
};
</script>

<style scoped>
.vocab-list {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
}
.vocab-list__item {
  display: flex;
  align-items: center;
  flex-basis: 50%;
  padding: 5px 0;
}

@media all and (max-width: 320px) {
  .vocab-list__item {
    flex-basis: 100%;
  }
}

.vocab-list__item__name {
  margin-right: 5px;
}

.vocab-list__item__count {
  color: #666;
}

.checkbox {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  padding-left: 25px;
  cursor: pointer;
  font-size: 0.8rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: -3px;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: #eee;
  border-radius: 5px;
}

.checkbox:hover input ~ .checkmark {
  background-color: #ccc;
}

.checkbox input:checked ~ .checkmark {
  background-color: #191919;
}

.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

.checkbox input:checked ~ .checkmark:after {
  display: block;
}

.checkbox .checkmark:after {
  left: 7px;
  top: 4px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
