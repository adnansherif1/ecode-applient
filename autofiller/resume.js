sel = [];
window.addEventListener("load", initPopup);

function initPopup() {
  console.log("starting!");
  // creating corresponds to resume section
  $("#creating").css("background-color", "lightblue");
  // creating section is hidden as the autofilling section is shown by default. It is swapped by the
  // the creating section when the Create mode button is pressed
  $('.creating').hide();
  document.getElementById("form").addEventListener("submit", form);
  //button that swaps to filling mode
  document.getElementById("filling").addEventListener("click", function () {
    toggleActivity("filling");
  });
  // button that swaps to creating mode
  document.getElementById("creating").addEventListener("click", function () {
    toggleActivity("creating");
  });

  // button that adds a new experience in the filling mode (autofiller)
  document
    .getElementById("experience-add")
    .addEventListener("click", function () {
      createExperience(numFieldset("#fieldset-experiences"), $("#fieldset-experiences"))
    }); 
  // button that adds new experiences in the first categroy in the creating mode( reusme generation)
  document
    .getElementById("category-one-add")
    .addEventListener("click", function () {
      createExperience(numFieldset("#category1"), $("#category1"))
    });
  // button that adds new experiences in the second category in the creating mode (resume generation)
  document
    .getElementById("category-two-add")
    .addEventListener("click", function () {
      createExperience(numFieldset("#category2"), $("#category2"))
    });
  // button that adds new experiences in the  third category in the creating mode (resume geenration)
  document
    .getElementById("category-three-add")
    .addEventListener("click", function () {
      createExperience(numFieldset("#category3"), $("#category3"))
    });
  // button that calls the function to collect and save all the information in both the autofilling 
  // and resume creating mode to the chrome extension or the remote server
  document
    .getElementById("application-save")
    .addEventListener("click", saveData);

  //the delete button present inside each experience that deletes the experience.
  $(document).on('click', '.delete', function () {
    $(this).parent().parent().remove()
  })

  // the moveup button inside each experience that  swaps the experience with the one above it
  $(document).on('click', '.moveUp', function () {
    var fieldsetElement = $(this).parent().parent();
    if ($(fieldsetElement).prev().prop('tagName') === "FIELDSET") {
      var newLegendText = $(fieldsetElement).prev().find("legend:first").text();
      var currentLegendText = $(fieldsetElement).find("legend:first").text();
      $(fieldsetElement).prev().find("legend:first").text(currentLegendText);
      $(fieldsetElement).find("legend:first").text(newLegendText);
      $(fieldsetElement).insertBefore($(fieldsetElement).prev())
    };
  });
  // the movedown button inside each experience that swaps the experience with the one below it
  $(document).on('click', '.moveDown', function () {
    var fieldsetElement = $(this).parent().parent();
    if ($(fieldsetElement).next().prop('tagName') === "FIELDSET") {
      var newLegendText = $(fieldsetElement).next().find("legend:first").text();
      var currentLegendText = $(fieldsetElement).find("legend:first").text();
      $(fieldsetElement).next().find("legend:first").text(currentLegendText);
      $(fieldsetElement).find("legend:first").text(newLegendText);
      console.log($(fieldsetElement).prev().find("legend").text());
      $(fieldsetElement).insertAfter($(fieldsetElement).next())
    };
  });
  // these are the other buttons on the navigation bar correpsonding to the search mode and track mode
  //the following code sets the color of those buttons
  $("#searching").css("background-color", "lightblue");
  $("#tracking").css("background-color", "lightblue");
  $("#app-fill").hide();
  //the follwoing code loads the data from the extension and displays it in the correspondinng sections
  // and input boxes
  data_loader('userinfo', dataHandler);
  data_loader('table_data', function (data) {
    if(data) {} else{

      var result = {};
      data_saver(result,'table_data');
    }
  });

  // window.addEventListener('message',(event) => {
  //   if(event.data.from && event.data.from == "extension" && event.data.type=="load") {
  //     //console.log(event.data.data);
  //     loadData(event.data.data);
  //   }
  // },false);
  // window.postMessage({
  //   "type":"load",
  //   "from":"web"
  // });
  //  loadData();
  document.getElementById("app-fill").addEventListener("click", callFill);
}

function dataHandler(data) {
  console.log("loaded");
  loadData(data);
}

function toggleActivity(activity) {
  if (activity == "filling") {
    $("#filling").css("background-color", "#095484");
    $("#creating").css("background-color", "lightblue");
    // $("#searching").css("background-color", "lightblue");
    // $("#tracking").css("background-color", "lightblue");
    $('.creating').hide();
    $('.filling').show();
    // TODO only changing text of the button "FILL"
    $('#app-fill').hide();
  } else if (activity == "creating") {
    $("#filling").css("background-color", "lightblue");
    $("#creating").css("background-color", "#095484");
    // $("#searching").css("background-color", "lightblue");
    // $("#tracking").css("background-color", "lightblue");
    $('.filling').hide();
    $('.creating').show();
    // TODO only changing text of the button "CREATE"
    $('#app-fill').show();
  }
  //   else if (activity == "searching") {
  //   $("#filling").css("background-color", "lightblue");
  //   $("#creating").css("background-color", "lightblue");
  //   $("#searching").css("background-color", "#095484");
  //   $("#tracking").css("background-color", "lightblue");

  // } else if (activity == "tracking") {
  //   $("#filling").css("background-color", "lightblue");
  //   $("#creating").css("background-color", "lightblue");
  //   $("#searching").css("background-color", "lightblue");
  //   $("#tracking").css("background-color", "#095484");
  // }
}

function form(e) {
  console.log("reached here");
  e.preventDefault();
}

function numFieldset(elementID) {
  return $(elementID).find("fieldset").length + 1;
}

function callFill() {
  var create = false;
  console.log('creating');
  if ($('#app-fill').text() == "RESUME") {
    create = true;
    window.open("./html-resume/index.html", "_blank");
    return;
  }
  // chrome.extension.sendMessage(
  //   { greeting: "start filling",create:create },
  //   function (response) {
  //     console.log(response);
  //     console.log("success");
  //   }
  // );

  /*   
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var currTab = tabs[0];   
   console.log(currTab);
   chrome.tabs.executeScript(currTab.id, { file: "jquery-3.1.1.min.js" }, function() {
   	console.log('first');
    chrome.tabs.executeScript(currTab.id, { file: "faker.js" }, function() {
    	console.log('third');
        chrome.tabs.executeScript(currTab.id, { file: "run.js" }, function () {
        	console.log('forth');
        });
      });  
    }); 
  });    
  */
}

function createInput(labelText, inpType, inpClass) {
  var label = $("<label></label>").text(labelText);
  var input = $('<input type ="' + inpType + '" class= "' + inpClass + '">');
  var div = $("<div></div>");
  $(div).append(label);
  $(div).append(input);
  return div;
}

function createSubTextArea() {
  var inp = $('<input type="checkbox"class="selected"/>');
  var deleteButton = $("<button class = 'delete' ><i class='fas fa-times'></i></button>")
  $(inp).change(function () {
    if ($(this).prop("checked")) {
      var value = $(this).parent().parent().find(".role-version").focus().val();
      console.log("role: " + value);
      var current = this;
      $(this)
        .parent()
        .parent()
        .parent()
        .find(".selected")
        .each(function () {
          if (!$(this).is(current)) {
            $(this).prop("checked", false);
          }
          // check current != this
          // $( "#x" ).prop( "checked", false );
        });
      /*       console.log(value);
            console.log(
              $(this).closest("fieldset").find(".role-description").focus().val()
            ); */
      $(this).closest("fieldset").find(".role-description").focus().val(value);
    }
  });
  var textarea = $(
    '<textarea class="role-version" style="height: 100%; max-height: 200px; min-height: 100px;"></textarea>'
  );
  $(textarea).on("input",function () {
    if ($(this).parent().parent().find(".selected").prop("checked")) {
      $(this).closest("fieldset").find(".role-description").focus().val($(this).focus().val());
    }
  });
  var div1 = $('<div style="float:left; width: 10%"></div>');
  var div2 = $('<div style="float:right; width: 90%"></div>');
  var divOuter = $('<div style="width: 100%;overflow:auto;"></div>');

  $(deleteButton).addClass("deleteTextButton");
  $(div1).append(inp);
  $(div2).append(textarea);
  $(div2).append(deleteButton);
  $(divOuter).append(div1);
  $(divOuter).append(div2);
  return divOuter;
}




function initSubTextArea() {
  var label = $("<label></label>").text("role description");
  var div1 = $('<div class="versions"></div>');
  var div2 = $('<div style="addVersion"></div>');
  var divOuter = $('<div class="versionsOuter"></div>');
  var button = $('<button class="addVbutton"><i class="fas fa-plus"></i></button>');
  $(button).click(function () {
    $(this).parent().parent().find(".versions").append(createSubTextArea());
  });
  $(button).addClass("smallSize");
  $(div1).append(createSubTextArea());
  $(div2).append(button);
  $(divOuter).append(label);
  $(divOuter).append(div1);
  $(divOuter).append(div2);
  return divOuter;
}

function createTextArea(labelText, inpClass) {
  var label = $("<label></label>").text(labelText);
  var divInner = $("<div></div>");
  var textArea = $(
    '<textarea style= "width: 100%; max-width: 704px; min-width: 280px;height: 100%; max-height: 200px; min-height: 100px;"class="' +
    inpClass +
    '"></textarea>'
  );
  //$(textArea).prop("readonly", true);

  $(divInner).append(textArea);

  var divOuter = $("<div></div>");
  //var change = $('<button class="' + inpClass + '"></button>').text("change");
  /*   $(change).click(function () {
      if ($(this).parent().parent().find(".versionsOuter").is(":visible")) {
        $(this).parent().parent().find(".versionsOuter").hide();
        return;
      }
      $(this).parent().parent().find(".versionsOuter").show();
    }); */
  $(divOuter).append(label);
  $(divOuter).append(divInner);
  //$(divOuter).append(change);
  $(divOuter).hide();
  return divOuter;
}

function createSelector(num) {
  var inp = $('<input type="checkbox" class="sel"/>');
  var div = $('<div style="float:right; width: 10%"></div>');
  $(inp).change(function () {
    if ($(this).prop("checked")) {
      sel.push(num);
      console.log(sel);
    } else {
      sel.splice(sel.indexOf(num), 1);
      console.log(sel);
    }
  });
  $(div).append(inp);
  return div;
}

function createButtons() {
  var div = $('<div class = "buttons"></div>');
  var deleteButton = $("<button class = 'delete' ><i class='fas fa-trash'></i></button>")
  var upButton = $("<button class = 'moveUp'><i class='fas fa-arrow-up'></i></i></button>");
  var downButton = $("<button class = 'moveDown'><i class='fas fa-arrow-down'></i></button>");

  $(deleteButton).addClass("smallSize");
  $(upButton).addClass("smallSize");
  $(downButton).addClass("smallSize");
  $(div).append(upButton);
  $(div).append(downButton);
  $(div).append(deleteButton);
  return div;
}

// TODO Pass in div element
function createExperience(num, category) {
  console.log("file connected");
  var fieldset = $("<fieldset></fieldset>");
  $(fieldset).append(createSelector(num));
  $(fieldset).append("<legend>Work Experience " + num + "</legend>");
  $(fieldset).append(createInput("Job Title", "text", "job-title"));
  $(fieldset).append(createInput("Company", "text", "company"));
  $(fieldset).append(createInput("Location", "text", "location"));
  $(fieldset).append(createInput("From", "month", "from"));
  $(fieldset).append(createInput("To", "month", "to"));
  $(fieldset).append(createTextArea("Role Description", "role-description"));
  $(fieldset).append(initSubTextArea());
  $(fieldset).append(createButtons());
  $(category).append(fieldset);
  return fieldset;
}

function saveData() {
  var application = {};
  var personal = $("#personal-information");
  application["personal"] = {};
  $(personal)
    .find(":input")
    .each(function () {
      var key = $(this).attr("class").split(/\s+/)[0];
      var val = $(this).val();
      application["personal"][key] = val;
    });
  //chrome.storage.sync.set(application, function () {});

  var education = $("#education-information");
  //var application = {};
  application["education"] = {};
  $(education)
    .find(":input")
    .each(function () {
      var key = $(this).attr("class").split(/\s+/)[0];
      var val = $(this).val();
      application["education"][key] = val;
    });
  //chrome.storage.sync.set(application, function () {});

  var experience = $("#fieldset-experiences");

  //application = {};
  application["experience"] = {};
  var num = 0;
  $(experience)
    .find("fieldset")
    .each(function () {
      num += 1;
      application["experience"][num] = {};
      versions = 0;
      $(this)
        .find(":input")
        .each(function () {
          var key = $(this).attr("class").split(/\s+/)[0];
          var val = $(this).val();
          if (key == "selected") {
            val = $(this).prop("checked");
            application["experience"][num][key + versions] = val;
          } else if (key == "sel") {
            val = $(this).prop("checked");
            application["experience"][num][key] = val;
          } else if (key == "role-version") {
            application["experience"][num][key + versions] = val;
            versions += 1;
          } else {
            application["experience"][num][key] = val;
          }
        });
      application["experience"][num]["versionnum"] = versions;
    });
  /*
	var selArr = []
	for(var j = 1; j <=num; j++) {
		selArr.push(j);
	}
	*/
  application["experience"]["num"] = num;
  application["experience"]["sel"] = sel;
  //chrome.storage.sync.set(application, function () {});

  //the below is hardcoding change it later.
  var applications = application;

  var categories = {};
  var application = {};
  application['names'] = {};
  for (var i = 1; i < 4; i++) {
    //console.log($("title" + i).val());
    application['names'][i] = $("#title" + i).val();
    var category = "category" + i;
    var experience = $("#category" + i);
    application[category] = {};
    var num = 0;
    $(experience)
      .find("fieldset")
      .each(function () {
        num += 1;
        application[category][num] = {};
        versions = 0;
        $(this)
          .find(":input")
          .each(function () {
            var key = $(this).attr("class").split(/\s+/)[0];
            var val = $(this).val();
            if (key == "selected") {
              val = $(this).prop("checked");
              application[category][num][key + versions] = val;
            } else if (key == "sel") {
              val = $(this).prop("checked");
              application[category][num][key] = val;
            } else if (key == "role-version") {
              application[category][num][key + versions] = val;
              versions += 1;
            } else {
              application[category][num][key] = val;
            }
          });
        application[category][num]["versionnum"] = versions;
      });
    application[category]["num"] = num;
    application[category]["sel"] = sel;
  }
  applications["categories"] = application;
  console.log('sending save web');
  console.log(applications);
  data_saver(applications, 'userinfo')
  //   window.postMessage({
  //     "type":"save",
  //     "from":"web",
  //     "data":applications
  // });
  //chrome.storage.sync.set(categories, function () {});
}

function loadData(result) {
  console.log("loading web");
  console.log(result);
  // console.log(result);
  var personal = $("#personal-information");
  $(personal)
    .find(":input")
    .each(function () {
      var key = $(this).attr("class").split(/\s+/)[0];
      var val = result["personal"][key];
      $(this).val(val);
    });


  var education = $("#education-information");
  $(education)
    .find(":input")
    .each(function () {
      var key = $(this).attr("class").split(/\s+/)[0];
      if (result["education"][key]) {
        var val = result["education"][key];
      } else var val = null;
      $(this).val(val);
    });


  if (result["experience"] != null) {
    //sel = result['experience']['sel'];
    sel = [];
    tot_experience = result["experience"]["num"];
    for (var i = 0; i < tot_experience; i++) {
      fieldset = createExperience(i + 1, $("#fieldset-experiences"));
      versions = result["experience"][i + 1]["versionnum"];
      for (var j = 1; j < versions; j++) {
        $(fieldset).find(".addVbutton").click();
      }
    }

    var num = 0;
    var experience = $("#fieldset-experiences");
    $(experience)
      .find("fieldset")
      .each(function () {
        num += 1;
        versions = 0;
        $(this)
          .find(":input:not(:button)")
          .each(function () {
            var key = $(this).attr("class").split(/\s+/)[0];
            var val;
            if (key == "selected") {
              val = result["experience"][num][key + versions];
              console.log("load1: " + this);
              if (val) {
                $(this).prop("checked", true);
              }
            } else if (key == "sel") {
              val = result["experience"][num][key];
              if (val) {
                $(this).prop("checked", true);
              }
            } else if (key == "role-version") {
              val = result["experience"][num][key + versions];
              versions += 1;
            } else {
              val = result["experience"][num][key];
            }
            $(this).val(val);
          });
      });
  }

  result = result["categories"];
  if (result != null) {
    for (var i = 1; i < 4; i++) {
      var category = "category" + i;
      if (result[category] == null) {
        continue;
      }
      $("#title" + i).val(result['names'][i]);
      // console.log(result[category]);
      //sel = result['experience']['sel'];
      sel = [];
      tot_experience = result[category]["num"];
      for (var j = 0; j < tot_experience; j++) {
        fieldset = createExperience(j + 1, $("#" + category));
        versions = result[category][j + 1]["versionnum"];
        for (var k = 1; k < versions; k++) {
          $(fieldset).find(".addVbutton").click();
        }
      }
      var num = 0;
      var experience = $("#category" + i);
      $(experience)
        .find("fieldset")
        .each(function () {
          num += 1;
          versions = 0;
          $(this)
            .find(":input:not(:button)")
            .each(function () {
              var key = $(this).attr("class").split(/\s+/)[0];
              var val;
              if (key == "selected") {
                val = result[category][num][key + versions];
                if (val) {
                  $(this).prop('checked', true);
                }
              } else if (key == "sel") {
                val = result[category][num][key];
                if (val) {
                  $(this).prop("checked", true);
                }
              } else if (key == "role-version") {
                val = result[category][num][key + versions];
                versions += 1;
              } else {
                val = result[category][num][key];
              }
              $(this).val(val);
            });
        });
    }
  }
}