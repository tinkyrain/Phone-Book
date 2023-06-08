let table_row = document.getElementById('personList');

$(document).ready(() => {
    //Вывод данных из БД
    displayData();

    //При нажатии на кнопку форма отправляется в БД и там сохраняется
    $("#createFormButton").click(
        function(){
            if(checkCreateForm()){
                sendAjaxForm('create_from', 'create_form.php');
                $("#createModal").css("display","none");
                clearCreateForm();
                return false;
            } else {
                alert('Enter all values');
            }
        }
    )

    //При нажатии на кнопки создании контакта откроется окно с созданием
    $("#createButton").on("click",function(){
        $("#createModal").css("display","flex");
    });

    //Кнопка закрытия окна для создания контакта
    $("#closeCreateModal").on("click",function(){
        $("#createModal").css("display","none");
    });

    //Закрытие окна на кнопку Close
    $("#closeChangeModal").on("click",function(){
        $("#changeModal").css("display","none");
    })
})

//Вывод всех данных из БД
function displayData(){
    $.ajax({
        url: 'displayData.php',
        type: 'POST',
        dataType: 'json',
        success: function(data){
            //Отчистка всех строк и столбцов перед записью
            table_row.innerHTML = `
                <tr>
                    <td>Name</td>
                    <td>Phone</td>
                    <td>Who has</td>
                    <td>Actions</td>
                </tr>
            `;
            //Запись новых значений в таблицу
            for(let i=0;i<data.length;i++){
                table_row.innerHTML += `
                    <tr class='person'>
                        <td class='name'>${data[i].Name}</td>
                        <td>${data[i].Phone}</td>
                        <td>${data[i].Who}</td>
                        <td>
                            <button class='btn action_btn del' data-id=${data[i].Id} onclick='deleteQuery(this)'>Delete</button>
                            <button class='btn action_btn Change' id='changeBtn' data-id=${data[i].Id} onclick='changeQuery(this)'>Change</button>
                        </td>
                    </tr>`;
            }
        },

        error: function(data){
            alert('Error');
        }
    });
}

//Отправка формы на сервер
function sendAjaxForm(ajax_form, url){
    $.ajax({
        url: url,
        type: "POST",
        dataType: "html",
        data: $('#'+ajax_form).serialize(),

        success: function(response){
            displayData();
        },

        error: function(response){
            alert('Error');
        }
    });
}

//Функция запроса удаления строки из БД

function deleteQuery(obj){
    //Id того контакта, который мы хотим удалить
    let id = $(obj).data('id');
    
    if(confirm('Do you want delete this contact?')){
        $.ajax({
            url: 'delete.php',
            type: 'POST',
            data: {Id: id},
            success: function(data){
                if(data == 1){
                    displayData();
                } else {
                    alert(`Error`);
                }
            }
        });
    }
}

function changeQuery(obj){
    //Получение id контакта
    let id = $(obj).data('id');

    //Открытие окна
    $("#changeModal").css("display","flex");

    //Получение данных о контакте
    $.ajax({
        url: 'givePerson.php',
        type: 'POST',
        dataType: 'json',
        data: {Id: id},
        success: function(data){
            $('#nameChange').val(data[0].Name);
            $('#phoneChange').val(data[0].Phone);
            $('#whoChange').val(data[0].Who);
            $('#idChange').val(data[0].Id);
        },

        error: function(data){
            alert('Error');
        }
    });

    //Отправка новых данных в БД при нажатии на кнопку
    $('#ChangeFormButton').on('click', function(){
        sendAjaxForm('change_from', 'update.php');
        $("#changeModal").css("display","none");
        return false;
    })
}

//Функция отчистки формы
function clearCreateForm(){
    $('#nameCreate').val('');
    $('#phoneCreate').val('');
    $('#whoCreate').val('');
}

function checkCreateForm(){
    let array = ['nameCreate', 'phoneCreate', 'whoCreate'];

    for(let i = 0; i < array.length; i++){
        if($(`#${array[i]}`).val() == ''){
            return false;
        }
    }

    return true;
}
