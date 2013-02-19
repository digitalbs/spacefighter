(function(){
    var canvas = document.querySelector("#canvasGame"),
        context = canvas.getContext("2d");
    //create asteroid
    var Star = function(x, y, radius, vX)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        //add velocity
        this.vX = vX;
    }

    var Player = function(x, y){
        this.x = x;
        this.y = y;

        this.width = 80;
        this.height = 30;
        this.halfWidth = this.width/2;
        this.halfHeight = this.height/2;

        this.vX = 0;
        this.vY = 0;

        this.moveRight = false;
        this.moveUp = false;
        this.moveDown = false;
        this.moveLeft = false;
        this.afterburn = false;
        this.shoot = false;

        this.flameLength = 20;
    }

    var SPACE_FIGHTER = {
        playGame: true,
        player:  null,
        score: 0,
        environment: {
            numStars: 20,
            stars: []
        },
        //controls
        arrowUp: 38,
        arrowRight: 39,
        arrowDown: 40,
        arrowLeft: 37,
        afterburner: 65,
        spacebar: 32,
        canvasWidth:0,
        canvasHeight:0,
        mode:"intro",
        init: function(){
            canvas = $(canvas);
            canvas.attr('width', $(window).get(0).innerWidth);
            canvas.attr('height', $(window).get(0).innerHeight);

            //initialize objects
            levels.init();
            loader.init();

            //hide level and show start screen
            $('#levelSelect').show();
            $('#gameLevel').show();
        },
        startGame: function(){
            var that = this;

            SPACE_FIGHTER.canvasWidth = canvas.width();
            SPACE_FIGHTER.canvasHeight = canvas.height();

            //$('.gameLayer').hide();

            SPACE_FIGHTER.mode = "intro";
            SPACE_FIGHTER.offsetLeft = 0;
            SPACE_FIGHTER.ended = false;


            this.player = new Player(150, SPACE_FIGHTER.canvasHeight/2);

            //start animation loop
            this.animate();
        },
        buildStars: function(){
            //create stars
            for(var i = 0; i < SPACE_FIGHTER.environment.stars.length; i++)
            {
                var tmpStar = SPACE_FIGHTER.environment.stars[i];

                //calculate new position
                if(tmpStar.x + tmpStar.radius < 0)
                {
                    tmpStar.radius =  1 + (Math.random() * 2);
                    tmpStar.x = SPACE_FIGHTER.canvasWidth + tmpStar.radius;
                    tmpStar.y = Math.floor(Math.random() * SPACE_FIGHTER.canvasHeight);
                    tmpStar.vX = -4 - (Math.random() * 5);
                }
                tmpStar.x += tmpStar.vX;
                context.save();
                context.fillStyle = "#ffffff";
                context.shadowColor = "#2172a9";
                context.shadowBlur = 60
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;

                context.beginPath();
                context.arc(tmpStar.x,tmpStar.y,tmpStar.radius,0,Math.PI*2,true);
                context.closePath();
                context.fill();

            }

            while(SPACE_FIGHTER.environment.stars.length < SPACE_FIGHTER.environment.numStars)
            {
                var radius = 1 + (Math.random() * 2),
                    x = SPACE_FIGHTER.canvasWidth + radius + Math.floor(Math.random() * SPACE_FIGHTER.canvasWidth),
                    y = Math.floor(Math.random() * SPACE_FIGHTER.canvasHeight),
                    vX = -5 - (Math.random() * 5);

                SPACE_FIGHTER.environment.stars.push(new Star(x, y, radius, vX));
            }
            context.restore();

        },
        animate: function(){
            requestAnimationFrame(SPACE_FIGHTER.animate);
            SPACE_FIGHTER.handlePanning();
            SPACE_FIGHTER.flyTime();
        },
        handlePanning: function(){
            if(this.player.x + this.player.halfWidth > SPACE_FIGHTER.canvasWidth/2)
            {
                if(this.player.moveRight === true)
                    SPACE_FIGHTER.offsetLeft -= 2;
            }
            else if(this.player.x + this.player.halfWidth < SPACE_FIGHTER.canvasWidth/2)
            {
                    if(SPACE_FIGHTER.offsetLeft < 0)
                        SPACE_FIGHTER.offsetLeft += 2;
            }
        },
        pilotControls: function(){
            var that = this;
            $(window).keydown(function(e)
            {
                var keyCode = e.keyCode;
                switch(keyCode)
                {
                    case that.arrowRight:
                        that.player.moveRight = true;
                        break;

                    case that.arrowUp:
                        that.player.moveUp = true;
                        break;

                    case that.arrowLeft:
                        that.player.moveLeft = true;
                        break;

                    case that.arrowDown:
                        that.player.moveDown = true;
                        break;

                    case that.spacebar:
                        player.shoot = true;
                        break;

                    case that.afterburner:
                        player.afterburn = true;
                        break;
                }
            });

            $(window).keyup(function(e){
                var keyCode = e.keyCode;

                switch(keyCode)
                {
                    case that.arrowRight:
                        that.player.moveRight = false;
                        break;

                    case that.arrowUp:
                        that.player.moveUp = false;
                        break;

                    case that.arrowLeft:
                        that.player.moveLeft = false;
                        break;

                    case that.arrowDown:
                        that.player.moveDown = false;
                        break;

                    case that.spacebar:
                        player.shoot = false;
                        break;

                    case that.afterburner:
                        player.afterburn = false;
                        break;
                }

            });

            this.player.vX = 0;
            this.player.vY = 0;

            if(this.player.moveRight)
            {
                this.player.vX = 3;
            }
            else
            {
                this.player.vX = -3;
            }

            if(this.player.moveLeft)
            {
                this.player.vX = -6;
            }

            if(this.player.moveUp)
            {
                this.player.vY = -3;
            }

            if(this.player.moveDown)
            {
                this.player.vY = 3;
            }

            if(this.player.afterburn)
            {
                this.player.vX = 6;
            }
        },
        flyTime: function(){
            context.clearRect(0, 0, SPACE_FIGHTER.canvasWidth, SPACE_FIGHTER.canvasHeight);

            context.drawImage(SPACE_FIGHTER.currentLevel.foregroundImage, SPACE_FIGHTER.offsetLeft, 0, 2560, 1600);

            if(SPACE_FIGHTER.currentLevel.background === "stars")
                SPACE_FIGHTER.buildStars();

            SPACE_FIGHTER.pilotControls();

            this.player.x += this.player.vX;
            this.player.y += this.player.vY;

            //calculate end of screens
            if(this.player.x - this.player.halfWidth < 20)
            {
                this.player.x = 20 + this.player.halfWidth;
            }
            else if(this.player.x + this.player.halfWidth > SPACE_FIGHTER.canvasWidth - 60)
            {
                this.player.x = SPACE_FIGHTER.canvasWidth - 60 - this.player.halfWidth;
            }

            if(this.player.y - this.player.halfHeight < 20)
            {
                this.player.y = 20 + this.player.halfHeight;
            }
            else if(this.player.y + this.player.halfHeight > SPACE_FIGHTER.canvasHeight - 20)
            {
                this.player.y = SPACE_FIGHTER.canvasHeight - 20 - this.player.halfHeight;
            }

            //create new spaceship
            context.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);

            if(this.player.moveRight || this.player.afterburn)
            {
                context.save();
                context.translate(this.player.x, this.player.y + 12);
                if(this.player.flameLength == 20)
                {
                    this.player.flameLength = 15;
                }
                else
                {
                    this.player.flameLength = 20;
                }
                if(this.player.afterburn)
                {
                    this.player.flameLength = 30;
                }
                context.fillStyle = "orange";
                context.beginPath();
                context.moveTo(0, -3);
                context.lineTo(-this.player.flameLength, 0);
                context.lineTo(0, 3);
                context.closePath();
                context.fill();

                context.restore();
            }
        }
    };

    var levels = {
        data:[
            {
                name: 'Milky Way System',
                foreground: 'the-milky-way',
                background: 'stars',
                entities:[]
            },
            {
                name: 'The Sun',
                foreground: 'Planet-Sun',
                background: '',
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

            $('.level').on('click', function(){
                levels.load($(this).attr('data-level'));
            });

        },
        load:function(level)
        {
            var cLevel = levels.data[level];

            //create new level object
            SPACE_FIGHTER.currentLevel = {
                number: level,
                ship:[]
            };
            SPACE_FIGHTER.currentLevel.foregroundImage = loader.loadImage("/Space-Fighter/img/foreground/" + cLevel.foreground + ".jpg");
            SPACE_FIGHTER.currentLevel.background = cLevel.background;

            if(loader.loaded){
                SPACE_FIGHTER.startGame();
            }
            else
            {
                loader.onload = SPACE_FIGHTER.start;
            }
            $('#levelSelect').hide();
        }
    }




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
            image.onload = loader.itemLoaded();

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
        loadIt: function(){
            this.totalCount++;
            this.loaded = false;
            $('#loadingScreen').show();
        },
        itemLoaded: function(){
            loader.loadedCount++;
            $('#loadingMessage').html('Loaded ' + loader.loadedCount + ' of ' + loader.totalCount);

            if(loader.loadedCount === loader.totalCount)
            {
                //loader is done
                loader.loaded = true;
                $('#loadingScreen').hide();


                //call loader method if exists
                if(loader.onload)
                {
                    loader.onload();
                    loader.onload = undefined;
                }
            }
        }
    }

    //box2d common
    var b2Vec2 = Box2D.Common.Math.b2Vec2,
        b2BodyDef = Box2D.Common.Dynamics.b2BodyDef,
        b2Body = Box2D.Dynamics.b2Body,
        b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
        b2Fixture = Box2D.Dynamics.b2Fixture,
        b2World = Box2D.Dynamics.b2World,
        b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
        b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
        b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
        b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;

    var world,
        scale = 30;

    function init()
    {
        //setup box2d world
        var gravity = new b2Vec2(0, 9.8),
            allowSleep = true;
        world = new b2World(gravity, allowSleep);
    }


    function setupDebugDraw()
    {
        var debugDraw = new b2DebugDraw();
        debugDraw.SetSprite(context);

        //set scale
        debugDraw.SetDrawScale(scale);
        debugDraw.SetFillAlpha(0.3);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);

        world.SetDebug
    }

    //start game
    SPACE_FIGHTER.init();
})();

