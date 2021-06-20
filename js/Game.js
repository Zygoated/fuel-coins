class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
  }

  play(){
    var x = allPlayers[plr].positionX;
    var y = height - allPlayers[plr].positionY;
    cars[index-1].position.x = x;
    cars[index-1].position.y = y;

    

    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if (index=== player.index){
      stroke(10);
      fill("red");
      ellipse(x,y,60,60);
      this.handleFuel(index);
      this.handlePowerCoins(index);
      camera.position.x = width/2;
      camera.position.y = cars[index-1].position.y;
    }

    if(allPlayers !== undefined){
      var display_position = 130;
      for(var plr in allPlayers){
        if (plr === "player" + player.index)
          fill("red")
        else
          fill("black");

        display_position+=20;
        textSize(15);
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
  }
  
  handleFuel(index){
    cars[index-1].overlap(fuels,function(collector,collected){player.fuel = 185;
    collected.remove()})
  }
  handlePowerCoins(index){
    cars[index-1].overlap(powerCoins,function(collector,collected){
      player.score+=21;
      player.update();
      collected.remove();
    })
  }
}
