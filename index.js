function todo() {
    $('#add').on('click', function() {
        var d = new Date();
        var date = d.getDate() + '.' + (d.getMonth()+1) +'.' + d.getFullYear();
        var dateToNumber = Date.parse(d);
        $('#list').append('<li><input type="checkbox"> ' + $('#textarea').val() + ' (' + date + ')' + '</li>');
        $('li:last-child')[0].setAttribute('id', dateToNumber);
        $('#textarea').val('');
        $('#textarea').focus();
        populateStorage();   
    });

    $('#textarea').keypress(function(at) {
        if (at.which === 13) {
            at.preventDefault();
            $('#add').click();
        }
    });
        
    $('#rem').on('click', function() {
        $('input:checked').parent().remove();
        populateStorage();
    });

    $(document).keydown(function(rt) {
        if (rt.which === 68 && rt.ctrlKey) {
            rt.preventDefault();
            $('#rem').click();
        }
    });

    $('#sortText').on('click', function() {
        $('#list').children().detach().sort(function(a, b) {
            return $(a).text().localeCompare($(b).text());
        }).appendTo($('#list'));
        populateStorage();
    });

    $('#sortDate').on('click', function() {
        $('#list').children().detach().sort(function(a, b) {
            return a.id - b.id;
        }).appendTo($('#list'));
        populateStorage();
    });

    function populateStorage() {
        for (var i = 0; i < $('input:checked').length; i++) {
            $('input:checked')[i].setAttribute('checked', '');
        }
        for (var i = 0; i < $('input:not(:checked)').length; i++) {
            $('input:not(:checked)')[i].removeAttribute('checked');
        }  
        var listContent = [];
        $('#list').each(function() {
            listContent.push(this.innerHTML);
        });
        localStorage.setItem('todoList', JSON.stringify(listContent));
                      
    }  
    
    $('#list').on('click', function() {
        populateStorage();
    });
    
    function loadTodo() {
    if (localStorage.getItem('todoList')) {
        var listContent = JSON.parse(localStorage.getItem('todoList'));
        $('#list').each(function(i) {
          this.innerHTML = listContent[i];
        });
    }}

    loadTodo();    
}

$(document).ready(todo);