$(function () {
    // GET/READ
    $('#get-button').on('click', function() {
        //console.log('test');
        $.ajax({
            url: '/products',
            method: 'GET',            
            contentType: 'application/json',
            success: function(response){
                //console.log(response);
                var tbodyEl = $('tbody');
                response.products.forEach(function(product) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">'+ product.id + '</td>\
                            <td><input type="text" class="name" value="'+product.name +'"></td>\
                            <td>\
                                <button class="update-button">UPDATE/PUT</button>\
                                <button class="delete-button">Delete</button>\
                            </td>\
                        <tr>\
                    ');
                })
                
            }
        });
    });
    //Create POST
    $('#create-form').on('submit', function(event){
        event.preventDefault();
        var createInput = $('#create-input');
        $.ajax({
            url: '/products',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({name: createInput.val() }),
            success: function(response) {
                console.log(response);
                createInput.val('');
                $('#get-button').click();
            }
        });
    });

    // UPDATE/PUT
    $('table').on('click', '.update-button', function(){
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var newName = rowEl.find('.name').val();

        $.ajax({
            url: '/products/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ newName : newName }),
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });

    // DELETE
    $('table').on('click', '.delete-button', function () {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();

        $.ajax({
            url: '/products/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });

});