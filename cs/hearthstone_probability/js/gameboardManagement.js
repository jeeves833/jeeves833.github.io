function Board(canvas, minionButton, launchButton) {
	this.canvas = canvas;
	this.width = canvas[0].width
	this.hero = new Hero(30, this.canvas, 570, 150);
	this.minions = [];
	this.numMinions = 0;
	this.healths = [];
	this.gap = 20;
	this.minionWidth = 102;
	this.minionButton = minionButton;
	this.launchButton = launchButton;
	this.idAss = [];
	for (var i = 0; i < 7; i++) {
		this.idAss[i] = false;
	}
	this.lastID = 0;

	this.addMinion = function (h) {
		if (this.numMinions < 7) {
			while (this.idAss[this.lastID]) {
				this.lastID = (this.lastID + 1) % 7;
			}
			this.idAss[this.lastID] = true;
			this.minions.push(new Minion(h, this, this.lastID, this.numMinions));
			this.numMinions++;
			this.adjustMinionPosition();
			return this.minions[this.numMinions -1 ]
		} else {
			return -1;
		}
	};
	this.clearBoard = function () {
		this.minions = [];
		this.numMinions = 0;
		return this;
	};
	this.removeMinion = function(minion) {
		var index = this.minions.indexOf(minion);
		if (index == -1) {
			console.log("Error: Minion does not exist");
			return -1;
		} else {
			// this.canvas.removeLayer(this.canvas.getLayer(new RegExp(".*" + index)))
			this.idAss[minion.id] = false;
			this.minions.splice(index, 1);
			this.numMinions--;
			this.adjustMinionPosition();
			return this.minions;
		}
	};
	this.adjustMinionPosition = function() {
		if (this.numMinions == 7) {
			this.minionButton[0].setAttribute("disabled", "yes");
			$('#minionTooltip').tooltip('enable');
		} else {
			this.minionButton[0].disabled = false;
			$('#minionTooltip').tooltip('disable');
		}
		var minionSpaceWidth = (this.minionWidth + this.gap) * this.numMinions - this.gap;
		var pos = (this.width - minionSpaceWidth + this.minionWidth) / 2;
		for (var i = 0; i < this.numMinions; i++) {
			this.minions[i].setX(pos)
			pos += this.minionWidth + this.gap;
		}
	}
	this.setUpHealth = function() {
		this.healths = [this.hero.health];
		for (var minion of this.minions) {
			// console.log(minion)
			this.healths.push(minion.health);
		}
		return this.healths;
	}
	this.getProbability = function(missiles) {
		this.setUpHealth();
		return this.probabilityHelper(missiles);
	};

	this.probabilityHelper = function(missiles) {
		// console.log(this.healths + " " + missiles)
		var p = new Array(this.healths.length);
		for (var i = 0; i < p.length; i++) {
			p[i] = 0;
		};
		if (missiles == 0) {
			for (var i = 0; i < p.length; i++) {
				if (this.healths[i]  > 0) {
					p[i] = 0;
				} else {
					p[i] = 1;
				}
			}
			return p;
		} else {
			var n = 0;
			for (var i = 0; i < p.length; i++) {
				if (this.healths[i] > 0) {
					n++;
					this.healths[i]--;
					var newP = this.probabilityHelper(missiles - 1);
					this.healths[i]++;
					for (var j = 0; j < p.length; j++) {
						p[j] = ((n - 1)*p[j] + newP[j]) / n;
					};
				}
			}
			return p;
		}

	}

	this.minionButton.click(function() {
		myBoard.addMinion(1);
	});

	this.launchButton.click(function() {
		// console.log($("#launchCounter > input").val());
		var probs = myBoard.getProbability($("#launchCounter > input").val());
		console.log(probs);
	})

	this.minionButton.hover(function() {
		if (this.hasAttribute("disabled")) {

		}
	})
}

function Hero(health, canvas, x, y) {
	this.health = health;
	this.x = x;
	this.y = y;
	this.canvas = canvas;

	this.setHealth = function(h) {
		if (h > 0) {
			this.health = h;
			this.canvas.setLayer('heroHealth', {text: parseInt(this.health)});
		}
		return this;
	}
	this.changeHealth = function(i) {
		return this.setHealth(this.health + i);
	}

	this.canvas.drawImage({
			layer : true,
			name: 'hero',
			data: {
				ob: this
			},
			source : "img/Jaina_Proudmoore(320).png",
			x: this.x, y: this.y,
			scale: 0.75 
		}).drawText({
			layer : true,
			name: 'heroHealth',
			fillStyle: '#fff',
			strokeStyle: '#000',
			text: parseInt(this.health),
			fontSize: 39,
			x: this.x + 78, y: this.y + 46,
			strokeWidth: 2,
			fontFamily: "Hearthstone Numbers"
		}).addLayer({
			type: 'image',
			name: 'heroChanger',
			source: 'img/healthChanger.png',
			x: this.x+78, y: this.y+86,
			click: function(layer) {
				if (layer.eventX > layer.x) {
					$(this).getLayer('hero').data.ob.changeHealth(1);
				} else {
					if ($(this).getLayer('hero').data.ob.health > 1) {
						$(this).getLayer('hero').data.ob.changeHealth(-1);
					}
				}
			}
		});

}

function Minion(health, board, id, index) {
	this.health = health;
	this.board = board;
	this.id = id;
	this.index = index;
	// console.log(id)
	this.x = 0;
	this.y = 375
	this.kill = function() {
		board.removeMinion(this);
	}
	this.setX = function(newX) {
		this.x = newX;
		this.board.canvas.setLayer("minion" + parseInt(this.id), {x: this.x});
		this.board.canvas.setLayer("minionKill" + parseInt(this.id), {x: this.x+30});
		this.board.canvas.setLayer('minionHealth' + this.id, {x: this.x + 32})
		this.board.canvas.setLayer('minionChanger' + this.id, {x: this.x})
	}

	this.changeHealth = function(n) {
		this.health += n;
		this.board.canvas.setLayer('minionHealth' + this.id, {text: this.health});
	}
	board.canvas.addLayer({
		type: "image",
		data: {
			id: this.id,
			ob: this
		},
		name: "minion" + parseInt(this.id),
		groups: [this.id],
		source : "img/wispCleared.png",
		x: this.x, y: this.y,
		mouseover: function(layer) {
			$(this).setLayer('minionKill' + layer.data.id, {
				visible: true,
			});
		},
		mouseout: function(layer) {
			// console.log('leave')
			$(this).setLayer('minionKill' + layer.data.id, {
				visible: false,
			});
		},
		click: function(layer) {
			$(this).removeLayerGroup(layer.data.id);
			layer.data.ob.kill()

		}
	}).addLayer({
		type: 'image',
		visible: false,
		intangible: true,
		name: 'minionKill' + parseInt(this.id),
		groups: [this.id],
		source: "img/killButton.png",
		x: this.x, y: this.y-50,
		width: 30, height: 30
	}).addLayer({
		type: 'text',
		name: 'minionHealth' + parseInt(this.id),
		groups: [this.id],
		fillStyle: '#fff',
		strokeStyle: '#000',
		text: parseInt(this.health),
		fontSize: 30,
		x: this.x, y: this.y+35,
		strokeWidth: 2,
		fontFamily: "Hearthstone Numbers"
	}).addLayer({
		type: 'image',
		name: 'minionChanger' + this.id,
		groups: [this.id],
		source: 'img/healthChanger.png',
		x: this.x, y: this.y + 75,
		click: function(layer) {
			// console.log(layer.groups[0])
			if (layer.eventX > layer.x) {
				$(this).getLayer('minion' + layer.groups[0]).data.ob.changeHealth(1);
			} else {
				if ($(this).getLayer('minion' + layer.groups[0]).data.ob.health > 1) {
					$(this).getLayer('minion' + layer.groups[0]).data.ob.changeHealth(-1);
				}
			}
		}
	})
}

function update(context) {
		// context.canvas.clearCanvas();
		// context.hero.draw(context.canvas);
		// for (var minion of context.minions) {
		// 	minion.draw(context.canvas);
		// }
		context.canvas.drawLayers();
		setTimeout(update, 33, context)
	}


function main() {
	myBoard = new Board($("canvas"), $("#minionButton"), $("#launchButton"));
	update(myBoard);
	$('[data-toggle="tooltip"]').tooltip().tooltip('disable');
}

$(document).ready(main);
