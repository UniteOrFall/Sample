// Call the function at the top, display()
$(document).ready(function(){
    let inp = $('#inp');
    let btn = $('#btn');
    let result = $('#result');
    let todo = JSON.parse(localStorage.getItem('datalist')) || [];
    display();
    btn.click(function(){
        makeRequest();
    });
    function makeRequest() {

        // Send the todo item

        $.ajax({
            url: '/add',
            method: 'POST',
            data: {todo:inp.val()},
            success: function(data) {
                result.append(`<li>
                            <input type="checkbox" style="width: 24px; height: 24px;position: relative;top: 20%;left: 0.5%;">
                            <input type = "text" value="${inp.val()}" onclick="rename()">
                            <button onclick="update(this)">Update</button>
                            <button onclick="del(this)">Delete</button>
                    </li>`)
                    localStorage.setItem('datalist',JSON.stringify(data));
                    inp.val("");
                // Append TodoList Item on Page
            }
        })

    }
    function display(){
        // if(todo.length==0){
        //     $.ajax({
        //         url: '/display',
        //         method: 'GET',
        //         success: function(data) {
        //             localStorage.setItem('datalist',JSON.stringify(data));
        //         }
        //     })
        // }
        for(i=0;i<todo.length;i++){
                result.append(`<li>
                            <input type="checkbox" style="width: 24px; height: 24px;position: relative;top: 20%;left: 0.5%;">
                            <input type = "text" value="${todo[i]}" onclick="rename(this)">
                            <button onclick="update(this)">Update</button>
                            <button onclick="del(this)">Delete</button>
                    </li>`)
            }
    }
//     function weather(){
//         $.ajax({
//             url:'http://api.openweathermap.org/data/2.5/weather?q=Delhi&APPID=4782b97928f7486031d7b8584a34e2bd&units=metric',
//             method:'get',
//             success:function (data) {
//                 result.append(`<div style="background-color:black;height:${data.main.temp}px;">${data.main.temp}</div>`)
//             }
//
//         })
//     }
});
function del(ele) {

    $.ajax({
        url: '/delete',
        method: 'POST',
        data:{id:$(ele).parent().index()},
        success: function(data) {
            $(ele).parent().remove();
            localStorage.setItem('datalist',JSON.stringify(data));
        }
    })
}
function rename(){
    window.alert("Click Update button to update the content.");
}
function update(ele){
    let parent = $(ele).prev();
    let previousvalue = parent.attr("value");
    console.log(previousvalue);
    let valInput = parent.val();
    console.log(valInput);
    if(valInput!=previousvalue) {
        $.ajax({
            url: '/update',
            method: 'POST',
            data:{id:$(ele).parent().index(),val:valInput},
            success: function(data){
                console.log("server hit");
               parent.attr("value",  `${valInput}`);
                localStorage.setItem('datalist',JSON.stringify(data));
            }
        })
    }
}