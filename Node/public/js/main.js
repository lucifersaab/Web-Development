var dropdown = document.getElementsByClassName("jewl-header-dropdown-btn");
var i;


for (i = 0; i < dropdown.length; i++) {
  var dropdownToggles = document.querySelectorAll('.jewl-header-dropdown-btn');

dropdownToggles.forEach(function(toggle) {
    toggle.addEventListener("click", function() {
        var dropdownContent = this.nextElementSibling;
        var nestedContents = dropdownContent.querySelectorAll('.jewl-header-dropdown-container');
        var totalHeight = dropdownContent.scrollHeight;

        nestedContents.forEach(function(nestedContent) {
            totalHeight += nestedContent.scrollHeight;
        });
        var caretIcon = this.querySelector('.jewl-header-fa-caret-down');

        if (dropdownContent.style.maxHeight) {
            dropdownContent.style.maxHeight = null;
            caretIcon.style.transform = "rotate(0deg)";

        } else {
            dropdownContent.style.maxHeight = totalHeight + "px";
            caretIcon.style.transform = "rotate(180deg)";

        }
    });
});


}


document.addEventListener("DOMContentLoaded", function() {
    let submitIcon = document.querySelector('.jwl-searchbox-icon');
    let inputBox = document.querySelector('.jwl-searchbox-input');
    let searchBox = document.querySelector('.jwl-searchbox');
    let submitButton = document.querySelector('.jwl-searchbox-submit');
    let isOpen = false;
  
    submitIcon.addEventListener("click", function() {
      let str = document.querySelector(`[id="mobileHeaderSearch"]`).value;
      let thisLngth = str.trim().length;
      if (!isOpen) {
        searchBox.classList.add('jwl-searchbox-open');
        inputBox.classList.add('search-border');
        submitButton.style.visibility = 'visible';
        inputBox.focus();
        isOpen = true;
      } else {
        searchBox.classList.remove('jwl-searchbox-open');
        inputBox.classList.remove('search-border');
  
        inputBox.blur();
        isOpen = false;
      }
    });
  
  
    window.addEventListener("scroll", function() {
        console.log("scrolling");
        searchBox.classList.remove('jwl-searchbox-open');
        inputBox.classList.remove('search-border');
  
      });
  
    function buttonUp() {
      var inputVal = inputBox.value.trim().length;
      if (inputVal !== 0) {
      } else {
        inputBox.value = '';
      }
    }
  
    inputBox.addEventListener("keyup", buttonUp);
  });

  const searchButton = document.getElementById('mobHeadSrchSubmit');
  // const searchFormWrapper = document.getEleme('jwl-searchbox');
  
  searchButton.addEventListener('click', function() {
    searchFormWrapper.classList.toggle('width-100');
  });


  window.addEventListener("scroll", function() {
    console.log("scrolling")
    searchFormWrapper.classList.remove('jwl-searchbox-open');

  });

  const sidebarToggle = document.getElementById('sidebarToggle');
  const wrapper = document.getElementById('wrapperside-nav');
  
  sidebarToggle.addEventListener('click', function() {
    wrapper.classList.toggle('show-side-nav');
  });

  document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('.discover-button');
    
    buttons.forEach(function(button) {
        var image = button.querySelector('img'); 
        var originalSrc = image.src;
        var hoverSrc = './assets/DiscoverButtonWhite.png';
        button.addEventListener('mouseover', function() {
            image.src = hoverSrc;
        });
        
        button.addEventListener('mouseout', function() {
            image.src = originalSrc;
        });
    });
});
