document.addEventListener("DOMContentLoaded", function() {
	const width = 600;
	const height = 600;
	const svg = d3.select("svg")
		.attr("width", width)
		.attr("height", height);

	enableAnimationCheckbox.checked = false;
	enablePathCrossingCheckbox.checked = false;
});


const draw = (dataForm) => {
    const svg = d3.select("svg");
    let pict = drawSmile(svg);

	const translateStr = (dataForm.cx_start.value && dataForm.cy_start.value) ?
		`translate(${dataForm.cx_start.value}, ${dataForm.cy_start.value})` : 
		`translate(0, 0)`;

	const scaleStr = (dataForm.cxScaleFrom.value && dataForm.cyScaleFrom.value) ?
		`scale(${dataForm.cxScaleFrom.value}, ${dataForm.cyScaleFrom.value})` : 
		`scale(1, 1)`;

	const rotateStr = dataForm.angleFrom.value ?
		`rotate(${dataForm.angleFrom.value})` : `rotate(0)`;

    pict.attr("transform", `${translateStr},${scaleStr},${rotateStr}`);

	console.log(translateStr, scaleStr, rotateStr);
}

const toggleAnimationControls = (checkbox) => {
	if (checkbox.checked) {
		setting.classList.add("animation-enabled");
		drawButton.classList.add("hidden");
	} else {
		setting.classList.remove("animation-enabled");
		drawButton.classList.remove("hidden");
	}
}

const togglePathControls = (checkbox) => {
	const coordControls = document.getElementsByClassName("coord-controls")[0];
	const pathControls = document.getElementsByClassName("path-controls")[0];
	
	if (checkbox.checked) {
		coordControls.classList.remove("shown");
		coordControls.classList.add("hidden");
		pathControls.classList.remove("hidden");
		pathControls.classList.add("shown");
	} else {
		coordControls.classList.remove("hidden");
		coordControls.classList.add("shown");
		pathControls.classList.remove("shown");
		pathControls.classList.add("hidden");
	}
}

const clearForm = (dataForm) => {
    const svg = d3.select("svg");
		svg.selectAll("*").remove();
}

const runAnimation = (dataForm) => {
	const svg = d3.select("svg");
	const animationSelect = document.getElementsByClassName("animation-select")[0];
	const selectedEase = animationSelect.value;
	let pict = drawSmile(svg);

	let easeFunc;
	switch (selectedEase) {
	case "linear":
		easeFunc = d3.easeLinear;
		break;
	case "elastic":
		easeFunc = d3.easeElastic;
		break;
	case "bounce":
	default:
		easeFunc = d3.easeBounce;
		break;
	}

	if (enablePathCrossingCheckbox.checked) {
		console.log("path crossing starts here!");

		const hideUselessOptions = () => {
			scaleSetting.classList.add("hidden");
			angleSetting.classList.add("hidden");
		}
		const revealUselessOptions = () => {
			scaleSetting.classList.remove("hidden");
			angleSetting.classList.remove("hidden");
		}

		hideUselessOptions();
		console.log("scaleSetting's classList", scaleSetting.classList);
		let p = drawPath(path.selectedIndex);
		pict.transition()
		.ease(easeFunc)
		.duration(6000)
		.attrTween('transform', translateAlong(p.node()))
		.on("end", revealUselessOptions);

	} else {
		pict.attr("transform",
			`translate(${dataForm.cx_start.value},${dataForm.cy_start.value})
			 scale(${dataForm.cxScaleFrom.value},${dataForm.cyScaleFrom.value})
			 rotate(${dataForm.angleFrom.value})`)
		.transition()
		.duration(6000)
		.ease(easeFunc)
		.attr("transform",
			`translate(${dataForm.cx_finish.value},${dataForm.cy_finish.value})
			scale(${dataForm.cxScaleTo.value},${dataForm.cyScaleTo.value})
			rotate(${dataForm.angleTo.value})`);
	}
}
