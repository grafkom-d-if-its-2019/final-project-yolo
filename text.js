function wrapText(canvas, text) {
    const lineHeight = 15;
    const maxWidth = canvas.width-20;
    var x = 10, y = 20;
    var context = canvas.getContext('2d');
    context.font = '11pt Calibri';
    context.fillStyle = '#333';
    context.clearRect(0, 0, canvas.width, canvas.height);
    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
}

function loadText()
{
    var canvas = document.getElementById('myCanvas');
    // console.log(canvas);
    text = 'Sel darah putih, leukosit (bahasa Inggris: white blood cell, WBC, leukocyte) adalah sel yang membentuk komponen darah. Sel darah putih ini berfungsi untuk membantu tubuh melawan berbagai penyakit infeksi sebagai bagian dari sistem kekebalan tubuh. Sel darah putih tidak berwarna, memiliki inti, dapat bergerak secara amoeboid, dan dapat menembus dinding kapiler/diapedesis. Dalam keadaan normalnya terkandung 4x109 hingga 11x109 sel darah putih di dalam seliter darah manusia dewasa yang sehat - sekitar 7000-25000 sel per tetes.Dalam setiap milimeter kubik darah terdapat 6000 sampai 10000(rata-rata 8000) sel darah putih. Dalam kasus leukemia, jumlahnya dapat meningkat hingga 50000 sel per tetes. ';
    wrapText(canvas, text);
}

loadText();