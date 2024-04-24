$(document).ready(function() {
    // Function to fetch and display circuits
    function fetchCircuits() {
        $.ajax({
            url: 'http://localhost/webservice-main/index.php/circuiti',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                $('#circuitsTable tbody').empty();
                $.each(data, function(index, circuit) {
                    $('#circuitsTable tbody').append(
                        '<tr>' +
                            '<td>' + circuit.circuito_id + '</td>' +
                            '<td>' + circuit.nome_circuito + '</td>' +
                            '<td>' +
                                '<button onclick="editCircuit(' + circuit.circuito_id + ')">Edit</button>' +
                                '<button onclick="deleteCircuit(' + circuit.circuito_id + ')">Delete</button>' +
                            '</td>' +
                        '</tr>'
                    );
                });
            }
        });
    }

    // Initial fetch of circuits
    fetchCircuits();

    // Function to add a new circuit
    function addCircuit() {
        var circuitName = $('#circuitName').val();
        $.ajax({
            url: 'http://localhost/webservice-main/index.php/circuiti',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ nome_circuito: circuitName }),
            success: function() {
                fetchCircuits(); // Refresh the list after adding
            }
        });
    }

    // Function to edit a circuit
    function editCircuit(circuitId) {
        var newName = prompt("Enter new name for the circuit:");
        if (newName !== null) {
            $.ajax({
                url: 'http://localhost/webservice-main/index.php/circuiti' + circuitId,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ nome_circuito: newName }),
                success: function() {
                    fetchCircuits(); // Refresh the list after editing
                }
            });
        }
    }

    // Function to delete a circuit
    function deleteCircuit(circuitId) {
        if (confirm("Are you sure you want to delete this circuit?")) {
            $.ajax({
                url: 'http://localhost/webservice-main/index.php/circuiti' + circuitId,
                type: 'DELETE',
                success: function() {
                    fetchCircuits(); // Refresh the list after deletion
                }
            });
        }
    }
});
