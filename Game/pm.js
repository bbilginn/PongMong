
$(document).ready(Pong)

function Pong() {
//yorummmm
    var canvas = $("#myCanvas");
    var context = canvas.get(0).getContext("2d");
    var canvasWidth = canvas.width();
    var canvasHeight = canvas.height();

    $(window).resize(resizeCanvas);
    function resizeCanvas() {
        var gen = $(window).get(0).innerWidth;
        var yuk = $(window).get(0).innerHeight;
        canvas.attr("width", gen / 2);
        canvas.attr("height", yuk / 2);
        canvasWidth = canvas.width();
        canvasHeight = canvas.height();
    };
    resizeCanvas();

    //Çalýntý--------

    var Asteroid = function (x, y, radius, vX, vY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vX = vX;
        this.vY = vY;
    };

    var asteroids = new Array();
    var x = canvasWidth / 2;
    var y = 20 + (Math.random() * (canvasHeight - 40));
    var vX = 15;
    var vY = 5;
    var radius = 20;
    asteroids.push(new Asteroid(x, y, radius, vX, vY));




    var icadSolx = function (y, yuk, Puan) {
        this.y = y;
        this.yuk = yuk;
        this.Puan = Puan;
    };

    var icadSagx = function (y, yuk, Puan) {
        this.y = y;
        this.yuk = yuk;
        this.Puan = Puan;
    };

    var iSols = new Array();
    iSols.push(new icadSolx(canvasHeight / 3, 150, 0));

    var iSags = new Array();
    iSags.push(new icadSagx(canvasHeight / 3, 150, 0));



    var Kul1 = iSols[0];
    var Kul2 = iSags[0];


    var icadSol = function (ctx, konum, yasla, yuk) {
        ctx.beginPath();
        ctx.rect((yasla - yasla+5), konum, 25, yuk);
        ctx.fillStyle = "#fff";
        ctx.lineWidth = 1;
        ctx.fill();
    }

    var icadSag = function (ctx, konum, yasla, yuk) {
        ctx.beginPath();
        ctx.rect(yasla - 30, konum, 25, yuk);
        ctx.fillStyle = "#fff";
        ctx.lineWidth = 1;
        ctx.fill();
    }

    $(document).bind('keypress', function (e) {
        var drm = document.getElementById('head')
        drm.innerHTML = e.which;

        // Sol icad aþaðý yukarý
        if (e.which == 113 || e.which == 119 || e.which == 101 || e.which == 81 || e.which == 87 || e.which == 69) {
            if (Kul1.y > 0) {//Dýþa Çýkmama
                Kul1.y -= 10;
            }
        } else if (e.which == 97 || e.which == 100 || e.which == 115 || e.which == 65 || e.which == 68 || e.which == 83) {
            if (Kul1.y < canvasHeight - Kul1.yuk) {//Dýþa Çýkmama
                Kul1.y += 10;
            }
        };

        // Sað icad aþaðý yukarý
        if (e.which == 55 || e.which == 56 || e.which == 57) {
            if (Kul2.y > 0) {
                Kul2.y -= 10;
            }
        } else if (e.which == 52 || e.which == 53 || e.which == 54) {
            if (Kul2.y < canvasHeight - Kul2.yuk) {
                Kul2.y += 10;
            }
        };

    });



    function animate() {

        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.fillStyle = "rgb(255, 255, 255)"

        OrtaCizik(context, canvasHeight, canvasWidth);
        var rast = 20 + (Math.random() * (canvasHeight - 40));

        var tmpAsteroid = asteroids[0];
        tmpAsteroid.x += tmpAsteroid.vX;
        tmpAsteroid.y += tmpAsteroid.vY;



        if (tmpAsteroid.x - tmpAsteroid.radius < 0) {
            tmpAsteroid.x = canvasWidth / 2;
            tmpAsteroid.y = rast;
            tmpAsteroid.vX *= -1;
            //Sayý SSað tarfn
            Kul2.Puan += 1;
        } else if (tmpAsteroid.x + tmpAsteroid.radius > canvasWidth) {
            tmpAsteroid.x = canvasWidth/2;
            tmpAsteroid.y = rast;
            tmpAsteroid.vX *= -1;
            //Sayý Sol -tarafn
            Kul1.Puan += 1;
        };

        if (tmpAsteroid.y - tmpAsteroid.radius < 0) {
            tmpAsteroid.y = tmpAsteroid.radius;
            tmpAsteroid.vY *= -1;
        } else if (tmpAsteroid.y + tmpAsteroid.radius > canvasHeight) {
            tmpAsteroid.y = canvasHeight - tmpAsteroid.radius;
            tmpAsteroid.vY *= -1;
        };


        if (tmpAsteroid.x + tmpAsteroid.radius > canvasWidth - 35 && //Ýcada çarptý
                (tmpAsteroid.y + tmpAsteroid.radius > Kul2.y && tmpAsteroid.y + tmpAsteroid.radius < Kul2.y + Kul2.yuk)) {
            tmpAsteroid.vX *= -1; //Sekti
        }

        if (tmpAsteroid.x - tmpAsteroid.radius < 35 && //Ýcada çarptý
                (tmpAsteroid.y + tmpAsteroid.radius > Kul1.y && tmpAsteroid.y + tmpAsteroid.radius < Kul1.y + Kul1.yuk)) {
            tmpAsteroid.vX *= -1; //Sekti
        }

        Topac(context, tmpAsteroid.x, tmpAsteroid.y, tmpAsteroid.radius);





        icadSol(context, Kul1.y, canvasWidth, Kul1.yuk);
        icadSag(context, Kul2.y, canvasWidth, Kul2.yuk);


        PuanSag(context, canvasWidth, Kul2.Puan, Kul2.y + Kul2.yuk / 2);
        PuanSol(context, Kul1.Puan, Kul1.y + Kul1.yuk / 2);


        setTimeout(animate, 33);

    };



    animate();


}




function PuanSol(ctx, Puan, konum) {
    ctx.fillStyle = '#000';
    ctx.font = 'italic bold 30px sans-serif';
    ctx.textBaseline = 'bottom';
    ctx.fillText(Puan, 4, konum + 10);
}
function PuanSag(ctx, cw, Puan, konum) {
    ctx.fillStyle = '#000';
    ctx.font = 'italic bold 30px sans-serif';
    ctx.textBaseline = 'bottom';
    ctx.fillText(Puan, cw - 25, konum + 10);
}



function Topac(context, x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fillStyle = "white";
    context.fill();
}


function OrtaCizik(ctx, cHeight, cWidth) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ccc';
    ctx.beginPath();
    ctx.moveTo(cWidth / 2, 0);
    ctx.lineTo(cWidth / 2, cHeight);
    ctx.stroke();
}