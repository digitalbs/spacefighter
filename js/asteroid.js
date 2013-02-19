/*
 function animate()
 {
 //clear
 context.clearRect(0, 0, canvasWidth, canvasHeight);

 for(var i = 0; i < asteroids.length; i++)
 {
 var tmpAsteroid = asteroids[i];

 //calculate new position
 if(tmpAsteroid.x + tmpAsteroid.radius < 0)
 {
 tmpAsteroid.radius = 15 + (Math.random() * 10);
 tmpAsteroid.x = canvasWidth + tmpAsteroid.radius;
 tmpAsteroid.y = Math.floor(Math.random() * canvasHeight);
 tmpAsteroid.vX = -5 - (Math.random() * 5);
 }
 tmpAsteroid.x += tmpAsteroid.vX;


 var dX = player.x - tmpAsteroid.x;
 var dY = player.y - tmpAsteroid.y;
 var distance = Math.sqrt((dX * dX) + (dY * dY));

 if(!(tmpAsteroid.x + tmpAsteroid.radius < player.x) &&
 !(player.x + player.width < tmpAsteroid.x) &&
 !(tmpAsteroid.y + tmpAsteroid.radius < player.y) &&
 !(player.y + player.height < tmpAsteroid.y))
 {
 soundThrust.pause();

 soundDeath.currentTime = 0;
 soundDeath.play();
 //$('body').append('<img src="Images/explosion.gif" id="explosion" />');


 playGame = false;
 clearTimeout(scoreTimeout);


 uiStats.hide();
 uiComplete.show();

 //soundBackground.pause();
 $(window).unbind('keyup');

 }

 var asImage = new Image();
 asImage.src = "Images/asteroid.png";

 context.drawImage(asImage, tmpAsteroid.x, tmpAsteroid.y, tmpAsteroid.radius, tmpAsteroid.radius);

 }

 player.vX = 0;
 player.vY = 0;

 if(player.moveRight)
 {
 player.vX = 3;
 }
 else
 {
 player.vX = -3;
 }

 if(player.moveLeft)
 {
 player.vX = -6;
 }

 if(player.moveUp)
 {
 player.vY = -3;
 }

 if(player.moveDown)
 {
 player.vY = 3;
 }

 if(player.afterburn)
 {
 player.vX = 6;
 }

 player.x += player.vX;
 player.y += player.vY;

 if(player.x - player.halfWidth < 20)
 {
 player.x = 20 + player.halfWidth;
 }
 else if(player.x + player.halfWidth > canvasWidth - 20)
 {
 player.x = canvasWidth - 20 - player.halfWidth;
 }

 if(player.y - player.halfHeight < 20)
 {
 player.y = 20 + player.halfHeight;
 }
 else if(player.y + player.halfHeight > canvasHeight - 20)
 {
 player.y = canvasHeight - 20 - player.halfHeight;
 }

 //create new spaceship
 var image = new Image();
 image.src = "Images/spaceship.png";

 context.drawImage(image, player.x, player.y, player.width, player.height);

 //context.fillStyle = "rgb(255, 0, 0)";
 //context.beginPath();
 //context.moveTo(player.x + player.halfWidth, player.y);
 //context.lineTo(player.x - player.halfWidth, player.y - player.halfHeight);
 //context.lineTo(player.x - player.halfWidth, player.y + player.halfHeight);

 //context.closePath();
 //context.fill();

 while(asteroids.length < numAsteroids)
 {
 var radius;
 if(numAsteroids < 30)
 {
 radius = 5 + (Math.random() * 10);
 }
 else
 {
 radius = 25 + (Math.random() * 10);
 }
 var x = canvasWidth + radius + Math.floor(Math.random() * canvasWidth);
 var y = Math.floor(Math.random() * canvasHeight);
 var vX = -5 - (Math.random() * 5);

 asteroids.push(new Asteroid(x, y, radius, vX));
 }

 if(player.moveRight || player.afterburn)
 {
 context.save();
 context.translate(player.x, player.y + 12);
 if(player.flameLength == 20)
 {
 player.flameLength = 15;
 }
 else
 {
 player.flameLength = 20;
 }
 if(player.afterburn)
 {
 player.flameLength = 30;
 }
 context.fillStyle = "orange";
 context.beginPath();
 context.moveTo(0, -3);
 context.lineTo(-player.flameLength, 0);
 context.lineTo(0, 3);
 context.closePath();
 context.fill();

 context.restore();
 }

 if(player.shoot)
 {
 lasers.push(new Laser(player.x + 50, player.y + 5));
 }

 if(playGame)
 {
 //run animation every 33 ms
 setTimeout(animate, 33);
 }

 for(var i = 0; i < lasers.length; i++)
 {
 var lasered = lasers[i];
 context.fillStyle = "red";


 if(player.afterburn)
 {
 lasered.x += 25;
 }
 else
 {
 context.fillRect(lasered.x + 25, lasered.y + 5, lasered.width, lasered.height);
 lasered.x += 15;
 }

 if(!(tmpAsteroid.x + tmpAsteroid.radius < lasered.x ) &&
 !(lasered.x + lasered.width < tmpAsteroid.x) &&
 !(tmpAsteroid.y + tmpAsteroid.radius < lasered.y) &&
 !(lasered.y + lasered.height < tmpAsteroid.y))
 {
 lasers.splice(lasers.length - 1, 1);
 }

 }

 };
 */