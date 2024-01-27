// UT4 - Animaciones

window.onload = function () {

	const TOPEDERECHA = 473;

	let x = 0;        // posición inicial x de la nave
	let y = 250;      // posición inicial y de la nave
	let canvas;     // variable que referencia al elemento canvas del html
	let ctx;        // contexto de trabajo
	let id1, id2, id3;   // id de la animación
	let canvasTamanoX = 1250, canvasTamanoY = 500;
	let y1, x1, y2 = y, x2 = x, xsup, ysup;
	let misilesNave = [],enemigosHorizontal=[],misilesEnemigos=[],enemigosTorreta=[];
	let xDerecha, xIzquierda, espacio;
	let teclaMisilPresionada = false;
	let enemigoTorretaPRUEBA;
						   // Posición del array 0, 1
	let miNave, motor;
	let imagen, imagenMisil,imagenEnemigoHorizontal;
	let yporcentaje, xporcentaje;
	let xdireccion,ydireccion;

/*	function reproducirAudio(){
		audioTope.currentTime=0;
		audioTope.play();
	}*/

	Object.prototype.calcularAnguloX = function () {
		let angulocalc = 0;
		if (this.angle < 0) {
			angulocalc = 360 + this.angle;
		} else if (this.angle) {
			angulocalc = this.angle;
		}
		if (angulocalc == 0 || angulocalc == 360) {
			xporcentaje=1;
			return 1*xporcentaje;

		
		}else if (angulocalc == 90) {
			xporcentaje=0;
			return 0*xporcentaje;


		} else if (angulocalc == 270) {
			xporcentaje=0;
			return 0*xporcentaje;

		} else if (angulocalc == 180) {
			xporcentaje=1;
			return -1*xporcentaje;

		
		} else if (angulocalc > 0 && angulocalc < 90) {
			yporcentaje = angulocalc / 90;
			xporcentaje = 1 - yporcentaje;
			return 1*xporcentaje;

		} else if (angulocalc > 90 && angulocalc < 180) {
			xporcentaje = (angulocalc - 90) / 90;
			yporcentaje = 1 - xporcentaje;
			return -1*xporcentaje;

		} else if (angulocalc > 180 && angulocalc < 270) {
			yporcentaje = (angulocalc - 180) / 90;
			xporcentaje = 1 - yporcentaje;
			return -1*xporcentaje;

		} else if (angulocalc > 270 && angulocalc < 360) {
			xporcentaje = (angulocalc - 270) / 90;
			yporcentaje = 1 - xporcentaje;
			return 1*xporcentaje;

		}

	}
	Object.prototype.calcularAnguloY = function () {
		let angulocalc = 0;
		if (this.angle < 0) {
			angulocalc = 360 + this.angle;
		} else if (this.angle) {
			angulocalc = this.angle;
		}
		if (angulocalc == 0 || angulocalc == 360) {
			yporcentaje=0;
			return 0*yporcentaje;

		
		}else if (angulocalc == 180) {
			yporcentaje=0;
			return 0*yporcentaje;

		
		} else if (angulocalc == 90) {
			yporcentaje=1;
			return 1*yporcentaje;


		} else if (angulocalc == 270) {
			yporcentaje=1;
			return -1*yporcentaje;

		} else if (angulocalc > 0 && angulocalc < 90) {
			yporcentaje = angulocalc / 90;
			xporcentaje = 1 - yporcentaje;
			return 1*yporcentaje;
		} else if (angulocalc > 90 && angulocalc < 180) {
			xporcentaje = (angulocalc - 90) / 90;
			yporcentaje = 1 - xporcentaje;
			return 1*yporcentaje;
		} else if (angulocalc > 180 && angulocalc < 270) {
			yporcentaje = (angulocalc - 180) / 90;
			xporcentaje = 1 - yporcentaje;
			return -1*yporcentaje;

		} else if (angulocalc > 270 && angulocalc < 360) {
			xporcentaje = (angulocalc - 270) / 90;
			yporcentaje = 1 - xporcentaje;
			return -1*yporcentaje;
		}

	}
	function Nave(x_, y_) {

		this.x = x_;
		this.y = y_;
		this.animacionNave = [[0, 0], [32, 0], [0, 65], [32, 65], [32, 97], [0, 97], [0, 33], [32, 33], [0, 161], [32, 161]]; // Posiciones del sprite donde recortar cada imagen
		this.velocidad = 0.2;
		this.tamañoX = 40;
		this.tamañoY = 40;
		this.coordx = 31;
		this.coordy = 28;
		this.angle = 0;
		this.inerciax = 0;
		this.inerciay = 0;
		this.vida=100;

	}
	Nave.prototype.draw = function (ctx) {
		ctx.save();
		ctx.translate(this.x + this.tamañoX / 2, this.y + this.tamañoY / 2);
		ctx.rotate(this.angle * Math.PI / 180);
		if (espacio) {
			ctx.drawImage(motor.imagen, motor.animacionMotor[motor.posicion][0], motor.animacionMotor[motor.posicion][1], motor.coordx, motor.coordy,
				-(this.tamañoX / 2) - 30, -(this.tamañoY / 2) + 8, motor.tamañoX, motor.tamañoY);
		}

		ctx.drawImage(this.imagen, miNave.animacionNave[0][0], miNave.animacionNave[0][1], this.coordx, this.coordy,
			-this.tamañoX / 2, -this.tamañoY / 2, this.tamañoX, this.tamañoY);
		ctx.restore();
	};

	Nave.prototype.generaPosicion = function () {

		this.inerciax = this.inerciax + (this.velocidad *this.calcularAnguloX());
		this.inerciay = this.inerciay + (this.velocidad *this.calcularAnguloY());
		//console.log(this.angle);

	}
	Nave.prototype.mover = function () {
		this.inerciax = this.inerciax * 0.99;
		this.inerciay = this.inerciay * 0.99;
		this.x = this.inerciax + this.x;
		this.y = this.inerciay + this.y;
		miNave.comprobarPosicion();
	}
	Nave.prototype.comprobarGolpeado=function(){
		let Distancia_entre_A_y_B=0;
		for(let i=0;i<misilesEnemigos.length;i++){
			let Ax=this.x+this.tamañoX/2;
			let Ay=this.y+this.tamañoY/2;

			let Bx=misilesEnemigos[i].x+misilesEnemigos[i].tamañoX/2;
			let By=misilesEnemigos[i].y+misilesEnemigos[i].tamañoY/2;

			let RadioB=misilesEnemigos[i].tamañoX/2;
			let RadioA=this.tamañoX/2;

			Distancia_entre_A_y_B = Math.sqrt( (Bx - (Ax))**2 +(By - (Ay))**2);
			if ( (RadioA + RadioB) > (Distancia_entre_A_y_B)){
				misilesEnemigos.splice(i,1);
				this.vida=this.vida-10;
			};
		}

	}
	Object.prototype.comprobarPosicion = function () {
		if (this.x > canvasTamanoX + this.tamañoX) {
			this.x = 0 - this.tamañoX;
		}
		if (this.y > canvasTamanoY + this.tamañoY) {
			this.y = 0 - this.tamañoY;
		}
		if (this.x < 0 - this.tamañoX) {
			this.x = canvasTamanoX + this.tamañoX;
		}
		if (this.y < 0 - this.tamañoY) {
			this.y = canvasTamanoY + this.tamañoY;
		}
	}
	function MisilNave(angle, x, y) {
		this.angle = angle;
		this.x = x;
		this.y = y;
		this.velocidad = 7;
		this.animacionMisil = [[0, 116]]
		this.velocidadx;
		this.velocidady;
		this.tiempoVida = 0;
		this.tamañoX = 8;
		this.tamañoY = 8;
		this.coordx = 170;
		this.coordy = 172;

	}
	MisilNave.prototype.generaPosicion = function () {
		
			this.velocidadx = (this.velocidad * this.calcularAnguloX())+miNave.inerciax;
			this.velocidady = (this.velocidad * this.calcularAnguloY())+miNave.inerciay;
	}

	MisilNave.prototype.mover = function () {

		this.x = this.velocidadx + this.x;
		this.y = this.velocidady + this.y;
	}

	function Motor(x, y) {

		this.x = x;
		this.y = y;
		this.animacionMotor = [[0, 518],[806,518]]; // Posiciones del sprite donde recortar cada imagen
		this.velocidad = 0.2;
		this.tamañoX = 35;
		this.tamañoY = 25;
		this.coordx = 800;
		this.coordy = 380;
		this.angle = 0;
		this.posicion=0;
		this.tiempo=0;
	}
	function enemigoHorizontal(x,y){
		this.x = x;
		this.y = y;
		this.animacion = [[0, 47],[61,47]]; // Posiciones del sprite donde recortar cada imagen
		this.velocidad = 5;
		this.tamañoX = 35;
		this.tamañoY = 32.5;
		this.coordx = 60;
		this.coordy = 52;
		this.derecha=true;
		this.posicion=0;
		this.tiempoMisil=0;
	}
	enemigoHorizontal.prototype.moverEnemigo=function(){

		if(this.derecha){
			this.x=this.x+this.velocidad;
		}else{
			this.x=this.x-this.velocidad;
		}
	}
	enemigoHorizontal.prototype.comprobarLimites=function(){
		if (this.x > canvasTamanoX - this.tamañoX) {
			this.x = canvasTamanoX - this.tamañoX;
			this.derecha=false;
			this.posicion=1;
		}else if (this.x < 0) {
			this.x = 0;
			this.derecha=true;
			this.posicion=0;
		}

	}
	enemigoHorizontal.prototype.comprobarGolpeado=function(){
		for (let i = 0; i < misilesNave.length; i++) {
			if((this.x+this.tamañoX>misilesNave[i].x)&&(misilesNave[i].x+misilesNave[i].tamañoX>this.x)&&(this.y+this.tamañoY>misilesNave[i].y)&&(misilesNave[i].y+misilesNave[i].tamañoY>this.y)){
				misilesNave.splice(i,1);
				return true;
			}
		}
	}
	enemigoHorizontal.prototype.lanzarMisil=function(){
		this.tiempoMisil++;
		if(this.tiempoMisil==70){
			this.tiempoMisil=0;
			generarMisilEnemigo(this);
		}
	}

	function enemigoTorreta(x,y){
		this.x = x;
		this.y = y;
		this.animacion = [[0, 310]]; // Posiciones del sprite donde recortar cada imagen
		this.velocidad = 5;
		this.tamañoX = 57;
		this.tamañoY = 57;
		this.coordx = 57;
		this.coordy = 57;
		this.posicion=0;
		this.tiempoMisil=0;
		this.angle=90;
		this.vida=4;
	}
	enemigoTorreta.prototype.lanzarMisilGirado=function(){
		this.tiempoMisil++;
		if(this.tiempoMisil>12){
			this.tiempoMisil=0;
	
			misilesEnemigos[misilesEnemigos.length]=new MisilEnemigoGirado(this.angle+Math.random()*10-5,this.x+(this.tamañoX/2)-4,this.y+(this.tamañoY/2)-4);
		}
	}
	enemigoTorreta.prototype.apuntar=function(){

			if(miNave.y-(this.y+this.tamañoY/2)<0&&miNave.x-(this.x+this.tamañoX/2)>0){
				this.angle=calcularGrados(miNave.y-(this.y+this.tamañoY/2),miNave.x-(this.x+this.tamañoX/2));

			}else if(miNave.y-(this.y+this.tamañoY/2)>0&&miNave.x-(this.x+this.tamañoX/2)>0){
				this.angle=calcularGrados(miNave.y-(this.y+this.tamañoY/2),miNave.x-(this.x+this.tamañoX/2));

			}else if(miNave.y-(this.y+this.tamañoY/2)>0&&miNave.x-(this.x+this.tamañoX/2)<0){
				this.angle=calcularGrados(miNave.y-(this.y+this.tamañoY/2),miNave.x-(this.x+this.tamañoX/2))-180;

			}else if(miNave.y-(this.y+this.tamañoY/2)<0&&miNave.x-(this.x+this.tamañoX/2)<0){
				this.angle=calcularGrados(miNave.y-(this.y+this.tamañoY/2),miNave.x-(this.x+this.tamañoX/2))-180;

			}
	}
	enemigoTorreta.prototype.draw = function (ctx) {
		ctx.save();
		ctx.translate(this.x + this.tamañoX / 2, this.y + this.tamañoY / 2);
		ctx.rotate(this.angle * Math.PI / 180);
		ctx.drawImage(this.imagen, this.animacion[0][0], this.animacion[0][1], this.coordx, this.coordy,
			-this.tamañoX / 2, -this.tamañoY / 2, this.tamañoX, this.tamañoY);
		ctx.restore();
	};
	enemigoTorreta.prototype.comprobarGolpeado=function(){
		let Distancia_entre_A_y_B=0;
		for(let i=0;i<misilesNave.length;i++){
			let Ax=this.x+this.tamañoX/2;
			let Ay=this.y+this.tamañoY/2;

			let Bx=misilesNave[i].x+misilesNave[i].tamañoX/2;
			let By=misilesNave[i].y+misilesNave[i].tamañoY/2;

			let RadioB=misilesNave[i].tamañoX/2;
			let RadioA=this.tamañoX/2;

			Distancia_entre_A_y_B = Math.sqrt( (Bx - (Ax))**2 +(By - (Ay))**2);
			if ( (RadioA + RadioB) > (Distancia_entre_A_y_B)){
				this.vida=this.vida-1;
				misilesNave.splice(i,1);
			};
		}
	};

	function MisilEnemigoGirado(angle, x, y) {
		this.angle = angle;
		this.x = x;
		this.y = y;
		this.velocidad = 6;
		this.animacionMisil = [[0, 116]]
		this.velocidadx;
		this.velocidady;
		this.tiempoVida = 0;
		this.tamañoX = 8;
		this.tamañoY = 8;
		this.coordx = 170;
		this.coordy = 172;

	}

	MisilEnemigoGirado.prototype.generaPosicion = function () {
		
			this.velocidadx = (this.velocidad * this.calcularAnguloX());
			this.velocidady = (this.velocidad * this.calcularAnguloY());

	}
	MisilEnemigoGirado.prototype.mover=function(){

		this.x = this.velocidadx + this.x;
		this.y = this.velocidady + this.y;
	}
	function MisilEnemigo(angle, x, y) {
		this.angle = angle;
		this.x = x;
		this.y = y;
		this.velocidad = 4;
		this.animacionMisil = [[0, 116]]
		this.velocidadx;
		this.velocidady;
		this.tiempoVida = 0;
		this.tamañoX = 8;
		this.tamañoY = 8;
		this.coordx = 170;
		this.coordy = 172;

	}
	MisilEnemigo.prototype.generaPosicion=function(){
		this.velocidadx=this.calcularAnguloX()*this.velocidad;
		this.velocidady=this.calcularAnguloY()*this.velocidad;
	}
	MisilEnemigo.prototype.mover=function(){
		this.x=this.velocidadx +this.x;
		this.y=this.velocidady +this.y;	
	}

	function calcularGrados(opuesto,adyacende){
		return Math.atan(opuesto / adyacende)*180/Math.PI;
	}

	function generarMisilEnemigo(enemigo){
        if(ysup-(enemigo.y+enemigo.tamañoY/2)<0&&xsup-(enemigo.x+enemigo.tamañoX/2)>0){
			misilesEnemigos[misilesEnemigos.length]=new MisilEnemigo(calcularGrados(ysup-(enemigo.y+enemigo.tamañoY/2),xsup-(enemigo.x+enemigo.tamañoX/2)),enemigo.x+enemigo.tamañoX/2,enemigo.y+enemigo.tamañoY/2);

		}else if(ysup-(enemigo.y+enemigo.tamañoY/2)>0&&xsup-(enemigo.x+enemigo.tamañoX/2)>0){
				misilesEnemigos[misilesEnemigos.length]=new MisilEnemigo(calcularGrados(ysup-(enemigo.y+enemigo.tamañoY/2),xsup-(enemigo.x+enemigo.tamañoX/2)),enemigo.x+enemigo.tamañoX/2,enemigo.y+enemigo.tamañoY/2);
	
		}else if(ysup-(enemigo.y+enemigo.tamañoY/2)>0&&xsup-(enemigo.x+enemigo.tamañoX/2)<0){
			misilesEnemigos[misilesEnemigos.length]=new MisilEnemigo(calcularGrados(ysup-(enemigo.y+enemigo.tamañoY/2),xsup-(enemigo.x+enemigo.tamañoX/2))-180,enemigo.x+enemigo.tamañoX/2,enemigo.y+enemigo.tamañoY/2);
		}else if(ysup-(enemigo.y+enemigo.tamañoY/2)<0&&xsup-(enemigo.x+enemigo.tamañoX/2)<0){
			misilesEnemigos[misilesEnemigos.length]=new MisilEnemigo(calcularGrados(ysup-(enemigo.y+enemigo.tamañoY/2),xsup-(enemigo.x+enemigo.tamañoX/2))-180,enemigo.x+enemigo.tamañoX/2,enemigo.y+enemigo.tamañoY/2);
		}

	}

	function generarEnemigoHorizontal(){
		enemigosHorizontal[enemigosHorizontal.length]= new enemigoHorizontal(x,y*Math.random()*2);
	}

	function imprimirMisilesEnemigos(){
		for (let i = 0; i < misilesEnemigos.length; i++) {
			misilesEnemigos[i].tiempoVida++;
			if (misilesEnemigos[i].tiempoVida > 220) {
				misilesEnemigos.splice(i, 1);
			}
			if (misilesEnemigos[i]) {
				misilesEnemigos[i].generaPosicion();
				misilesEnemigos[i].mover();
				ctx.drawImage(misilesEnemigos[i].imagen,
					misilesEnemigos[i].animacionMisil[0][0],misilesEnemigos[i].animacionMisil[0][1],
					misilesEnemigos[i].coordx, misilesEnemigos[i].coordy,
					misilesEnemigos[i].x,misilesEnemigos[i].y,
					misilesEnemigos[i].tamañoX, misilesEnemigos[i].tamañoY);
			}

		}
	}
	function imprimirEnemigosHorizontal(){
		for (let i = 0; i < enemigosHorizontal.length; i++) {
			if(enemigosHorizontal[i].comprobarGolpeado()){
				enemigosHorizontal.splice(i,1);
			}
			if (enemigosHorizontal[i]) {
				enemigosHorizontal[i].moverEnemigo();
				enemigosHorizontal[i].comprobarLimites();
				
				enemigosHorizontal[i].lanzarMisil();

				ctx.drawImage(enemigosHorizontal[i].imagen,
					enemigosHorizontal[i].animacion[enemigosHorizontal[i].posicion][0], enemigosHorizontal[i].animacion[enemigosHorizontal[i].posicion][1],
					enemigosHorizontal[i].coordx, enemigosHorizontal[i].coordy,
					enemigosHorizontal[i].x,enemigosHorizontal[i].y,
					enemigosHorizontal[i].tamañoX, enemigosHorizontal[i].tamañoY);

			}

		}
	}
	function imprimirEnemigosTorreta(){
		for (let i = 0; i < enemigosTorreta.length; i++) {
			enemigosTorreta[i].comprobarGolpeado();
			if(enemigosTorreta[i].vida<=0){
				enemigosTorreta.splice(i,1);
			}
			if (enemigosTorreta[i]) {
				enemigosTorreta[i].apuntar();
				enemigosTorreta[i].lanzarMisilGirado();
				enemigosTorreta[i].draw(ctx);

			}

		}
	}
	function imprimirMisiles(){
		for (let i = 0; i < misilesNave.length; i++) {
			misilesNave[i].comprobarPosicion();
			misilesNave[i].tiempoVida++;
			if (misilesNave[i].tiempoVida > 50) {
				misilesNave.splice(i, 1);
			}
			if (misilesNave[i]) {
				misilesNave[i].generaPosicion();
				misilesNave[i].mover();
				ctx.drawImage(misilesNave[i].imagen,
					misilesNave[i].animacionMisil[0][0], misilesNave[i].animacionMisil[0][1],
					misilesNave[i].coordx, misilesNave[i].coordy,
					misilesNave[i].x, misilesNave[i].y,
					misilesNave[i].tamañoX, misilesNave[i].tamañoY);
			}

		}
	}

	function pintaRectangulo() {

		// borramos el canvas
		ctx.clearRect(0, 0, canvasTamanoX, canvasTamanoY);
		if (xDerecha) {

			miNave.angle = (miNave.angle + 5) % 360;

		} else if (xIzquierda) {

			miNave.angle = (miNave.angle - 5) % 360;

		}

		if (espacio) {

			miNave.generaPosicion();

		}
		miNave.mover();
		miNave.comprobarGolpeado();
		imprimirEnemigosTorreta();
		imprimirMisiles();
		imprimirEnemigosHorizontal();
		imprimirMisilesEnemigos();


		miNave.draw(ctx);
	}

	function abreCierraBoca() {
		posicion = 0;
		//posicion = (posicion + 1) % 2;  // Cargará posiciones 0 y 1 del array

	}
	function predecirPosicion() {
		x1 = x2;
		y1 = y2;
		x2 = miNave.x + miNave.tamañoX / 2;
		y2 = miNave.y + miNave.tamañoY / 2;
		xsup = x2 + (x2 - x1);
		ysup = y2 + (y2 - y1);

	}
	function generarMisil(){
		if(!teclaMisilPresionada){
		teclaMisilPresionada = true;
		misilesNave[misilesNave.length] = new MisilNave(miNave.angle, (miNave.x + miNave.tamañoX / 2) - 4, (miNave.y + miNave.tamañoY / 2) - 4);

	}
	}

	function activaMovimiento(evt) {

		switch (evt.keyCode) {


			// Right arrow.
			case 39:

				xDerecha = true;
				break;

			case 37:

				xIzquierda = true;
				break;
			case 32:

				espacio = true;
				break;
			case 68:
					generarMisil();

				break;

		}

	}

	function desactivaMovimiento(evt) {

		switch (evt.keyCode) {


			// Right arrow 
			case 39:

				xDerecha = false;
				break;

			case 37:

				xIzquierda = false;
				break;
			case 32:

				espacio = false;
				break;
			case 68:

				teclaMisilPresionada = false;
				break;

		}

	}

	document.addEventListener("keydown", activaMovimiento, false);
	document.addEventListener("keyup", desactivaMovimiento, false);

	// localizamos el canvas
	canvas = document.getElementById("miCanvas");

	// Generamos el contexto de trabajo
	ctx = canvas.getContext("2d");

	function iniciarPartida() {
		misilesNave = [];
		enemigosHorizontal=[];
		misilesEnemigos=[];
		enemigosTorreta=[];
		xDerecha=false;
		xIzquierda=false;
		espacio=false;
		y = 250;
		x = 0;
		y2 = y;
		x2 = x;
		teclaMisilPresionada = false;
		imagen = new Image();
		imagen.src = "navePrueba.png";
		Nave.prototype.imagen = imagen;
		Motor.prototype.imagen = imagen;
		MisilNave.prototype.imagen = imagen;
		MisilEnemigo.prototype.imagen = imagen;
		MisilEnemigoGirado.prototype.imagen = imagen;
		enemigoHorizontal.prototype.imagen=imagen;
		enemigoTorreta.prototype.imagen=imagen;
		miNave = new Nave(x, y);
		motor = new Motor(x, y);
		enemigosTorreta[0]= new enemigoTorreta(255,y);
		generarEnemigoHorizontal();
		generarEnemigoHorizontal();
		generarEnemigoHorizontal();
		// Lanzamos la animación
		id1 = setInterval(pintaRectangulo, 1000 / 50);

		// Animación encargada de cambiar los motores
		id2 = setInterval(abreCierraBoca, 1000 / 8);
		id3 = setInterval(predecirPosicion, 1000 / 3);
	}
	iniciarPartida();
}