document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('createForm');
    const inputFields = form.querySelectorAll('input, textarea');

    inputFields.forEach(input => {
        input.addEventListener('input', function () {
            const name = this.getAttribute('name');
            const value = this.value;
            const element = document.getElementById(name);
            console.log(element);
            console.log(name)
            if(value){
                if (name === "path" && element.tagName === "IMG") {
                    element.src = `/assets/${value}`;
                } 
                else if (name=="type"){
                    element.textContent=`Category: ${value}`
                }
                else if(name=="price"){
                    element.textContent=`Price: Rs.${value}/-`
                }
                else if(name=="orders"){
                    element.textContent=`(${value})`
                }
                else {
                    if (element) {
                        element.textContent = value;
                    }
                }
            }
            else{
                element.textContent=''
            }
        });
    });
});
