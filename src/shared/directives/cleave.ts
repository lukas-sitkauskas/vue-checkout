import Cleave from 'cleave.js'
import type { CleaveHTMLInputElement } from '@/shared/types/cleave'

export const vCleave = {
  mounted(el: CleaveHTMLInputElement, { value }: { value: object }) {
    el._cleave = new Cleave(el, value)
  },
  beforeUnmount(el: CleaveHTMLInputElement) {
    el._cleave?.destroy()
  },
}
