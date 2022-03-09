import ShootingEnemyParent from '../shootingEnemyParent.js';
import Homing_p from '../homing_p.js';


/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class Enemy6_2 extends ShootingEnemyParent{
  
  constructor(scene, player, x, y) {
    super(scene,player,x,y,'enemy');
    this.Pv = 100;
    this.fireDirection = new Phaser.Math.Vector2(1,0);
    //this.shootTime = 1;
    this.dispCont = 0;
    this.dispMax = 300;
    this.dispTime = 0.03;
    this.actDispTime = 0;
    this.nVueltas = 6;
    this.shootTime = 5; 
    this.shootTime += this.dispMax*this.dispTime; 
  }
  /*creador(){
    this.projectileE = new Homing_p(this.scene,this.x,this.y);
    
  }*/

  setInitialVelocity(){
        this.projectileE.body.setVelocity(this.fireDirection.x*this.Pv,this.fireDirection.y*this.Pv);
    }
    
    attack(d,dt){

        if (this.cont === 0){
            this.attack_aux = () => {this.fire()};
            this.dispCont = 0;
        }
        this.cont+=dt;
        this.actDispTime+=dt;
        if(this.cont >= this.shootTime*1000){
            this.cont = 0;
        }
        if(this.actDispTime >= this.dispTime*1000){
            this.attack_aux();
            this.dispCont++;
            this.actDispTime = 0;
        }
        if(this.dispCont >= this.dispMax){
            this.attack_aux = () => {};
        }
    }

    attack_aux(){
        this.fire();
    }

    fire(){
        super.fire();
        this.fireDirection.rotate(Math.PI*2*this.nVueltas/this.dispMax);
    }
     
}