'use strict';

const ctx = canvas.getContext('2d');

function update()
{
	const length = { };
	length.sec = +sec_l.value;
	length.min = +min_l.value;
	length.hour = +hour_l.value;

	const weight = { };
	weight.sec = +sec_m.value;
	weight.min = +min_m.value;
	weight.hour = +hour_m.value;
	weight.all = weight.sec + weight.min + weight.hour;

	const hook = { };
	hook.x = +hook_x.value;
	hook.y = +hook_y.value;

	const now = new Date();
	const clock = { };
	clock.sec = now.getSeconds() + now.getMilliseconds() / 1e3;
	clock.min = now.getMinutes() + clock.sec / 60;
	clock.hour = now.getHours() % 12 + clock.min / 60;

	const theta = { };
	theta.sec = (clock.sec + 15) * Math.PI / 30;
	theta.min = (clock.min + 15) * Math.PI / 30;
	theta.hour = (clock.hour + 3) * Math.PI / 6;

	const edge = { };
	edge.sec = {
		x: length.sec * -Math.cos(theta.sec),
		y: length.sec * -Math.sin(theta.sec),
	};
	edge.min = {
		x: length.min * -Math.cos(theta.min),
		y: length.min * -Math.sin(theta.min),
	};
	edge.hour = {
		x: length.hour * -Math.cos(theta.hour),
		y: length.hour * -Math.sin(theta.hour),
	};

	edge.all = {
		x: (weight.sec * edge.sec.x + weight.min * edge.min.x + weight.hour * edge.hour.x)
			/ (weight.sec + weight.min + weight.hour) / 2,
		y: (weight.sec * edge.sec.y + weight.min * edge.min.y + weight.hour * edge.hour.y)
			/ (weight.sec + weight.min + weight.hour) / 2,
	};
	theta.all = Math.atan2(-hook.y - edge.all.y, -hook.x + edge.all.x) + Math.PI / 2;

	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.save();

	// 描画系の変形
	ctx.transform(1, 0, 0, 1, +ctx.canvas.width / 2 + hook.x, ctx.canvas.height / 2 - hook.y);
	ctx.transform(Math.cos(theta.all), Math.sin(theta.all),
		-Math.sin(theta.all), Math.cos(theta.all),
		0, 0);
	ctx.transform(1, 0, 0, 1, -hook.x, hook.y);

	// 時計の枠
	const clockRadius = 200;
	ctx.save();
	ctx.strokeStyle = 'cyan';
	ctx.lineWidth = 10;
	ctx.beginPath();
	ctx.ellipse(0, 0, clockRadius, clockRadius, 0, 0, 2 * Math.PI);
	ctx.stroke();

	ctx.fillStyle = 'blue';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.font = 'bold 24px sans-serif';
	for (let i = 1; i <= 12; i++) {
		const th = (i - 3) * Math.PI / 6;
		ctx.fillText(`${i}`, clockRadius * Math.cos(th), clockRadius * Math.sin(th));
	}
	ctx.restore();

	// 吊り下げ位置
	ctx.save();
	ctx.fillStyle = 'green';
	ctx.beginPath();
	ctx.ellipse(hook.x, -hook.y, 5, 5, 0, 0, 2 * Math.PI);
	ctx.fill();
	ctx.restore();

	// 時計の針
	ctx.save();
	ctx.lineWidth = 10;
	ctx.lineCap = 'round';
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(edge.hour.x, edge.hour.y);
	ctx.moveTo(0, 0);
	ctx.lineTo(edge.min.x, edge.min.y);
	ctx.moveTo(0, 0);
	ctx.lineTo(edge.sec.x, edge.sec.y);
	ctx.stroke();
	ctx.restore();

	// 針の重さ
	ctx.save();
	ctx.fillStyle = 'red';
	ctx.beginPath();
	ctx.ellipse(edge.hour.x, edge.hour.y, Math.sqrt(weight.hour), Math.sqrt(weight.hour),
		0, 0, 2 * Math.PI);
	ctx.fill();
	ctx.beginPath();
	ctx.ellipse(edge.min.x, edge.min.y, Math.sqrt(weight.min), Math.sqrt(weight.min),
		0, 0, 2 * Math.PI);
	ctx.fill();
	ctx.beginPath();
	ctx.ellipse(edge.sec.x, edge.sec.y, Math.sqrt(weight.sec), Math.sqrt(weight.sec),
		0, 0, 2 * Math.PI);
	ctx.fill();
	ctx.restore();

	// 全体の重心
	ctx.save();
	ctx.fillStyle = 'yellow';
	ctx.strokeStyle = `hsl(${now.getMilliseconds()%360}deg 100% 50%)`;
	ctx.beginPath();
	ctx.ellipse(edge.all.x, edge.all.y, Math.sqrt(weight.all), Math.sqrt(weight.all),
		0, 0, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();
	ctx.restore();

	ctx.restore();

	window.requestAnimationFrame(update);
}

update();
