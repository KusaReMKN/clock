'use strict';

const ctx = window.canvas.getContext('2d');

function update()
{
	const now = new Date();
	const sec = now.getSeconds() + now.getMilliseconds() / 1000;
	const min = now.getMinutes() + sec / 60;
	const hour = (now.getHours() + min / 60) % 12;

	const center = { x: ctx.canvas.width / 2, y: ctx.canvas.height / 2 };

	const secth = (sec + 15) * Math.PI / 30;
	const minth = (min + 15) * Math.PI / 30;
	const hourth = (hour + 3) * Math.PI / 6;

	const sece = { x: -sec_l.value * Math.cos(secth), y: -sec_l.value * Math.sin(secth) };
	const mine = { x: -min_l.value * Math.cos(minth), y: -min_l.value * Math.sin(minth) };
	const houre = { x: -hour_l.value * Math.cos(hourth), y: -hour_l.value * Math.sin(hourth) };
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.lineCap = 'round';
	ctx.lineWidth = 10;
	ctx.strokeStyle = 'black';
	ctx.beginPath();
	ctx.moveTo(center.x, center.y);
	ctx.lineTo(center.x + sece.x, center.y + sece.y);
	ctx.moveTo(center.x, center.y);
	ctx.lineTo(center.x + mine.x, center.y + mine.y);
	ctx.moveTo(center.x, center.y);
	ctx.lineTo(center.x + houre.x, center.y + houre.y);
	ctx.stroke();

	const secp = { x: +sec_m.value * sece.x / 2, y: +sec_m.value * sece.y / 2 };
	const minp = { x: +min_m.value * mine.x / 2, y: +min_m.value * mine.y / 2 };
	const hourp = { x: +hour_m.value * houre.x / 2, y: +hour_m.value * houre.y / 2 };
	const allp = {
		x: (secp.x + minp.x + hourp.x) / (+sec_m.value + +min_m.value + +hour_m.value),
		y: (secp.y + minp.y + hourp.y) / (+sec_m.value + +min_m.value + +hour_m.value),
	};
	ctx.lineCap = 'round';
	ctx.lineWidth = 10;
	ctx.strokeStyle = 'red';
	ctx.beginPath();
	ctx.moveTo(center.x + secp.x, center.y + secp.y);
	ctx.lineTo(center.x + secp.x, center.y + secp.y);
	ctx.moveTo(center.x + minp.x, center.y + minp.y);
	ctx.lineTo(center.x + minp.x, center.y + minp.y);
	ctx.moveTo(center.x + hourp.x, center.y + hourp.y);
	ctx.lineTo(center.x + hourp.x, center.y + hourp.y);
	ctx.stroke();
	ctx.strokeStyle = `hsl(${secth * 18000 / Math.PI}deg 100% 50%)`;
	ctx.beginPath();
	ctx.moveTo(center.x + allp.x, center.y + allp.y);
	ctx.lineTo(center.x + allp.x, center.y + allp.y);
	ctx.stroke();

	window.requestAnimationFrame(update);
}

update();
