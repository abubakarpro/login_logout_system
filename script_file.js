$(document).ready(function() {
  const current_location = window.location.href;
  const islogin = localStorage.getItem("login");

  if (current_location.indexOf("login_form.html") >= 0 && islogin === "true") {
    window.location = "welcome_page.html";
    return;
  } else if (
    current_location.indexOf("welcome_page.html") >= 0 &&
    islogin != "true"
  ) {
    window.location = "login_form.html";
    return;
  }
  $("body").show();

  const login = $("#login");
  const login_result = $("#login-result");

  const signup = $("#signup");
  const signup_result = $("#signup-result");

  var signup_error = [];
  var login_error = [];

  //   SignUp_form_functionality

  $("#signup-form").submit(function(e) {
    e.preventDefault();
    $(signup_result).empty();

    const firstname = $("#firstname").val();
    const lastname = $("#lastname").val();
    const signup_username = $("#signup-username").val();
    const signup_password = $("#signup-password").val();
    const email = $("#email").val();

    if (!firstname) {
      signup_error.push("First Name field is Invalid");
    }
    if (!lastname) {
      signup_error.push("Last Name field is Invalid");
    }
    if (!signup_username) {
      signup_error.push("User Name field is Invalid");
    }
    if (!signup_password) {
      signup_error.push("Password field is Invalid");
    }
    if (!email) {
      signup_error.push("Email field is Invalid");
    }

    if (signup_error.length) {
      var ul = $("<ul></ul>");
      signup_error.forEach(element => {
        const li = $("<li>" + element + "</li>");
        ul.append(li);
      });
      signup_error = [];
      $(signup_result).empty();
      signup_result.append(ul).css({
        color: "red",
        margin: "10px 10px 0px 18px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      });
    } else {
      //Local_Storage
      const person = {
        firstname: firstname,
        lastname: lastname,
        signup_username: signup_username,
        signup_password: signup_password,
        email: email
      };

      localStorage.setItem(signup_username, JSON.stringify(person));

      //   localStorage.setItem(firstname, firstname);
      //   localStorage.setItem(lastname, lastname);
      //   localStorage.setItem(signup_username, signup_username);
      //   localStorage.setItem(signup_password, signup_password);
      //   localStorage.setItem(email, email);
      //   location.reload();

      var ul = $("<ul></ul>").css("list-style", "none");
      const li = $("<li> Account is Created... </li>");
      ul.append(li);
      $(signup_result).empty();
      signup_result.append(ul).css({
        color: "green",
        marginTop: "5px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      });

      e.target.reset();
    }
  });

  //   Login_form_functionality

  $("#login-form").submit(function(e) {
    e.preventDefault();

    $(login_result).empty();

    const username = $("#username").val();
    const password = $("#password").val();

    if (!username) {
      login_error.push("User Name field is Invalid");
    }
    if (!password) {
      login_error.push("Password field is Invalid");
    }
    if (login_error.length) {
      var ul = $("<ul></ul>");
      login_error.forEach(element => {
        const li = $("<li>" + element + "</li>");
        ul.append(li);
      });
      login_error = [];
      $(login_result).empty();
      login_result.append(ul).css({
        color: "red",
        margin: "10px 10px 0px 18px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      });
    } else {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        userObject = JSON.parse(localStorage.getItem(key));
        if (
          username === userObject.signup_username &&
          password === userObject.signup_password
        ) {
          localStorage.setItem("login", "true");
          window.location = "welcome_page.html";

          // window.open("welcome_page.html");
          return;
        }
      }
      var ul = $("<ul></ul>").css("list-style", "none");
      const li = $("<li> Account doesn't exist ,Please SignUp... </li>");
      ul.append(li);
      login_result.append(ul).css({
        color: "red",
        marginTop: "5px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      });
    }
  });

  // logout_functionality

  $("#logout").click(function(e) {
    localStorage.setItem("login", "false");
    location.reload();
  });
});
