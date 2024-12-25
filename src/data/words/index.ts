import GMAT from './GMAT'
import GRE from './GRE'
import LONGMAN_3000 from './LONGMAN_3000'
import OXFORD_2000 from './OXFORD_2000'
import OXFORD_3000 from './OXFORD_3000'
import SAT from './SAT'
import TOEFL from './TOEFL'

export type WordList = keyof typeof WORDS

const WORDS = {
  GMAT: {
    name: 'GMAT',
    list: GMAT,
  },
  GRE: {
    name: 'GRE',
    list: GRE,
  },
  SAT: {
    name: 'SAT',
    list: SAT,
  },
  TOEFL: {
    name: 'TOEFL',
    list: TOEFL,
  },
  OXFORD_AB: {
    name: 'Oxford A1:B2',
    list: OXFORD_3000,
  },
  OXFORD_BC: {
    name: 'Oxford B2:C1',
    list: OXFORD_2000,
  },
  LONGMAN: {
    name: 'Longman',
    list: LONGMAN_3000,
  },
}

export default WORDS
