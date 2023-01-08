$(function () {
    $("#read").on("click", readHandler);
    $("#write").on("click", writeHandler);
    $("#update").on("click", updateHandler);
    $("#delete").on("click", deleteHandler);
});
function readHandler() {
    let url = "http://localhost:3000/to-do";
    $.getJSON(url)
        .done(function (msg) {
            console.log(msg.length);
            // $('#toDoList').append(`
            // <tr>
            // <td></td>
            // <td></td>
            // <td></td>
            // <td><button>1</button></td>
            // </tr>
            // `)
            for (let x = 0; x < msg.length; x++) {
                let thisRow = `<tr>`;
                thisRow += `<td id="${msg[x].id}">${msg[x].id}</a></td>`;
                thisRow += `<td>${msg[x].task}</td>`;
                thisRow += `<td><button value="${msg[x].id}" id="update"  onclick='updateHandler()'>修改</button></td>`;
                thisRow += `<td><button value="${msg[x].id}" id="delete"  onclick="deleteHandler()">x</button></td>`;
                thisRow += '</tr>';
                $("#toDoList").append(thisRow);

                // ----講義上的寫法----------
                // $("#dataTable").append(
                //     `<tr><td><a target='_blank'
                //      href='${data.items[x].link}'>${data.items[x].title}</a></td><td>${data
                //         .items[x].pubDate.split(" ")[0]}</td></tr>`
                // );
                // --------------------------
            }
            console.log("Success");
        })
        .fail(function (msg) {
            console.log("Fail!");
        });
}
function updateHandler() {
    let url = "http://localhost:3000/to-do/1";
    let updateText = $('#input').val();
    console.log(updateText);
    $.ajax({
        url: url ,
        type: 'PUT',
        data: `task=${updateText}`,
        success: function (data) {
            console.log(data);
        }
    })
    .done(function (msg) {
        console.log(msg);
        $('#toDoList').prop(`
        <tr>
        <td>${msg.id}</td>
        <td><input type="text">${updateText}</input></td>
        <td><button value="${msg.id}"  id="update" onclick='updateHandler()'>修改</button></td>
        <td><button value="${msg.id} id="delete">x</button></td>
        </tr>
        `)
    })
    .fail(function (msg) {
        console.log("Fail!");
    });

}
function writeHandler() {
    let url = "http://localhost:3000/to-do/";

    //寫入一筆新的資料
    var inputValue = $('#input').val();
    $.post(url, {
         
        task: inputValue
    })
        .done(function (msg) {
            console.log(msg);
            $('#toDoList').append(`
            <tr>
            <td>${msg.id}</td>
            <td>${inputValue}</td>
            <td><button value="${msg.id}"  id="update" onclick='updateHandler()'>修改</button></td>
            <td><button value="${msg.id} id="delete">x</button></td>
            </tr>
            `)
        })
        .fail(function (msg) {
            console.log("Fail!");
        });

}
function deleteHandler() {
    let url = 'http://localhost:3000/to-do/6';
    // console.log($('#toDolist').prop().text());
    $.ajax({
        url: url  ,
        type: 'DELETE',
        success: function (data) {
            console.log(data);
        }
    });

}


