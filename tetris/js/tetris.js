/**
 * 产生俄罗斯方块儿
 */
class Square {

	constructor() {
		this.data = [
			[2,2,2,0],
			[0,0,2,0],
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
		this.gameBox = ele
		this.data = [
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
		this.gameDoms = []
		// 预览区
		this.nextBox = opts.preview
		this.nextDoms = []
		// 当前方块儿
		this.cur = null
		// 下一个方块儿
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

		this.initDom(this.gameBox,this.data,this.gameDoms)
		this.initDom(this.nextBox,this.next.data,this.nextDoms)

		//this.updateDom(this.data,this.gameDoms)


		// this.updateArea(this.cur)
		// this.updateDom(this.gameBox,this.data)
		// this.updateDom(this.nextBox,this.next.data)

		// this.handle()
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
		this.cur.left()
		this.updateArea(this.cur)
		this.updateDom(this.gameBox,this.data)
	}
	// 上
	// 右
	right() {
		this.cur.right()
		this.updateArea(this.cur)
		this.updateDom(this.gameBox,this.data)
	}
	// 下
	down() {
		if (this.canDown()) {
			this.cur.down()
			this.updateArea(this.cur)
			this.bindArea()
			this.updateDom(this.gameBox,this.data)
		} else {
			this.cur = this.next
			this.next = new Square()
		}
	}
	canDown() {
		if (this.cur.origin.x > (this.n *2 - 2)) {
			return false
		}
		if (this.cur.origin.x > (this.n *2 - 3)) {
			this.cur.over = true;
		}
		return true
	}

	// 更新游戏显示区数据
	updateArea(cur) {
		let _this = this
		this.data.forEach( function(element, i) {
			element.forEach( function(ele, j) {
				if (_this.data[i][j] == 2) {
					_this.data[i][j] = 0
				}
			});
		});
		cur.data.forEach( function(element, i) {
			element.forEach( function(ele, j) {
				let x = i + cur.origin.x,
					y = j + cur.origin.y
				if (cur.data[i][j] == 2) {
					_this.data[x][y] = cur.data[i][j]
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
		this.data.forEach( function(element, i) {
			element.forEach( function(ele, j) {
				if (_this.data[i][j] == 2) {
					_this.data[i][j] = 1
				}
			});
		});
	}
	// 初始化dom元素
	initDom(container,data,divs) {
		let _this = this

		data.forEach( function(element, i) {
			let div = []
			element.forEach( function(ele, j) {
				let parent = document.createElement('div'),
					node = document.createElement('span')

				node.style.width = _this.w + 'px'
				node.style.height = _this.w + 'px'
				node.className = _this.color[0]
				div.push(node)
				container.appendChild(node)
			});
			divs.push(div)
		});
	}
	// 更新dom
	updateDom(data,divs) {
		let _this = this
		data.forEach( function(element, i) {
			element.forEach( function(ele, j) {
				divs[i][j].className = _this.color[data[i][j]]
			});
		});
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