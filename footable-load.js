$(document).ready(function () {
    $.get("https://raw.githubusercontent.com/eddieosi/esp_loader/main/columns.json", function(columnData){
        console.log("loaded footable-load.js");
        var $modal = $('#editor-modal'),
            $editor = $('#editor'),
            $editorTitle = $('#editor-title'),
            ft = FooTable.init('#esp-data', {
                columns: columnData,
                rows: jsonData,
                editing: {
                    addRow: function () {
                        $modal.removeData('row');
                        $editor[0].reset();
                        $editorTitle.text('Add a new row');
                        $modal.modal('show');
                    },
                    editRow: function (row) {
                        var values = row.val();
                        $editor.find('#firstName').val(values.firstName);
                        $editor.find('#lastName').val(values.lastName);
                        $editor.find('#message').val(values.message);
                        $modal.data('row', row);
                        $editorTitle.text('Edit row #' + values.firstName);
                        $modal.modal('show');
                    },
                    deleteRow: function (row) {
                        if (confirm('Are you sure you want to delete the row?')) {
                            row.delete();
                            var contains = containsObject(row.val().firstName, jsonData);
                            if(contains !== false){
                                jsonData.splice(contains, 1);
                            }
                        }
                    }
                }
            }),
            uid = 10001;
    
        $editor.on('submit', function (e) {
            if (this.checkValidity && !this.checkValidity()) return;
            e.preventDefault();
            var row = $modal.data('row'),
                values = {
                    firstName: $editor.find('#firstName').val(),
                    lastName: $editor.find('#lastName').val(),
                    message: $editor.find('#message').val(),
                };
    
                var contains = containsObject(row.val().firstName, jsonData);
            if(contains === false){
                jsonData.push(values);
            }else{
                jsonData[contains] = values;
            }
            if (row instanceof FooTable.Row) {
                row.val(values);
            } else {
                ft.rows.add(values);
            }
            
            
            $modal.modal('hide');
        });
    })
    
});

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].firstName === obj) {
            return i;
        }
    }

    return false;
}

