$(document).ready(function(){
    
    var canvas = $("#canvas")[0];

    var ctx = canvas.getContext("2d");
    var w = $("#canvas").width();
    var h = $("#canvas").height();
    
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, w, h);

    var cw = 10;
    var food;
    var dir;

    var worm_array;

    function init() {
        dir = "right";
        create_worm();
        create_food();

        paint();
    }

    function create_worm() {
        var length = 5;
        worm_array = [];

        for (var i = length - 1; i >= 0; i--) {
            worm_array.push({ x: i, y: 0 });
        }
    }
    
    function create_food() {
        food = {
            x: Math.round(Math.random() * (w - cw) / cw),
            y: Math.round(Math.random() * (h - cw) / cw)
        };
    }

    function paint() {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0, 0, w, h);

        var headX = worm_array[0].x;
        var headY = worm_array[0].y;

        var tail = worm_array.pop();
        tail.x = headX;
        tail.y = headY;

        // worm
        for (var i = 0; i < worm_array.length; i++) {
            var c = worm_array[i];
            paint_cell(c.x, c.y, "red");
        }

        // food
        paint_cell(food.x, food.y, "green");

    }

    function paint_cell(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * cw, y * cw, cw, cw);
        ctx.strokeStyle = "white";
        ctx.strokeRect(x * cw, y * cw, cw, cw);
    }

    init();
});