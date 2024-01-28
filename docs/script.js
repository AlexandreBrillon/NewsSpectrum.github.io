document.getElementById('testButton').addEventListener('click', function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/test');
    xhr.onload = function() {
        if (xhr.status === 200) {
            document.getElementById('response').innerHTML = xhr.responseText;
        }
    };
    xhr.send();
});
