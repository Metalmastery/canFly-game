function Collider(){
    var objects = [];
    var frame = null;
    function track (obj, callback, context){
        objects.push([obj, callback, context]);
        console.log('TRACK', obj);
    }

    function untrack(obj){
        for (var i in objects){
            if (objects[i] && objects[i][0] === obj) {
                //objects.splice(i,1, null);
                objects[i] = null;
            }
        }

    }

    function check(){
        for (var i = 0; i < objects.length; i++) {
            for (var j = 0; j < objects.length; j++) {
                if (i != j && objects[i] && objects[j] && Math.abs(objects[i][0].x - objects[j][0].x) < 10 && Math.abs(objects[i][0].y - objects[j][0].y) < 10) {
                    console.log(typeof objects[i][1], typeof objects[j][1]);
                    objects[i][1].call(objects[i][2]);
                    //objects[j][1].call(objects[j][2]);
                }
            }
        }
        frame = requestAnimationFrame(check);
    }

    function start(){
        frame = requestAnimationFrame(check);
    }

    function stop(){
        cancelAnimationFrame(frame);
    }

    return {
        track : track,
        untrack : untrack,
        start : start,
        stop : stop
    };
}