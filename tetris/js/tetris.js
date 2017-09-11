/**
 * 俄罗斯方块儿基础类
 */
class Tetris {

	constructor(ele,opts) {
		this.debug = true
		this.ele = ele
		this.w = opts.w
		this.area = [
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,1,0,0,0,0,0,0,0],
			[0,0,1,0,0,0,0,0,0,0],
			[0,0,1,0,0,0,0,0,0,0],
			[0,0,1,0,0,0,0,0,0,0],
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
		this.color = ['#fff','#ddd','#f00']

		this.preview = opts.preview
		this.block = [
			[1,1,1,0],
			[0,0,1,0],
			[0,0,0,0],
			[0,0,0,0]
		]
	}

	// 日志
	log(msg) {
		if (this.debug) {
			console.log(msg)
		}
	}

	// 初始化
	init () {
		this.updateArea()
		this.updatePreview()
	}

	// 刷新游戏区
	updateArea() {
		let html = ''
		for (let i = 0,len = this.area.length; i < len; i++) {
			for (let j = 0,l = this.area[i].length; j < l; j++) {
				let div = document.createElement('div'),
					node = document.createElement('span')

				node.style.width = this.w + 'px'
				node.style.height = this.w + 'px'

				if (this.area[i][j] == 1) {
					node.style.backgroundColor = this.color[2]
				} else {
					node.style.backgroundColor = this.color[0]
				}
				div.appendChild(node)
				html += div.innerHTML
			}
		}
		this.ele.innerHTML = html
	}

	// 刷新预览区
	updatePreview() {
		let html = ''
		for (let i = 0,len = this.block.length; i < len; i++) {
			for (let j = 0,l = this.block[i].length; j < l; j++) {
				let div = document.createElement('div'),
					node = document.createElement('span')

				node.style.width = this.w + 'px'
				node.style.height = this.w + 'px'

				if (this.block[i][j] == 1) {
					node.style.backgroundColor = this.color[2]
				} else {
					node.style.backgroundColor = this.color[0]
				}
				div.appendChild(node)
				html += div.innerHTML
			}
		}
		this.preview.innerHTML = html
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