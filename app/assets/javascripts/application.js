//
//= require_tree .
//= require bootstrap

$(document).ready(function() {
  // inputs
  $('input').input_focus();
  $('.navbar input').attr('autocomplete', 'off');

  // login
  $('.login').live('click', function(e) {
    e.preventDefault();
    login($('.username').val(), $('.password').val());
  });
  $('.password').keypress(function(e) {
    if(e.which == 13) {
      login($('.username').val(), $('.password').val());
    }
  });

  // register
  var register = true;
  $('#register').modal('hide');
  $('.hide-register, .show-register').live('click', function(e) {
    e.preventDefault();
    $('.register, #user_email, #user_password_confirmation, .have-account').toggle();
    register = !register
  });
  $('.signup').live('click', function(e) {
    if (register) {
      $('#new_user').submit();
    } else {
      login($('#user_username').val(), $('#user_password').val());
    }
  });
});

function login(email, password) {
  $.ajax({
    headers: {
      'X-Transaction': 'POST Example',
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    },
    data: { email: email, password: password},
    url: "/sessions",
    type: "post",
    dataType: 'json',
    success: function(e) {
      if (e.status == "failure") {
        $('.username, .password').addClass('failure');
        $('li.error').fadeIn();
      }
      if (e.status == "success" && e.redirect) {
        window.location.href = e.redirect;
      }
    }
  }); 
}
 
$.fn.input_focus = function() {
  return $(this).each(function() {
    var default_value = $(this).val();
    $(this).focus(function() {
      if($(this).val() == default_value) $(this).val("");
    }).blur(function(){
      if($(this).val().length == 0) $(this).val(default_value);
    });
  });
}
 
