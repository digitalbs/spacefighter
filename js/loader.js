var loader = {
    loaded:true,
    loadedCount: 0,
    totalCount: 0,
    init:function(){
        //check for sound support - I'll be using modernizr
        //TODO: Add sound

    },
    loadImage: function(url){
        var image = new Image();
        loader.loadIt();

        image.src = url;
        image.onload = loader.itemLoaded;
        return image;
    },
    soundFileExtn: ".ogg",
    loadSound:function(url){
        //load audio here
        var audio = new Audio();
        loader.loadIt();

        audio.src = url + loader.soundFileExtn;
        audio.addEventListener("canplaythrough", loader.itemLoaded, false);
        return audio;
    },
    itemLoaded: function(){
        loader.loadedCount++;
        $('#loadingMessage').html('Loaded ' + loader.loadedCount + ' of ' + loader.totalCount);

        if(loader.loadedCount === loader.totalCount)
        {
            //loader is done
            loaded = true;
            $('#loadingScreen').hide();

            //call loader method if exists
            if(loader.onload)
            {
                loader.onload();
                loader.onload = undefined;
            }
        }
    },
    loadIt: function(){
        this.totalCount++;
        this.loaded = false;
        $('#loadingScreen').show();
    }
}