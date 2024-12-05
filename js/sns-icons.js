const callout = document.querySelector('.notion-callout');
const linkElement = callout.querySelector('.notion-callout__content a');
const iconElement = callout.querySelector('.notion-callout__icon img');

if (linkElement && iconElement) {
  callout.querySelector('.notion-callout__icon').addEventListener('click', () => {
    window.open(linkElement.href, '_blank');
  });

  iconElement.style.cursor = 'pointer';
}
