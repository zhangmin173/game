/**
 * 产生俄罗斯方块儿
 */
class Square {

	constructor() {
		this.block = [
			[2,2,2,2],
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0]
		]
		this.origin = {
			x: 0,
			y: 0
		}
		this.over = false
	}

	down() {
		this.origin.x ++;
	}

	right() {
		this.origin.y++;
	}

	left() {
		this.origin.y--;
	}
	
}
/**
 * 俄罗斯方块儿基础类
 */
class Tetris {

	constructor(ele,opts) {
		this.debug = true
		this.w = opts.w
		this.color = ['none','done','active']
		this.n = 10
		// 游戏区
		this.ele = ele
		this.area = [
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0]
		]
		// 预览区
		this.preview = opts.preview
		this.cur = null
		this.next = null
	}

	// 日志
	log(msg) {
		if (this.debug) {
			console.log(msg)
		}
	}

	// 初始化
	init () {
		this.cur = new Square(),
		this.next = new Square()

		this.updateArea(this.cur)
		this.updateDom(this.ele,this.area)
		this.updateDom(this.preview,this.next.block)

		this.handle()
	}
	// 事件绑定
	handle() {
		let _this = this
		document.onkeyup = function (event) {
            var e = event || window.event;
            var keyCode = e.keyCode || e.which;
            switch (keyCode) {
            	case 32:
                    console.log('空格')
                    break;
                case 37:
                    _this.left()
                    break;
                case 38:
                    console.log('上')
                    break;
                case 39:
                    _this.right()
                    break;
                case 40:
                    _this.down()
                    break;
                default:
                    break;
            }
        }
	}
	// 左
	left() {
		this.cur.left();
		this.updateArea(this.cur)
		this.updateDom(this.ele,this.area)
	}
	// 上
	// 右
	right() {
		this.cur.right();
		this.updateArea(this.cur)
		this.updateDom(this.ele,this.area)
	}
	// 下
	down() {
		if (this.canDown()) {
			this.cur.down();
			this.updateArea(this.cur)
			this.bindArea()
			this.updateDom(this.ele,this.area)
		}
	}
	canDown() {
		if (this.cur.origin.x > (this.n *2 - 2)) {
			this.cur.over = true;
			return false
		}
		return true
	}
	// 更新游戏显示区数据
	updateArea(cur) {
		let _this = this
		this.area.forEach( function(element, i) {
			element.forEach( function(ele, j) {
				if (_this.area[i][j] == 2) {
					_this.area[i][j] = 0
				}
			    
			});
		});
		cur.block.forEach( function(element, i) {
			element.forEach( function(ele, j) {
				let x = i + cur.origin.x,
					y = j + cur.origin.y

				if (cur.block[i][j] == 2) {
					_this.area[x][y] = cur.block[i][j]
				}
			    
			});
		});
	}
	// 绑定游戏显示区数据
	bindArea() {
		if (this.cur.over == false) {
			return
		}
		let _this = this
		this.area.forEach( function(element, i) {
			element.forEach( function(ele, j) {
				if (_this.area[i][j] == 2) {
					_this.area[i][j] = 1
				}
			});
		});
	}
	// 更新dom
	updateDom(container,data) {
		let html = ''
		for (let i = 0,len = data.length; i < len; i++) {
			for (let j = 0,l = data[i].length; j < l; j++) {
				let div = document.createElement('div'),
					node = document.createElement('span')

				node.style.width = this.w + 'px'
				node.style.height = this.w + 'px'
				node.className = this.color[data[i][j]]

				div.appendChild(node)
				html += div.innerHTML
			}
		}
		container.innerHTML = html
	}
}


let w = 30,
	ele = document.getElementById('game'),
	preview =  document.getElementById('preview')

let game = new Tetris(ele,{
	w,
	preview
})

game.init()