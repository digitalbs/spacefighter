var levels = {
    data:[
        {
            name: 'Milky Way System',
            foreground: 'the-milky-way',
            background: 'sun',
            entities:[]
        }
    ],
    //start level screen
    init:function(){
        var html = "";
        for(var i = 0; i < levels.data.length; i += 1){
            var level = levels.data[i];
            html += '<a href="javascript:void(0);" data-level="' + i + '" class="level btn btn-primary">' + level.name + '</a>';
        }
        $('#levelSelect').html(html);

        //add click event for level select screen
        document.querySelector('.level').addEventListener('click', function(){
            levels.load($(this).attr('data-level'))}
            , false);
    },
    load:function(level)
    {
        var level = levels.data[level];
        //create new level object
        SPACE_FIGHTER.currentLevel = {
            number: level,
            ship:[]
        };

        SPACE_FIGHTER.currentLevel.foregroundImage = loader.loadImage("img/foreground/" + level.foreground + ".jpg");

        if(loader.loaded){
            SPACE_FIGHTER.startGame();
        }
        $('#levelSelect').hide();
    }
}

