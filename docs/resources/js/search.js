$(document).ready(() => {
  if (window.location.href.includes('?')) {
    const search_term = getParameterByName('search');
    $('#search_val').val(search_term)
    highlight(search_term);
  }
  $('#search_val').focus(function() {
    $(document).keypress(function(e) {
      if (e.which == 13) {
        ($('#search_val').val() !== '')
          ? search()
          : '';
      }
    });
  });
});

const search = () => {
  const search_value = $('#search_val').val();
  window.location.href = `?search=${search_value}`;
}

const highlight = (value) => {
  const div_values = $('.container');
  const myHilitor = new Hilitor();
  myHilitor.apply(value);
}

const getParameterByName = (name, url) => {
  if (!url)
    url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
