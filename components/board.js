import React, {Component} from 'react';
import Square from './square.js';
import Fog from './fog.js';

var up = 'ArrowUp',
    left = 'ArrowLeft',
    right = 'ArrowRight',
    down = 'ArrowDown';

window.addEventListener('keydown', function(e){
    if ([37, 38, 39, 40].indexOf(e.keyCode)> -1){
        e.preventDefault();
    }
})

var winCheck = function(arr){
    for (var i = 0; i < arr.length; i++){
        for(var j =0; j < arr[j].length; j++){
            if (arr[i][j] == 'enemy'){
                return false;
            }
        }
    }
    return true;
}

var fogCheck =function(p){
     var arr = new Array(100);
       for (var i=0; i< arr.length; i++){
          arr[i]= new Array(60);
        }
    var x=p[0],
        y=p[1]
    for (var i =0; i< arr.length; i++){
        for (var j =0; j< arr[i].length; j++){
             if(i> x+5 || i < x-5 || j > y+5 || j<y-5){
               arr[i][j]='false';
             } else {
                 arr[i][j]='true';
             }
        }
    } 
    return arr;
}

var enemyCheck = function(arr, p, e, d, a){
    for ( var i = 0 ; i < e.length ; i++){
       if(d==left && p[0]-1==e[i].coord[0]&&p[1]==e[i].coord[1] ) {
            if (e[i].hp -a > 0){
               e[i] ={hp: e[i].hp - a, coord: e[i].coord, strike: e[i].strike };
               return e;
             } else{
               e[i] ={hp: e[i].hp - a, coord: e[i].coord, strike: e[i].strike };
               arr[e[i].coord[0]].splice(e[i].coord[1], 1, 'true');
               return e;
             }
             
        } else if(d == up && p[0]==e[i].coord[0]&&p[1]-1==e[i].coord[1]){
             if (e[i].hp -a > 0){
               e[i] ={hp: e[i].hp - a, coord: e[i].coord, strike: e[i].strike };
               return e;
             } else{
               e[i] ={hp: e[i].hp - a, coord: e[i].coord, strike: e[i].strike };
               arr[e[i].coord[0]].splice(e[i].coord[1], 1, 'true');
               return e;
             }
             
        } else if(d ==right && p[0]+1==e[i].coord[0]&&p[1]==e[i].coord[1]){
             if (e[i].hp -a > 0){
               e[i] ={hp: e[i].hp - a, coord: e[i].coord, strike: e[i].strike };
               return e;
             } else{
               e[i] ={hp: e[i].hp - a, coord: e[i].coord, strike: e[i].strike };
               arr[e[i].coord[0]].splice(e[i].coord[1], 1, 'true');
               return e;
             }
           
       } else if(d == down  && p[0]==e[i].coord[0]&&p[1]+1==e[i].coord[1]){
               if (e[i].hp -a > 0){
                 e[i] ={hp: e[i].hp - a, coord: e[i].coord, strike: e[i].strike };
                 return e;
               } else{
                 e[i] ={hp: e[i].hp - a, coord: e[i].coord, strike: e[i].strike };
                 arr[e[i].coord[0]].splice(e[i].coord[1], 1, 'true');
                 return e;
               }
             
       } 
    }
}

var playerAttack = function(p){
    return Math.floor(Math.random()*p.strike-0);
}

var enemyAttack = function(p, e, d){
    for ( var i = 0 ; i < e.length ; i++){
       if(d==left) {
            if(p[0]-1==e[i].coord[0]&&p[1]==e[i].coord[1]){
            return Math.floor(Math.random()*e[i].strike-0);
        }
       } else if(d == up){
            if(p[0]==e[i].coord[0]&&p[1]-1==e[i].coord[1]){
            return Math.floor(Math.random()*e[i].strike-0);
        }
       } else if(d ==right){
               if(p[0]+1==e[i].coord[0]&&p[1]==e[i].coord[1]){
               return Math.floor(Math.random()*e[i].strike-0);
        }
       } else if(d == down){
               if(p[0]==e[i].coord[0]&&p[1]+1==e[i].coord[1]){
               return Math.floor(Math.random()*e[i].strike-0);
        }
       }
    }
}

var weaponName = function(p, w, d){
    for (var i = 0; i< w.length; i++){
       if(d==left) {
            if(p[0]-1==w[i].coord[0]&&p[1]==w[i].coord[1]){
            return w[i].name;
        }
       } else if(d == up){
            if(p[0]==w[i].coord[0]&&p[1]-1==w[i].coord[1]){
            return w[i].name;
        }
       } else if(d ==right){
               if(p[0]+1==w[i].coord[0]&&p[1]==w[i].coord[1]){
               return w[i].name;
        }
       } else if(d == down){
               if(p[0]==w[i].coord[0]&&p[1]+1==w[i].coord[1]){
               return w[i].name;
        }
       }
        
    }
   
}

var weaponStrike =function(p, w, d){
    for (var i = 0; i< w.length; i++){
        if(d==left) {
            if(p[0]-1==w[i].coord[0]&&p[1]==w[i].coord[1]){
            return w[i].strike;
        }
       } else if(d == up){
            if(p[0]==w[i].coord[0]&&p[1]-1==w[i].coord[1]){
            return w[i].strike;
        }
       } else if(d ==right){
               if(p[0]+1==w[i].coord[0]&&p[1]==w[i].coord[1]){
               return w[i].strike;
        }
       } else if(d == down){
               if(p[0]==w[i].coord[0]&&p[1]+1==w[i].coord[1]){
               return w[i].strike;
        }
       }
    }
}

var playerCoord = function(p, m){
    var x = p[0],
        y= p[1];
        if (m==left){
            return[x-1, y];
        } else if (m==up){
            return [x, y-1];
        } else if (m==right){
            return [x+1, y];
        }else if (m==down){
            return [x, y+1];
        }
}

var playerMove = function(arr, p, m){
    var x=p[0],
        y=p[1];
    if (m== left){
          arr[x].splice(y, 1, 'true');
          x= x-1;
          arr[x].splice(y, 1, 'player');
          return arr;
     } else if (m== up){
          arr[x].splice(y, 1, 'true');
          arr[x].splice(y-1, 1, 'player');
          return arr;
     } else if (m== right){
          arr[x].splice(y, 1, 'true');
          x= x+1;
          arr[x].splice(y, 1, 'player');
          return arr;
     }else if (m== down){
          arr[x].splice(y, 1, 'true');
          arr[x].splice(y+1, 1, 'player');
          return arr;
     }
     
}

var checkPos =function (arr , p, d){
    var x= p[0],
        y= p[1];
    if(d == left) {
       if (arr[x-1][y] =='true'){
             return 'true';
       } else if (arr[x-1][y] =='health'){
             return 'health';
       } else if(arr[x-1][y] =='weapon'){
           return 'weapon';
       } else if(arr[x-1][y] =='enemy'){
           return 'enemy';
       }
    } else if(d== up){
        if(arr[x][y-1] == 'true'){
            return 'true';
        } else if(arr[x][y-1] == 'health'){
            return 'health';
        } else if(arr[x][y-1] == 'weapon'){
            return 'weapon';
        }else if(arr[x][y-1] == 'enemy'){
            return 'enemy';
        }
        
    }else if(d== right){
        if(arr[x+1][y] =='true') {
            return 'true';
        } else if(arr[x+1][y] =='health'){
            return 'health';
        } else if(arr[x+1][y] =='weapon'){
            return 'weapon';
        }else if(arr[x+1][y] =='enemy'){
            return 'enemy';
        }
    }else if(d== down ){
        if (arr[x][y+1] == 'true'){
            return 'true';
        } else if( arr[x][y+1] == 'health') {
            return 'health';
        } else if(arr[x][y+1] == 'weapon'){
            return 'weapon';
        }else if(arr[x][y+1] == 'enemy'){
            return 'enemy';
        }
    }
}

var position = function(arr, p, e, w){
    var a = arr,
        x = p[0],
        y = p[1];
        arr[x].splice(y, 1, 'player');
    for (var i=0; i <e.length; i++){
       arr[e[i].coord[0]].splice(e[i].coord[1], 1, 'enemy')
    }
    for (var i=0; i <w.length; i++){
       arr[w[i].coord[0]].splice(w[i].coord[1], 1, 'weapon')
    }
    
    return arr;
}

var health = function(){
    var arr =[];
    for(var i =0 ; i< 50; i++){
        arr.push([Math.floor(Math.random()*100-0), Math.floor(Math.random()*60-0)]);
    }
  
    return arr;
}

var healthbox= function(x, j, h){
    
    for (var i=0; i< h.length; i++){
        if (h[i][0] === x && h[i][1]=== j){
        
            return true;
        }
    }
}

var coords = function(i, j){
    if((i<=97 && i >=59 )&&(j >=35 && j< 59)){
        return true;
    } else if ((i<=85 && i >=75) && (j >=25 && j <35 )){
        return true;
    }  else if ((i<=95 && i >=63) && (j >=5 && j <25 )){
        return true;
    }  else if ((i<=62&& i >=55) && (j >=15 && j <20 )){
        return true;
    }  else if ((i<55 && i >=25) && (j >=2 && j <30 )){
        return true;
    }  else if ((i<=40 && i >=35) && (j >=30 && j <45 )){
        return true;
    }  else if ((i<=53 && i >=30) && (j >=45 && j <59 )){
        return true;
    }  else if ((i< 30 && i >=20) && (j >=49 && j <53 )){
        return true;
    }  else if ((i<=20 && i >=2) && (j >=35 && j <59 )){
        return true;
    }  else if ((i<=12 && i >=9) && (j >=20 && j <35 )){
        return true;
    }  else if ((i<=22 && i >=1) && (j >=3 && j <20 )){
        return true;
    }
    
}

var boardInit = function(){
    var arr = new Array(100);
    for (var i=0; i< arr.length; i++){
        arr[i]= new Array(60);
    }
    var h = health();
    
    for (var i=0; i< arr.length; i++){
        for (var j = 0 ; j< arr[i].length; j++){
            var k = arr[i][j];
           if (coords(i, j)===true && healthbox(i, j, h)===true){
                arr[i][j]='health';
           } else if (coords(i, j)===true){
             
               arr[i][j]='true';
           } else {
               arr[i][j]='false';
           }
            
        }
    }
   
    return arr;
    
}

class Board extends Component{
    
    constructor(props){
        super(props);
        this.state={
            array: boardInit(),
            player:{ 
                coord: [11, 10],
                hp: 100,
                weapon: 'fist',
                strike: 5
           
            },
            enemy: [
                { 
                    coord: [10, 15],
                    hp: 20, 
                    strike: 5
                },
                {
                    coord: [10, 30],
                    hp: 30,
                    strike: 15
                },
                {
                    coord: [8, 45], 
                    hp: 30,
                    strike: 15
                },
                {
                    coord: [15, 40],
                    hp: 30,
                    strike: 15
                },
                {
                    coord: [35, 50],
                    hp: 40,
                    strike: 20
                },{
                    coord: [40, 47],
                    hp: 40,
                    strike: 25
                },
                {
                    coord: [35, 10],
                    hp: 30,
                    strike: 20
                },
                {
                  coord: [40, 20],
                  hp: 40,
                  strike: 30
                },
                {
                     coord: [50, 20],
                    hp: 30,
                    strike: 20
                },
                {
                     coord: [80, 20],
                    hp: 80,
                    strike: 30
                },
                {
                     coord: [90, 45],
                    hp: 30,
                    strike: 20
                },
                {
                     coord: [70, 40],
                    hp: 30,
                    strike: 20
                },
                {
                     coord: [80, 55],
                    hp: 100,
                    strike: 50
                }
                ],
                weapons: [
                    {
                        name: 'dagger',
                        coord: [15, 10],
                        strike: 20
                    },
                    {
                        name: 'scourge',
                        coord: [40, 56],
                        strike: 40
                    },
                    {
                        name: 'mace',
                        coord: [52, 9],
                        strike: 50
                    },
                    {
                        name: 'sword',
                        coord: [83, 22 ],
                        strike: 70
                    }
                    ]
                
        }
        this.keyhandler = this.keyhandler.bind(this);
        
    }
    
    componentWillMount(){
        var th =this;
        this.setState({array: position(th.state.array, th.state.player.coord, th.state.enemy, th.state.weapons)});
    }
    
    componentDidMount(){
        window.addEventListener('keydown', this.keyhandler)
    }
    
    keyhandler(e){
        var arr = this.state.array,
            player= this.state.player,
            weapons = this.state.weapons,
            enemy = this.state.enemy,
            direction,
            th =this;
          
              direction = checkPos(arr, player.coord, e.code);
              if (direction=='true'){
              this.setState({array: playerMove(arr, player.coord, e.code),
                  player: { coord: playerCoord(player.coord, e.code),
                            hp: player.hp,
                            weapon: player.weapon,
                            strike: player.strike
                  }
              });
              } else if (direction=='health'){
                  this.setState({array: playerMove(arr, player.coord, e.code),
                  player: { coord: playerCoord(player.coord, e.code),
                            hp: player.hp + 20,
                            weapon: player.weapon,
                            strike: player.strike
                  }
              });
              } else if(direction=='weapon'){
                    this.setState({array: playerMove(arr, player.coord, e.code),
                       player: { coord: playerCoord(player.coord, e.code),
                            hp: player.hp,
                            weapon: weaponName(player.coord, weapons, e.code),
                            strike: weaponStrike(player.coord, weapons,e.code)
                  }
              });
              } else if(direction=='enemy'){
                  var enemyAtt = enemyAttack(player.coord, enemy, e.code ),
                      playerAtt = playerAttack(player);
                      if (playerAtt>= enemy.hp){
                           this.setState({
                               enemy: enemyCheck(arr, player.coord, enemy, e.code, playerAtt),
                               array: playerMove(arr, player.coord, e.code),
                               player: { coord: playerCoord(player.coord, e.code),
                                 hp: player.hp,
                                 weapon: player.weapon,
                                 strike: player.strike
                             }
                         });
                      } 
                      
                          this.setState({ 
                              enemy: enemyCheck(arr, player.coord, enemy, e.code, playerAtt),
                              player: {
                                 coord: player.coord,
                                 hp : player.hp - enemyAtt,
                                 weapon: player.weapon,
                                 strike: player.strike
                              },
                          })
                      
                  
              }
    }
    
   render() {
       var th =this,
           fogarray= fogCheck(this.state.player.coord);
       if (winCheck(this.state.array)==true){
            setInterval(function(){
               location.reload(true);
           }, 3000)
           return <h1 className="lose"> YOU WIN!!!!!</h1>
       }
       
       if (this.state.player.hp > 0){
       return(
           
           <div>
           <div className='stats'>
             <ul className='ulstat'>
               <li><div className="health">Health:<br /> {this.state.player.hp}</div></li>
                <li><div className="weapon">Weapon:<br /> {this.state.player.weapon} +{this.state.player.strike}</div></li>
                 <li><div className="lex">Lexicon:<br /> 
                   <div className="squarep"></div> You<br />
                   <div className="squareh"></div> Health<br />
                   <div className="squarew"></div> Weapon<br />
                   <div className="squaree"></div> Enemy
                 </div></li>
             </ul>
           </div>
           <div className='board'>
            <ul className='map'>
             {this.state.array.map(function(val, i){
                return( <li key={i}> 
                {val.map(function(place, j){
                     return (<div key={j} ><Square  val={place} ></Square></div>)
                 })
                 }</li>)
             }
             
             )}
            </ul>
            <ul className="fog">
             {fogarray.map(function(val, i){
                return( <li key={i}> 
                {val.map(function(fog, j){
                     return (<div key={j} ><Fog  val={fog} ></Fog></div>)
                 })
                 }</li>)
             }
             
             )}
            </ul>
           </div>
           </div>
           )
       } else{
           /*global location*/
           setInterval(function(){
               location.reload(true);
           }, 3000)
           return <h1 className="lose"> YOURE DEAD!!!</h1>
       }
   } 
}

export default Board;
