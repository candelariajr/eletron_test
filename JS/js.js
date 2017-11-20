
(function(){
    //configuration paramaters: Note: these should be moved to a config file!
    //TODO: Rename this
    const appName = "Tech Services Application";
    //TODO: Supply Proper URL
    const postURL = "http://localhost/lab_stats_api/json.php";

    console.log("js properly sourced");

    // in order for that neato select tag library to work- the affected DOM elements have to be rendered.
    // This can be called earlier, but there's just so much JQuery.
    $('.js-example-basic-multiple').select2({
        placeholder: 'Select an option'
    });

    $('#submitButton').click(function(){
        //alert("Button Clicked");
        toggleForm();
        submitPost(null);
    });

    $('#backToFormButton').click(function(){
        toggleForm();
    });

    function toggleForm(){
        $('#testParameterForm').toggle();
        $('#mainForm').toggle();
    }

    function submitPost(jsonObject){
        if(jsonObject === null || jsonObject === undefined){
            jsonObject = {"default" : "no_data", "One" :"Thing"}
        }
        console.log("submitPost");
        $.ajax({
            type: "POST",
            url: postURL,
            data: JSON.stringify(jsonObject),
            contentType: "application/json; charset=utf-8",
            success: function(data){
                callBack(data);
            },
            dataType: "json"
        });
    }

    function callBack(data){
        //TODO: Eliminate this test code
        $('#testPanel').html(JSON.stringify(data));
    }

    function generateDialog(dialogText){
        alert(dialogText, appName);
    }
})();