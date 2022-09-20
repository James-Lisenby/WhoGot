document.addEventListener('DOMContentLoaded', () => {
  function buttonHandler() {
    document.location.replace('/');
  }

  document.querySelector('.home_btn').addEventListener('click', buttonHandler);
});
