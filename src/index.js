import './style/main.css'
import backgroundImage from "../static/backgroundImage.jpg"
import hoveredImage from "../static/hoveredImage.jpg"
import Scene from './Scene'

window.scene = new Scene()

let isMobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 isMobile = true;
}

const point = document.querySelector(".point-0");

if (isMobile) {
    point.classList.add('visible')
}

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}