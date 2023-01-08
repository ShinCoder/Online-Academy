$(document).ready(function () {
  $('#search-form').submit(() => {
    if (!$('#category-search-check').is(':checked')) {
      document.querySelector('input[name="category"]').disabled = true;
      return true;
    }
  });

  $('#reset-btn').on('click', () => {
    $('#resetSort').submit();
  });

  $('#reset-filter-btn').on('click', () => {
    $('#resetFilter').submit();
  });
});
