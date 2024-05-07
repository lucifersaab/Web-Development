var jsonPlaceholderURL = 'https://65f3cec4105614e654a12cba.mockapi.io/reviews/review';

function displayReviews(){
    console.log("hey")
    $.ajax({
        url: jsonPlaceholderURL,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log('JSONPlaceholder Response:', data);
            var storiesList = $("#reviewsList");
      storiesList.empty();

      $.each(data, function (index, review) {
        storiesList.append(
          `<div class="review-container">
                <h3>${review.name}</h3>
                <div>${review.createdAt}</div>
                <div><i> ${review.Comments}</i></div>
                <div class="review-buttons-container">
                    <button class="signin-button add-employee-button btn-edit " data-id="${review.id}">Edit</button>
                    <button class="signin-button add-employee-button  btn-del delete-button" data-id="${review.id}">Delete</button>
                </div>
            </div>
            `
        );
      });
        },
        error: function(error) {
            console.error('JSONPlaceholder Error:', error);
        }
    });
}
function deleteReview() {
    let reviewId = $(this).attr("data-id");
    $.ajax({
      url: jsonPlaceholderURL +"/"+ reviewId,
      method: "DELETE",
      success: function () {
        displayReviews(); // Refresh the list after deleting a story
      },
      error: function (error) {
        console.error("Error deleting story:", error);
      },
    });
  }

 
  function editBtnClicked(event) {
    event.preventDefault();
    let storyId = $(this).attr("data-id");
    $.ajax({
      url: jsonPlaceholderURL+"/" + storyId,
      method: "GET",
      success: function (data) {
        console.log(data);
        $("#clearBtn").show();
        $("#createName").val(data.name);
        $("#createComment").val(data.Comments);
        $("#createBtn").html("Update");
        $("#createBtn").attr("data-id", data.id);
        $("#review-form-container").removeClass("hide");

      },
      error: function (error) {
        console.error("Error deleting story:", error);
      },
    });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    let reviewId = $("#createBtn").attr("data-id");
    var name = $("#createName").val();
    var Comments = $("#createComment").val();
    if (reviewId) {
      $.ajax({
        url: jsonPlaceholderURL+"/" + reviewId,
        method: "PUT",
  
        data: { name, Comments },
        success: function () {
          displayReviews(); // Refresh the list after creating a new story
          document.getElementById("createForm").reset();
          $("#review-form-container").addClass("hide");
        },
        error: function (error) {
          console.error("Error creating story:", error);
        },
      });
    } else {
      $.ajax({
        url: jsonPlaceholderURL,
        method: "POST",
        data: { name, Comments },
        success: function () {
          displayReviews(); 
          $("#review-form-container").addClass("hide");

        },
        error: function (error) {
          console.error("Error creating story:", error);
        },
      });
    }
  }

  function addReview(){
    $("#clearBtn").hide();
    $("#createBtn").removeAttr("data-id");
    $("#createBtn").html("Create");
    $("#createName").val("");
    $("#createComment").val("");

    $("#review-form-container").removeClass("hide");

  }

$(document).ready(function () {
  // Initial display of stories

  displayReviews();
  $(document).on("click", ".btn-del", deleteReview);
  $(document).on("click", ".btn-edit", editBtnClicked);
  $(document).on("click", ".add-comment", editBtnClicked);
  $(document).on("click", "#add-review", addReview);
  $("#form-close-button").on("click",function(){
  $("#review-form-container").addClass("hide");
  })


  // Create Form Submission
  $("#createForm").submit(handleFormSubmission);
  $("#clearBtn").on("click", function (e) {
    e.preventDefault();
    $("#clearBtn").hide();
    $("#createBtn").removeAttr("data-id");
    $("#createBtn").html("Create");
    $("#createName").val("");
    $("#createComment").val("");
  });
});