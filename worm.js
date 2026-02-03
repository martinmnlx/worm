$(document).ready(function() {
    var canvas = $("#canvas")[0];

    // draw the initial canvas
    var ctx = canvas.getContext("2d");
    var w = $("#canvas").width();
    var h = $("#canvas").height();

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, w, h);

    // global variables
    var cw = 10;
    var food;
    var dir;

    var worm_array;

    var game_loop;

    function initialize() {
        dir = "right";
        
        create_worm();
        create_food();

        if (typeof game_loop != "undefined")
            clearInterval(game_loop);
        game_loop = setInterval(paint, 45);
        
        paint();
    }

    function create_worm() {
        var length = 5;
        worm_array = [];

        for (var i = length - 1; i >= 0; i--) {
            worm_array.push({
                x: i,
                y: 0
            });
        }
    }

    function create_food() {
        food = {
            x: Math.round(Math.random() * (w - cw) / cw),
            y: Math.round(Math.random() * (h - cw) / cw)
        };
    }

    function paint() {
        // re-draw the canvas
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0, 0, w, h);

        // moving the worm
        var headX = worm_array[0].x;
        var headY = worm_array[0].y;

        // shift the head of the worm
        if (dir == "right") headX ++;
        else if (dir == "left") headX --;
        else if (dir == "up") headY --;
        else if (dir == "down") headY ++;

        // check for body/wall collision
        if (headX == -1 || headX == w / cw || headY == -1 || headY == h / cw || check_body(headX, headY, worm_array)) {
            initialize();
            return;
        }

        // check for food collision
        if (headX == food.x && headY == food.y) {
            var tail = {
                x: headX,
                y: headY
            };
            
            worm_array.unshift(tail);

            create_food();
        } 
        else {
            //var tail = worm_array.pop();
            //tail.x = headX;
            //tail.y = headY;
        }

        // shift - tail becomes head repeatedly
        var tail = worm_array.pop();
        tail.x = headX;
        tail.y = headY;

        worm_array.unshift(tail);

        // paint the worm
        for (var i = 0; i < worm_array.length; i++) {
            var c = worm_array[i];
            paint_cell(c.x, c.y, "red");
        }

        // paint the food
        paint_cell(food.x, food.y, "green");
    }

    function paint_cell(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * cw, y * cw, cw, cw);
        ctx.strokeStyle = "white";
        ctx.strokeRect(x * cw, y * cw, cw, cw);
    }

    function check_body(x, y, array) {
        for (var i = 0; i < array.length; i++) {
            if (x == array[i].x && y == array[i].y) return true;
            return false; 
        }
    }

    $(document).keydown(function(e) {
        var key = e.which;

        if (key == "37") dir = "left";
        else if (key == "38") dir = "up";
        else if (key == "39") dir = "right";
        else if (key == "40") dir = "down";
    });

    initialize();
});