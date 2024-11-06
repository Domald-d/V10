document.addEventListener('DOMContentLoaded', () => {
    // Create and append the title
    const title = document.createElement('h1');
    title.textContent = 'Litaðu með Canvas';
    document.body.appendChild(title);

    // Create and append the color picker container
    const colorPickerContainer = document.createElement('div');

    const colorLabel = document.createElement('label');
    colorLabel.setAttribute('for', 'colorPicker');
    colorLabel.textContent = 'Veldu lit: ';
    colorPickerContainer.appendChild(colorLabel);

    const colorPicker = document.createElement('input');
    colorPicker.setAttribute('type', 'color');
    colorPicker.setAttribute('id', 'colorPicker');
    colorPickerContainer.appendChild(colorPicker);

    const saveBtn = document.createElement('button');
    saveBtn.setAttribute('id', 'saveBtn');
    saveBtn.textContent = 'Vista mynd';
    colorPickerContainer.appendChild(saveBtn);

    const eraseBtn = document.createElement('button');
    eraseBtn.setAttribute('id', 'eraseBtn');
    eraseBtn.textContent = 'endursetja canvas';
    colorPickerContainer.appendChild(eraseBtn);

    document.body.appendChild(colorPickerContainer);

    // Create and append the canvas
    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'paintCanvas');
    canvas.setAttribute('width', '800');
    canvas.setAttribute('height', '600');
    document.body.appendChild(canvas);

    // Painting logic
    const ctx = canvas.getContext('2d');
    let painting = false;

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function endPosition() {
        painting = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!painting) return;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = colorPicker.value;

        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    function saveCanvas() {
        const link = document.createElement('a');
        link.download = 'canvas-image.jpeg';
        link.href = canvas.toDataURL('image/jpeg');
        link.click();
    }

    function eraseCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);
    saveBtn.addEventListener('click', saveCanvas);
    eraseBtn.addEventListener('click', eraseCanvas);
});