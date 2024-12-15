import { DirectiveBinding } from 'vue';

interface HTMLElement {
  clickOutsideEvent?: (event: MouseEvent) => void;
}

const clickOutsideDirective = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    el.clickOutsideEvent = (event: MouseEvent) => {
      // Check if the click was outside the element
      if (
        !(el === event.target || (el as Element).contains(event.target as Node))
      ) {
        // Call the provided method
        binding.value(event);
      }
    };
    document.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el: HTMLElement) {
    if (el.clickOutsideEvent) {
      document.removeEventListener('click', el.clickOutsideEvent);
    }
  },
};

export default clickOutsideDirective;
