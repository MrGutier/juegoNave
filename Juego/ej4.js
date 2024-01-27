// UT4 - Animaciones

window.onload = function () {
	let canvasTamanoX = 1250, canvasTamanoY = 650;
	let x = canvasTamanoX / 2;        // posición inicial x de la nave
	let y = canvasTamanoY / 2;      // posición inicial y de la nave
	let canvas;     // variable que referencia al elemento canvas del html
	let ctx;        // contexto de trabajo
	let id1, id2, id3, id4,intervalNivel;   // id de la animación
	let ycarga = canvasTamanoY;
	let miStorage = window.localStorage;
	let nombreUsuaio = document.getElementById("nombre");
	let y1, x1, y2 = y, x2 = x, xsup, ysup;
	let misilesNave = [], enemigosHorizontal = [], misilesEnemigos = [], enemigosTorreta = [], enemigosBoss = [], explosiones = [];
	let xDerecha, xIzquierda, espacio;
	let teclaMisilPresionada = false;
	let kaboom = false, iniciar = false, parado=false;
	let rozamiento = true;
	let miNave, motor, miNivel;
	let imagen,imagenGameOver;
	let vida = document.getElementById("vida");
	let botonIniciar = document.getElementById("iniciar");
	let botonParar = document.getElementById("parar");
	let botonContinuar = document.getElementById("continuar");
	let botonDefault = document.getElementById("Default");
	let botonAmetralladora = document.getElementById("Ametralladora");
	let botonFrancotirador = document.getElementById("Francotirador");
	let listaPuntuacion= document.getElementById("listaPuntuacion");
	let arma = "Ametralladora";
	let audioBoom = document.getElementById("audioBoom");
	let audioBoomBoss = document.getElementById("audioBoomBoss");
	let audioBarrage = document.getElementById("audioBarrage");
	let audioAmetralladora = document.getElementById("audioAmetralladora");
	let puntuacionVisual= document.getElementById("puntuacion");
	let puntuacion=0;
	botonAmetralladora.disabled = true;
	botonFrancotirador.disabled = true;
	botonContinuar.disabled=true;
	botonParar.disabled=true;
	audioAmetralladora.volume = 0.2;
	audioBarrage.volume = 0.05;
	/*	function reproducirAudio(){
			audioTope.currentTime=0;
			audioTope.play();
		}*/
	function reproducirAudioAmetralladora() {
		audioAmetralladora.currentTime = 0;
		audioAmetralladora.play();
	}
	function reproducirAudioBarrage() {
		audioBarrage.currentTime = 0;
		audioBarrage.play();
	}
	function reproducirAudioBoom() {
		audioBoom.currentTime = 0;
		audioBoom.cloneNode().play();
		audioBoom.play();
	}
	function reproducirAudioBoomBoss() {
		audioBoomBoss.currentTime = 0;
		audioBoomBoss.cloneNode().play();
		audioBoomBoss.play();
	}
	//funcion que calcula la inclinación en x
	Object.prototype.calcularAnguloX = function () {
		let angulocalc = 0;
		let yporcentaje, xporcentaje;
		if (this.angle < 0) {
			angulocalc = 360 + this.angle;
		} else if (this.angle) {
			angulocalc = this.angle;
		}
		if (angulocalc == 0 || angulocalc == 360) {
			xporcentaje = 1;
			return 1 * xporcentaje;


		} else if (angulocalc == 90) {
			xporcentaje = 0;
			return 0 * xporcentaje;


		} else if (angulocalc == 270) {
			xporcentaje = 0;
			return 0 * xporcentaje;

		} else if (angulocalc == 180) {
			xporcentaje = 1;
			return -1 * xporcentaje;


		} else if (angulocalc > 0 && angulocalc < 90) {
			yporcentaje = angulocalc / 90;
			xporcentaje = 1 - yporcentaje;
			return 1 * xporcentaje;

		} else if (angulocalc > 90 && angulocalc < 180) {
			xporcentaje = (angulocalc - 90) / 90;
			yporcentaje = 1 - xporcentaje;
			return -1 * xporcentaje;

		} else if (angulocalc > 180 && angulocalc < 270) {
			yporcentaje = (angulocalc - 180) / 90;
			xporcentaje = 1 - yporcentaje;
			return -1 * xporcentaje;

		} else if (angulocalc > 270 && angulocalc < 360) {
			xporcentaje = (angulocalc - 270) / 90;
			yporcentaje = 1 - xporcentaje;
			return 1 * xporcentaje;

		}

	}
	//funcion que calcula la inclinación en y
	Object.prototype.calcularAnguloY = function () {
		let angulocalc = 0;
		let yporcentaje, xporcentaje;
		if (this.angle < 0) {
			angulocalc = 360 + this.angle;
		} else if (this.angle) {
			angulocalc = this.angle;
		}
		if (angulocalc == 0 || angulocalc == 360) {
			yporcentaje = 0;
			return 0 * yporcentaje;


		} else if (angulocalc == 180) {
			yporcentaje = 0;
			return 0 * yporcentaje;


		} else if (angulocalc == 90) {
			yporcentaje = 1;
			return 1 * yporcentaje;


		} else if (angulocalc == 270) {
			yporcentaje = 1;
			return -1 * yporcentaje;

		} else if (angulocalc > 0 && angulocalc < 90) {
			yporcentaje = angulocalc / 90;
			xporcentaje = 1 - yporcentaje;
			return 1 * yporcentaje;
		} else if (angulocalc > 90 && angulocalc < 180) {
			xporcentaje = (angulocalc - 90) / 90;
			yporcentaje = 1 - xporcentaje;
			return 1 * yporcentaje;
		} else if (angulocalc > 180 && angulocalc < 270) {
			yporcentaje = (angulocalc - 180) / 90;
			xporcentaje = 1 - yporcentaje;
			return -1 * yporcentaje;

		} else if (angulocalc > 270 && angulocalc < 360) {
			xporcentaje = (angulocalc - 270) / 90;
			yporcentaje = 1 - xporcentaje;
			return -1 * yporcentaje;
		}

	}
	function Nave(x_, y_) {

		this.x = x_;
		this.y = y_;

		this.velocidad = 0.2;
		this.velocidadmax = 20;
		this.tamañoX = 40;
		this.tamañoY = 40;
		this.coordx = 31;
		this.coordy = 28;
		this.angle = 0;
		this.inerciax = 0;
		this.inerciay = 0;
		this.vida = 100;
		this.tiempoDisparo = 0;
		this.rozamiento = 1;

	}
	Nave.prototype.animacionNave = [[0, 0]];
	//rota e imprime la nave con sus motores
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
		this.inerciax = this.inerciax + (this.velocidad * this.calcularAnguloX());
		this.inerciay = this.inerciay + (this.velocidad * this.calcularAnguloY());
	}
	Nave.prototype.mover = function () {
		if (rozamiento) {
			this.rozamiento = 0.99;
		} else {
			this.rozamiento = 1;
		}
		if (Math.abs(this.inerciax) + Math.abs(this.inerciay) >= Math.abs(this.velocidadmax * this.calcularAnguloX()) + Math.abs(this.velocidadmax * this.calcularAnguloY())) {
			this.rozamiento = 0.99;

		}
		this.inerciax = this.inerciax * this.rozamiento;
		this.inerciay = this.inerciay * this.rozamiento;
		this.x = this.inerciax + this.x;
		this.y = this.inerciay + this.y;
		miNave.comprobarPosicion();
	}
	Nave.prototype.comprobarGolpeado = function () {
		let Distancia_entre_A_y_B = 0;
		for (let i = 0; i < misilesEnemigos.length; i++) {
			let Ax = this.x + this.tamañoX / 2;
			let Ay = this.y + this.tamañoY / 2;

			let Bx = misilesEnemigos[i].x + misilesEnemigos[i].tamañoX / 2;
			let By = misilesEnemigos[i].y + misilesEnemigos[i].tamañoY / 2;

			let RadioB = misilesEnemigos[i].tamañoX / 2;
			let RadioA = this.tamañoX / 2;

			Distancia_entre_A_y_B = Math.sqrt((Bx - (Ax)) ** 2 + (By - (Ay)) ** 2);
			if ((RadioA + RadioB) > (Distancia_entre_A_y_B)) {
				misilesEnemigos.splice(i, 1);
				this.vida = this.vida - 10;

			};
		}

	}
	//transporta la nave al lado opuesto del canvas cuando se sale
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
	function MisilNave(angle, x, y, tiempoVida) {
		this.angle = angle;
		this.x = x;
		this.y = y;
		this.velocidad = 7;
		this.velocidadx;
		this.velocidady;
		this.tiempoVida = 0;
		this.tiempoVidaMax = tiempoVida;
		this.nuevaVelocidadx = 0;
		this.nuevaVelocidady = 0;
		this.tamañoX = 8;
		this.tamañoY = 8;
		this.coordx = 170;
		this.coordy = 172;

	}
	MisilNave.prototype.animacionMisil = [[220, 154]]
	MisilNave.prototype.generaPosicion = function () {
		if (this.tiempoVida <= 30) {
			this.nuevaVelocidadx = ((this.velocidad) * this.calcularAnguloX() + miNave.inerciax);
			this.nuevaVelocidady = ((this.velocidad) * this.calcularAnguloY() + miNave.inerciay);
		}

		if (!this.velocidadx) {
			this.velocidadx = this.nuevaVelocidadx;
			this.velocidady = this.nuevaVelocidady;
		} else if ((this.velocidadx + this.velocidady < this.nuevaVelocidadx + this.nuevaVelocidady)) {
			this.velocidadx = this.nuevaVelocidadx;
			this.velocidady = this.nuevaVelocidady;
		}

	}

	MisilNave.prototype.mover = function () {

		this.x = this.velocidadx + this.x;
		this.y = this.velocidady + this.y;
	}

	function Motor(x, y) {

		this.x = x;
		this.y = y;
		this.animacionMotor = [[0, 518], [806, 518]]; // Posiciones del sprite donde recortar cada imagen
		this.velocidad = 0.2;
		this.tamañoX = 35;
		this.tamañoY = 25;
		this.coordx = 800;
		this.coordy = 380;
		this.angle = 0;
		this.posicion = 0;
		this.tiempo = 0;
	}
	function enemigoHorizontal(x, y) {
		this.x = x;
		this.y = y;
		this.velocidad = 3;
		this.tamañoX = 35;
		this.tamañoY = 32.5;
		this.coordx = 60;
		this.coordy = 52;
		this.derecha = true;
		this.posicion = 0;
		this.tiempoMisil = 0; //tiempo desde que se lanzó el ultimo misil
	}
	enemigoHorizontal.prototype.animacion = [[0, 47], [61, 47]]; // Posiciones del sprite donde recortar cada imagen
	enemigoHorizontal.prototype.moverEnemigo = function () {

		if (this.derecha) {
			this.x = this.x + this.velocidad;
		} else {
			this.x = this.x - this.velocidad;
		}
	}
	enemigoHorizontal.prototype.comprobarLimites = function () {
		if (this.x > canvasTamanoX - this.tamañoX) {
			this.x = canvasTamanoX - this.tamañoX;
			this.derecha = false;
			this.posicion = 1;
		} else if (this.x < 0) {
			this.x = 0;
			this.derecha = true;
			this.posicion = 0;
		}

	}
	enemigoHorizontal.prototype.comprobarGolpeado = function () {
		for (let i = 0; i < misilesNave.length; i++) {
			if ((this.x + this.tamañoX > misilesNave[i].x) && (misilesNave[i].x + misilesNave[i].tamañoX > this.x) && (this.y + this.tamañoY > misilesNave[i].y) && (misilesNave[i].y + misilesNave[i].tamañoY > this.y)) {
				misilesNave.splice(i, 1);
				return true;
			}
		}
	}
	enemigoHorizontal.prototype.lanzarMisil = function () {
		this.tiempoMisil++;
		if (this.tiempoMisil == 70) {
			this.tiempoMisil = 0;
			generarMisilEnemigo(this);
		}
	}

	function enemigoTorreta(x, y) {
		this.x = x;
		this.y = y;
		this.velocidad = 5;
		this.tamañoX = 57;
		this.tamañoY = 57;
		this.coordx = 57;
		this.coordy = 57;
		this.posicion = 0;
		this.tiempoMisil = 0;
		this.angle = 90;
		this.vida = 6;
	}
	enemigoTorreta.prototype.animacion = [[0, 310]];
	enemigoTorreta.prototype.lanzarMisilGirado = function () {
		this.tiempoMisil++;
		if (this.tiempoMisil > 12) {
			this.tiempoMisil = 0;

			misilesEnemigos[misilesEnemigos.length] = new MisilEnemigoGirado(this.angle + Math.random() * 10 - 5, this.x + (this.tamañoX / 2) - 4, this.y + (this.tamañoY / 2) - 4);
		}
	}
	enemigoTorreta.prototype.apuntar = function () {

		if (miNave.y - (this.y + this.tamañoY / 2) < 0 && miNave.x - (this.x + this.tamañoX / 2) > 0) {
			this.angle = calcularGrados(miNave.y - (this.y + this.tamañoY / 2), miNave.x - (this.x + this.tamañoX / 2));

		} else if (miNave.y - (this.y + this.tamañoY / 2) > 0 && miNave.x - (this.x + this.tamañoX / 2) > 0) {
			this.angle = calcularGrados(miNave.y - (this.y + this.tamañoY / 2), miNave.x - (this.x + this.tamañoX / 2));

		} else if (miNave.y - (this.y + this.tamañoY / 2) > 0 && miNave.x - (this.x + this.tamañoX / 2) < 0) {
			this.angle = calcularGrados(miNave.y - (this.y + this.tamañoY / 2), miNave.x - (this.x + this.tamañoX / 2)) - 180;

		} else if (miNave.y - (this.y + this.tamañoY / 2) < 0 && miNave.x - (this.x + this.tamañoX / 2) < 0) {
			this.angle = calcularGrados(miNave.y - (this.y + this.tamañoY / 2), miNave.x - (this.x + this.tamañoX / 2)) - 180;

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
	enemigoTorreta.prototype.comprobarGolpeado = function () {
		let Distancia_entre_A_y_B = 0;
		for (let i = 0; i < misilesNave.length; i++) {
			let Ax = this.x + this.tamañoX / 2;
			let Ay = this.y + this.tamañoY / 2;

			let Bx = misilesNave[i].x + misilesNave[i].tamañoX / 2;
			let By = misilesNave[i].y + misilesNave[i].tamañoY / 2;

			let RadioB = misilesNave[i].tamañoX / 2;
			let RadioA = this.tamañoX / 2;

			Distancia_entre_A_y_B = Math.sqrt((Bx - (Ax)) ** 2 + (By - (Ay)) ** 2);
			if ((RadioA + RadioB) > (Distancia_entre_A_y_B)) {
				this.vida = this.vida - 1;
				misilesNave.splice(i, 1);
			};
		}
	};
	function enemigoBoss1(x, y) {
		this.x = x;
		this.y = y;
		this.animacion = [[228, 0]]; // Posiciones del sprite donde recortar cada imagen
		this.velocidad = 0.5;
		this.tamañoX = 180 * 2.117;
		this.tamañoY = 180;
		this.coordx = 290;
		this.coordy = 136;
		this.vida = 66;
		this.tiempoMisil = 0;
		this.ojoDisparador = 1;
	}
	enemigoBoss1.prototype.draw = function () {
		this.mover();
		ctx.drawImage(this.imagen, this.animacion[0][0], this.animacion[0][1], this.coordx, this.coordy,
			this.x, this.y, this.tamañoX, this.tamañoY);
	}
	enemigoBoss1.prototype.comprobarGolpeado = function () {
		for (let i = 0; i < misilesNave.length; i++) {
			if ((this.x + this.tamañoX > misilesNave[i].x) && (misilesNave[i].x + misilesNave[i].tamañoX > this.x + 25) && (this.y + this.tamañoY - 25 > misilesNave[i].y) && (misilesNave[i].y + misilesNave[i].tamañoY > this.y + 25)) {
				misilesNave.splice(i, 1);
				this.vida--;
				return true;
			}
		}
	}
	enemigoBoss1.prototype.mover = function () {
		if (this.x < ((canvasTamanoX / 2) - (this.tamañoX / 2))) {
			this.x = this.x + this.velocidad;
		}
	}
	enemigoBoss1.prototype.barrage = function () {

		if (this.tiempoMisil == 100) {
			reproducirAudioBarrage();
			this.tiempoMisil = 0;
			for (let i = 5; i <= this.tamañoX; i = i + 5) {
				generarMisilBoss(this.x + i, this.y + this.tamañoY / 2);
			}
		}

		this.tiempoMisil++;
	}
	enemigoBoss1.prototype.ametralladora = function () {
		if (this.tiempoMisil % 10 == 1) {
			if (this.ojoDisparador == 1) {
				this.ojoDisparador = 2;
				generarMisilBoss(this.x + this.tamañoX - 84, this.y + this.tamañoY - 75);
			} else {
				this.ojoDisparador = 1;
				generarMisilBoss(this.x + this.tamañoX - 84, this.y + this.tamañoY - 120);
			}

		}
	}
	function generarMisilBoss(x, y) {
		if (ysup - y < 0 && xsup - x > 0) {
			misilesEnemigos[misilesEnemigos.length] = new MisilEnemigo(calcularGrados(ysup - (y), xsup - x), x, y);

		} else if (ysup - y > 0 && xsup - x > 0) {
			misilesEnemigos[misilesEnemigos.length] = new MisilEnemigo(calcularGrados(ysup - (y), xsup - x), x, y);

		} else if (ysup - y > 0 && xsup - x < 0) {
			misilesEnemigos[misilesEnemigos.length] = new MisilEnemigo(calcularGrados(ysup - (y), xsup - x) - 180, x, y);
		} else if (ysup - y < 0 && xsup - x < 0) {
			misilesEnemigos[misilesEnemigos.length] = new MisilEnemigo(calcularGrados(ysup - y, xsup - x) - 180, x, y);
		}

	}
	function MisilEnemigoGirado(angle, x, y) {
		this.angle = angle;
		this.x = x;
		this.y = y;
		this.velocidad = 6;
		this.velocidadx = (this.velocidad * this.calcularAnguloX());
		this.velocidady = (this.velocidad * this.calcularAnguloY());
		this.tiempoVida = 0;
		this.tamañoX = 8;
		this.tamañoY = 8;
		this.coordx = 170;
		this.coordy = 172;

	}
	MisilEnemigoGirado.prototype.animacionMisil = [[0, 116]]
	MisilEnemigoGirado.prototype.mover = function () {

		this.x = this.velocidadx + this.x;
		this.y = this.velocidady + this.y;
	}
	function MisilEnemigo(angle, x, y) {
		this.angle = angle;
		this.x = x;
		this.y = y;
		this.velocidad = 4;
		this.velocidadx = this.calcularAnguloX() * this.velocidad;
		this.velocidady = this.calcularAnguloY() * this.velocidad;
		this.tiempoVida = 0;
		this.tamañoX = 8;
		this.tamañoY = 8;
		this.coordx = 170;
		this.coordy = 172;

	}
	MisilEnemigo.prototype.animacionMisil = [[0, 116]]
	MisilEnemigo.prototype.mover = function () {
		this.x = this.velocidadx + this.x;
		this.y = this.velocidady + this.y;
	}
	function explosion(x, y, tamaño) {
		this.x = x;
		this.y = y;

		this.tamañoX = tamaño;
		this.tamañoY = tamaño;
		this.coordx = 127;
		this.coordy = 127;
		this.animacionPosicion = 0;
	}
	explosion.prototype.animacion = [
		[868, 27], [995, 27], [1122, 27], [1249, 27], [1376, 27],
		[868, 154], [995, 154], [1122, 154], [1249, 154], [1376, 154],
		[868, 281], [995, 281], [1122, 281], [1249, 281], [1376, 281],
		[868, 408], [995, 408], [1122, 408]]
	function generarExplosion(obj) {
		reproducirAudioBoom();
		explosiones[explosiones.length] = new explosion(obj.x, obj.y, obj.tamañoX);
	}
	function generarExplosionBoss(obj) {
		reproducirAudioBoomBoss();
		for (let i = 0; i < 40; i++) {
			explosiones[explosiones.length] = new explosion(obj.x + Math.random() * obj.tamañoX - 35, obj.y + Math.random() * obj.tamañoY - 35, 70);
		}
	}
	function imprimirExplosiones() {
		for (let i = 0; i < explosiones.length; i++) {

			explosiones[i].animacionPosicion = explosiones[i].animacionPosicion + 1;

			if (explosiones[i].animacionPosicion > explosiones[i].animacion.length - 1) {
				explosiones.splice(i, 1);
			} else {
				ctx.drawImage(explosiones[i].imagen,
					explosiones[i].animacion[+explosiones[i].animacionPosicion][0], explosiones[i].animacion[+explosiones[i].animacionPosicion][1],
					explosiones[i].coordx, explosiones[i].coordy,
					explosiones[i].x, explosiones[i].y,
					explosiones[i].tamañoX, explosiones[i].tamañoY);
			}
		}
	}

	function calcularGrados(opuesto, adyacende) {
		return Math.atan(opuesto / adyacende) * (180 / Math.PI);
	}

	function generarMisilEnemigo(enemigo) {
		if (ysup - (enemigo.y + enemigo.tamañoY / 2) < 0 && xsup - (enemigo.x + enemigo.tamañoX / 2) > 0) {
			misilesEnemigos[misilesEnemigos.length] = new MisilEnemigo(calcularGrados(ysup - (enemigo.y + enemigo.tamañoY / 2), xsup - (enemigo.x + enemigo.tamañoX / 2)), enemigo.x + enemigo.tamañoX / 2, enemigo.y + enemigo.tamañoY / 2);

		} else if (ysup - (enemigo.y + enemigo.tamañoY / 2) > 0 && xsup - (enemigo.x + enemigo.tamañoX / 2) > 0) {
			misilesEnemigos[misilesEnemigos.length] = new MisilEnemigo(calcularGrados(ysup - (enemigo.y + enemigo.tamañoY / 2), xsup - (enemigo.x + enemigo.tamañoX / 2)), enemigo.x + enemigo.tamañoX / 2, enemigo.y + enemigo.tamañoY / 2);

		} else if (ysup - (enemigo.y + enemigo.tamañoY / 2) > 0 && xsup - (enemigo.x + enemigo.tamañoX / 2) < 0) {
			misilesEnemigos[misilesEnemigos.length] = new MisilEnemigo(calcularGrados(ysup - (enemigo.y + enemigo.tamañoY / 2), xsup - (enemigo.x + enemigo.tamañoX / 2)) - 180, enemigo.x + enemigo.tamañoX / 2, enemigo.y + enemigo.tamañoY / 2);
		} else if (ysup - (enemigo.y + enemigo.tamañoY / 2) < 0 && xsup - (enemigo.x + enemigo.tamañoX / 2) < 0) {
			misilesEnemigos[misilesEnemigos.length] = new MisilEnemigo(calcularGrados(ysup - (enemigo.y + enemigo.tamañoY / 2), xsup - (enemigo.x + enemigo.tamañoX / 2)) - 180, enemigo.x + enemigo.tamañoX / 2, enemigo.y + enemigo.tamañoY / 2);
		}

	}

	function generarEnemigoHorizontal() {
		let x = Math.random() * canvasTamanoX;
		let y = Math.random() * canvasTamanoY;

		if (x > canvasTamanoX - 57) {
			x = 57;
		} else if (x < 0) {
			x = 0;
		}

		if (y > canvasTamanoY - 57) {
			y = 0 + 57;
		} else if (y < 0) {
			y = 0;
		}

		enemigosHorizontal[enemigosHorizontal.length] = new enemigoHorizontal(x, y);
	}
	function generarEnemigoTorreta() {
		let x = Math.random() * canvasTamanoX;
		let y = Math.random() * canvasTamanoY;

		if (x > canvasTamanoX - 57) {
			x = 57;
		} else if (x < 0) {
			x = 0;
		}

		if (y > canvasTamanoY - 57) {
			y = 0 + 57;
		} else if (y < 0) {
			y = 0;
		}

		enemigosTorreta[enemigosTorreta.length] = new enemigoTorreta(x, y);
	}
	function generarEnemigoBoss() {

		let y = Math.random() * canvasTamanoY;

		if (y > canvasTamanoY - 57) {
			y = 0 + 57;
		} else if (y < 0) {
			y = 0;
		}

		enemigosBoss[enemigosBoss.length] = new enemigoBoss1(-180 * 2.117, y);
	}
	function imprimirMisilesEnemigos() {
		for (let i = 0; i < misilesEnemigos.length; i++) {
			misilesEnemigos[i].tiempoVida++;
			if (misilesEnemigos[i].tiempoVida > 220) {
				misilesEnemigos.splice(i, 1);
			}
			if (misilesEnemigos[i]) {
				misilesEnemigos[i].mover();
				ctx.drawImage(misilesEnemigos[i].imagen,
					misilesEnemigos[i].animacionMisil[0][0], misilesEnemigos[i].animacionMisil[0][1],
					misilesEnemigos[i].coordx, misilesEnemigos[i].coordy,
					misilesEnemigos[i].x, misilesEnemigos[i].y,
					misilesEnemigos[i].tamañoX, misilesEnemigos[i].tamañoY);
			}

		}
	}
	function imprimirEnemigosHorizontal() {
		for (let i = 0; i < enemigosHorizontal.length; i++) {
			if (enemigosHorizontal[i].comprobarGolpeado() || kaboom) {
				generarExplosion(enemigosHorizontal[i]);
				enemigosHorizontal.splice(i, 1);
				puntuacion+=100;
				puntuacionVisual.innerHTML="Puntuación= "+puntuacion;
			}
			if (enemigosHorizontal[i]) {
				enemigosHorizontal[i].moverEnemigo();
				enemigosHorizontal[i].comprobarLimites();

				enemigosHorizontal[i].lanzarMisil();

				ctx.drawImage(enemigosHorizontal[i].imagen,
					enemigosHorizontal[i].animacion[enemigosHorizontal[i].posicion][0], enemigosHorizontal[i].animacion[enemigosHorizontal[i].posicion][1],
					enemigosHorizontal[i].coordx, enemigosHorizontal[i].coordy,
					enemigosHorizontal[i].x, enemigosHorizontal[i].y,
					enemigosHorizontal[i].tamañoX, enemigosHorizontal[i].tamañoY);

			}

		}
	}
	function imprimirEnemigosTorreta() {
		for (let i = 0; i < enemigosTorreta.length; i++) {
			enemigosTorreta[i].comprobarGolpeado();
			if (enemigosTorreta[i].vida <= 0 || kaboom) {
				generarExplosion(enemigosTorreta[i]);
				if(	botonFrancotirador.disabled ){
					botonFrancotirador.disabled = false;
				}
				enemigosTorreta.splice(i, 1);
				puntuacion+=350;
				puntuacionVisual.innerHTML="Puntuación= "+puntuacion;
			}
			if (enemigosTorreta[i]) {
				enemigosTorreta[i].apuntar();
				enemigosTorreta[i].lanzarMisilGirado();
				enemigosTorreta[i].draw(ctx);

			}

		}
	}
	function imprimirEnemigosBoss() {
		for (let i = 0; i < enemigosBoss.length; i++) {
			enemigosBoss[i].comprobarGolpeado();
			if (enemigosBoss[i].vida <= 0 || kaboom) {
				generarExplosionBoss(enemigosBoss[i]);
				if(	botonAmetralladora.disabled){
					botonAmetralladora.disabled=false;
				}
				enemigosBoss.splice(i, 1);
				puntuacion += 3000;
				puntuacionVisual.innerHTML="Puntuación= "+puntuacion;
			}
			if (enemigosBoss[i]) {
				enemigosBoss[i].ametralladora();
				enemigosBoss[i].barrage();
				enemigosBoss[i].draw();
			}

		}
	}
	function imprimirMisiles() {
		for (let i = 0; i < misilesNave.length; i++) {
			misilesNave[i].comprobarPosicion();
			misilesNave[i].tiempoVida++;
			if (misilesNave[i].tiempoVida > misilesNave[i].tiempoVidaMax) {
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

		if (arma == "Ametralladora") {
			generarMisil();
		}
		ctx.font = "14px Georgia";
		ctx.fillStyle = "#FFFFFF";
		ctx.fillText("Dificultad: "+miNivel.dificultad, canvasTamanoX -100,canvasTamanoY-20);
		imprimirEnemigosBoss();
		imprimirEnemigosTorreta();
		imprimirMisiles();
		imprimirEnemigosHorizontal();
		imprimirMisilesEnemigos();
		imprimirExplosiones();

		miNave.draw(ctx);
		if(miNave.vida<0){
			terminarPartida();
		}
	}
	function pintaPantallaCarga() {
		ctx.font = "60px Georgia";
		ctx.clearRect(0, 0, canvasTamanoX, canvasTamanoY);
		ctx.fillStyle = "#B7B7B7";
		if (iniciar) {
			ycarga = ycarga - 13;
			if (ycarga <= -canvasTamanoY / 2) {
				clearInterval(id1);

				clearInterval(id3);
				clearInterval(id4);
				iniciarPartida();
			}

		}
		ctx.fillRect(0, 0, canvasTamanoX, ycarga);
		ctx.fillStyle = "#FFFFFF";
		ctx.fillText("Pulsa Iniciar para empezar", canvasTamanoX / 2 - 350, ycarga - canvasTamanoY / 2);

	}
	function terminarPartida(){
		botonParar.disabled = true;
		clearInterval(id1);

		clearInterval(id3);
		clearInterval(id4);
		clearInterval(intervalNivel);
		ctx.clearRect(0,0,canvasTamanoX,canvasTamanoY);
		botonIniciar.disabled=false;
		vida.value=0;
		if(nombreUsuaio.value!=""){
			miStorage.setItem(miStorage.length, nombreUsuaio.value+":"+puntuacion);
		}
		ctx.drawImage(imagenGameOver,0,0,540,360,0,0,canvasTamanoX,canvasTamanoY);
		actualizarPuntuaciones();
	}
	function imprimirPuntuaciones(){
		let MiStorageArray=[];
		if(miStorage.length > 0){
		for (i=0;i<miStorage.length;i++){
			MiStorageArray[i] = miStorage.getItem(miStorage.key(i));
		}
	}
		MiStorageArray.sort(ordenarPorPuntuacion);
		//console.log(MiStorageArray);
		for (var i = 0; i < 10; i++){
			if(MiStorageArray[i]){
				//console.log("0");
				let lista=document.createElement("li");
				let texto=document.createTextNode(MiStorageArray[i]);
				lista.appendChild(texto);
				listaPuntuacion.appendChild(lista);

			}
		}
	}
	function actualizarPuntuaciones(){
		let listali=listaPuntuacion.getElementsByTagName("li");
		for(let i=0;i<=listaPuntuacion.getElementsByTagName("li").length;i++){
			if(listali[i]){
				listaPuntuacion.removeChild(listali[i]);
				i=i-1;
			}
		}
		imprimirPuntuaciones();
	}
    function ordenarPorPuntuacion(array1,array2){

        let puntuacion1=array1.split(":");
        let puntuacion2=array2.split(":");

        if(+puntuacion1[1]>+puntuacion2[1]){
            return -1;
        }else if(+puntuacion1[1]<+puntuacion2[1]){
            return 1;
        }else{
            return 0;
        }
    }
	function nivel() {
		this.dificultad = 1;
		this.numEnemigosHorizontal = 0;
		this.numEnemigosTorreta = 0;
		this.numBoss = 0;
		this.numBossInf=0;
		this.tiempo = 0;
	}
	function nivel1(){
		calculaVida();
		if (miNivel.tiempo % 10 == 1 && miNivel.numEnemigosHorizontal < 12) {
			miNivel.numEnemigosHorizontal++;
			generarEnemigoHorizontal();
		}
		if (miNivel.tiempo > 100 && miNivel.numEnemigosTorreta < 1) {
			miNivel.numEnemigosTorreta++;
			generarEnemigoTorreta();
		}
		if (miNivel.numEnemigosHorizontal >= 12 && enemigosHorizontal.length == 0 && enemigosTorreta.length == 0) {
			let dificultad=miNivel.dificultad+1;
			miNivel = new nivel();
			miNivel.dificultad = dificultad;
			clearInterval(intervalNivel);
			controlNiveles();
		}
	}
	function nivel2(){
		calculaVida();
		if (miNivel.tiempo % 10 == 1 && miNivel.numEnemigosHorizontal < 17) {
			miNivel.numEnemigosHorizontal++;
			generarEnemigoHorizontal();
		}
		if (miNivel.tiempo > 70 && miNivel.tiempo % 100 == 1 && miNivel.numEnemigosTorreta < 3) {
			miNivel.numEnemigosTorreta++;
			generarEnemigoTorreta();
		}
		if (miNivel.numEnemigosHorizontal >= 17 && enemigosHorizontal.length == 0 && enemigosTorreta.length == 0) {
			let dificultad=miNivel.dificultad+1;
			miNivel = new nivel();
			miNivel.dificultad = dificultad;
			clearInterval(intervalNivel);
			controlNiveles();
		}
	}
	function nivel3(){
		calculaVida();
		if (miNivel.tiempo % 10 == 1 && miNivel.numEnemigosHorizontal < 23) {
			miNivel.numEnemigosHorizontal++;
			generarEnemigoHorizontal();
		}
		if (miNivel.tiempo > 70 && miNivel.tiempo % 100 == 1 && miNivel.numEnemigosTorreta < 5) {
			miNivel.numEnemigosTorreta++;
			generarEnemigoTorreta();
		}
		if (miNivel.numEnemigosHorizontal >= 23 && enemigosHorizontal.length == 0 && enemigosTorreta.length == 0) {
			let dificultad=miNivel.dificultad+1;
			miNivel = new nivel();
			miNivel.dificultad = dificultad;
			clearInterval(intervalNivel);
			controlNiveles();
		}
	}
	function nivel4(){
		calculaVida();
		if (miNivel.numBoss < 1) {
			miNivel.numBoss++;
			generarEnemigoBoss();
		}
		if (miNivel.tiempo % 10 == 1 && enemigosHorizontal.length < 10 && enemigosBoss.length > 0) {
			generarEnemigoHorizontal();
		}
		if (miNivel.tiempo > 70 && miNivel.tiempo % 100 == 1 && enemigosTorreta.length < 2 && enemigosBoss.length > 0) {
			generarEnemigoTorreta();
		}
		if (miNivel.numBoss >= 1 && enemigosHorizontal.length == 0 && enemigosTorreta.length == 0 && enemigosBoss.length == 0) {
			let dificultad=miNivel.dificultad+1;
			miNivel = new nivel();
			miNivel.dificultad = dificultad;
			clearInterval(intervalNivel);
			controlNiveles();
		}
	}
	function nivel5(){
		calculaVida();
		if (miNivel.numBoss < 2) {
			miNivel.numBoss++;
			generarEnemigoBoss();
		}
		if (miNivel.tiempo % 10 == 1 && enemigosHorizontal.length < 10 && enemigosBoss.length > 0) {
			generarEnemigoHorizontal();
		}
		if (miNivel.tiempo > 30 && miNivel.tiempo % 50 == 1 && enemigosTorreta.length < 3 && enemigosBoss.length > 0) {
			generarEnemigoTorreta();
		}
		if (miNivel.numBoss >= 2 && enemigosHorizontal.length == 0 && enemigosTorreta.length == 0 && enemigosBoss.length == 0) {
			let dificultad=miNivel.dificultad+1;
			miNivel = new nivel();
			miNivel.dificultad = dificultad;
			miNivel.numBossInf=numBosses=Math.floor(Math.random()*(miNivel.dificultad/2));
			clearInterval(intervalNivel);
			controlNiveles();
		}
	}
	function nivelInfinito(){
		calculaVida();

		if (miNivel.numBoss < miNivel.numBossInf ) {
			miNivel.numBoss++;
			generarEnemigoBoss();
		}
		if (miNivel.tiempo % 7 == 1 && enemigosHorizontal.length < miNivel.dificultad*2 && enemigosBoss.length > 0) {
			generarEnemigoHorizontal();
		}
		if (miNivel.tiempo > 30 && miNivel.tiempo % 50 == 1 && enemigosTorreta.length < miNivel.dificultad/2 && enemigosBoss.length > 0) {
			generarEnemigoTorreta();
		}
		if (miNivel.numBoss >= miNivel.numBossInf && enemigosHorizontal.length == 0 && enemigosTorreta.length == 0 && enemigosBoss.length == 0) {
			let dificultad=miNivel.dificultad+1;
			miNivel = new nivel();
			miNivel.dificultad = dificultad;
			miNivel.numBossInf=numBosses=Math.floor(Math.random()*(miNivel.dificultad/2));
			clearInterval(intervalNivel);
			controlNiveles();
		}
	}
	function calculaVida(){
		miNivel.tiempo++;
		miNave.vida += 0.5;
		miNave.tiempoDisparo++;
		if (miNave.vida > 100) {
			miNave.vida = 100;
		}
		vida.value = miNave.vida;
	}
	function controlNiveles() {
		switch (miNivel.dificultad) {
			case 1:
				intervalNivel=setInterval(nivel1,1000/10);
				break;
			case 2:
				intervalNivel=setInterval(nivel2,1000/10);
				break;
			case 3:
				intervalNivel=setInterval(nivel3,1000/10);
				break;
			case 4:
				intervalNivel=setInterval(nivel4,1000/10);
				break;
			case 5:
				intervalNivel=setInterval(nivel5,1000/10);
				break;
			default:
				intervalNivel=setInterval(nivelInfinito,1000/10);
				break;
		}
	}

	function predecirPosicion() {
		x1 = x2;
		y1 = y2;
		x2 = miNave.x + miNave.tamañoX / 2;
		y2 = miNave.y + miNave.tamañoY / 2;
		xsup = x2 + (x2 - x1);
		ysup = y2 + (y2 - y1);

	}
	function generarMisil() {
		switch (arma) {
			case "Default":
				Default();
				break;
			case "Ametralladora":
				Ametralladora();
				break;
			case "Francotirador":
				Francotirador();
				break;

		}

	}
	function Default() {
		if (!teclaMisilPresionada) {
			reproducirAudioAmetralladora();
			teclaMisilPresionada = true;
			let tiempoVida = 70;
			misilesNave[misilesNave.length] = new MisilNave(miNave.angle, (miNave.x + miNave.tamañoX / 2) - 4, (miNave.y + miNave.tamañoY / 2) - 4, tiempoVida);
			misilesNave[misilesNave.length] = new MisilNave(miNave.angle, (miNave.x + miNave.tamañoX / 2) - 4, (miNave.y + miNave.tamañoY / 2) - 4, tiempoVida);

		}
	}
	function Ametralladora() {
		if (miNave.tiempoDisparo >= 1 && teclaMisilPresionada) {
			miNave.tiempoDisparo = 0;
			let tiempoVida = 45;
			if(Math.random()*1>0.5){
				misilesNave[misilesNave.length] = new MisilNave(miNave.angle + Math.random() * 30 - 15, (miNave.x + miNave.tamañoX / 2) - 4, (miNave.y + miNave.tamañoY / 2) - 4, tiempoVida);
			}
			misilesNave[misilesNave.length] = new MisilNave(miNave.angle + Math.random() * 30 - 15, (miNave.x + miNave.tamañoX / 2) - 4, (miNave.y + miNave.tamañoY / 2) - 4, tiempoVida);
			reproducirAudioAmetralladora();
		}
	}
	function Francotirador() {
		if (!teclaMisilPresionada && miNave.tiempoDisparo >= 5) {
			reproducirAudioAmetralladora();
			miNave.tiempoDisparo = 0;
			teclaMisilPresionada = true;
			let tiempoVida = 200;
			misilesNave[misilesNave.length] = new MisilNave(miNave.angle, (miNave.x + miNave.tamañoX / 2) - 4, (miNave.y + miNave.tamañoY / 2) - 4, tiempoVida);
			misilesNave[misilesNave.length] = new MisilNave(miNave.angle, (miNave.x + miNave.tamañoX / 2) - 4, (miNave.y + miNave.tamañoY / 2) - 4, tiempoVida);
			misilesNave[misilesNave.length] = new MisilNave(miNave.angle, (miNave.x + miNave.tamañoX / 2) - 4, (miNave.y + miNave.tamañoY / 2) - 4, tiempoVida);
			misilesNave[misilesNave.length] = new MisilNave(miNave.angle, (miNave.x + miNave.tamañoX / 2) - 4, (miNave.y + miNave.tamañoY / 2) - 4, tiempoVida);

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
				if (arma == "Ametralladora") {
					teclaMisilPresionada = true;
				}
				generarMisil();


				break;
			case 70:
				//kaboom=true;

				break;
			case 40:
				if (rozamiento) {
					rozamiento = false;
				} else {
					rozamiento = true;
				}
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
			case 70:

				//kaboom = false;
				break;


		}

	}

	document.addEventListener("keydown", activaMovimiento, false);
	document.addEventListener("keyup", desactivaMovimiento, false);

	// localizamos el canvas
	canvas = document.getElementById("miCanvas");

	// Generamos el contexto de trabajo
	ctx = canvas.getContext("2d");
	imagen = new Image();
	imagen.src = "navePrueba2.png";
	imagenGameOver=new Image();
	imagenGameOver.src ="gameOver.png";
	Nave.prototype.imagen = imagen;
	Motor.prototype.imagen = imagen;
	MisilNave.prototype.imagen = imagen;
	MisilEnemigo.prototype.imagen = imagen;
	MisilEnemigoGirado.prototype.imagen = imagen;
	enemigoHorizontal.prototype.imagen = imagen;
	enemigoTorreta.prototype.imagen = imagen;
	enemigoBoss1.prototype.imagen = imagen;
	explosion.prototype.imagen = imagen;
	id4 = setInterval(pintaPantallaCarga, 1000 / 24);

	function iniciarPartida() {

		actualizarPuntuaciones();

		puntuacion=0;
		arma = "Default";
		misilesNave = [];
		enemigosHorizontal = [];
		misilesEnemigos = [];
		enemigosTorreta = [];
		enemigosBoss = [];
		explosiones = [];
		xDerecha = false;
		xIzquierda = false;
		espacio = false;
		kaboom = false;
		x = canvasTamanoX / 2;
		y = canvasTamanoY / 2;
		y2 = y;
		x2 = x;
		puntuacionVisual.innerHTML="Puntuación= "+puntuacion;
		rozamiento = true;

		teclaMisilPresionada = false;
		vida.value = 100;
		miNave = new Nave(x, y);
		motor = new Motor(x, y);
		miNivel = new nivel();
		for (let i = 0; i < 0; i++) {
			generarEnemigoTorreta();
		}
		for (let i = 0; i < 0; i++) {
			generarEnemigoBoss();
		}
		for (let i = 0; i < 0; i++) {
			generarEnemigoHorizontal();
		}
		// Lanzamos la animación
		id1 = setInterval(pintaRectangulo, 1000 / 50);
		controlNiveles();
		id3 = setInterval(predecirPosicion, 1000 / 6);
		botonParar.disabled=false;
	}
	botonIniciar.onclick = function () {
		/*clearInterval(id1);
		clearInterval(id2);
		clearInterval(id3);
		clearInterval(id4);
		iniciarPartida();*/
		if (!iniciar) {
			iniciar = true;
		} else {
			clearInterval(id1);

			clearInterval(id3);
			clearInterval(id4);
			iniciarPartida();
		}

		botonIniciar.disabled = true;

	};
	botonParar.onclick = function () {
		clearInterval(id1);
		clearInterval(id3);
		clearInterval(intervalNivel);
		parado=true;
		botonContinuar.disabled=false;
	};
	botonContinuar.onclick = function () {
		if(parado){
			controlNiveles();
			id1 = setInterval(pintaRectangulo, 1000 / 50);
			id3 = setInterval(predecirPosicion, 1000 / 6);
			parado=false;
			botonContinuar.disabled=true;
		}
	};
	botonAmetralladora.onclick = function () {
		arma = "Ametralladora";
	}
	botonDefault.onclick = function () {
		arma = "Default";
	}
	botonFrancotirador.onclick = function () {
		arma = "Francotirador";
	}
	imprimirPuntuaciones();
}
