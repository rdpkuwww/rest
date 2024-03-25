    window.setTimeout("waktu()", 1000);
    function waktu() {
        var waktu = new Date();
        setTimeout("waktu()", 1000);
        const stringss = `${waktu.getHours()}:${waktu.getMinutes()}:${waktu.getSeconds()}`
        document.getElementById("jam").textContent = stringss
        
        }