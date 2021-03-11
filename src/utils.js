export function movement(node) {
    let x;
    let y;
    function handleMouseDown(event) {
        x = event.clientX;
        y = event.clientY;
        node.dispatchEvent(new CustomEvent('movementstart', {
            detail: { x, y }
        }));

        window.addEventListener('mousemove', handleMousemove);
        window.addEventListener('mouseup', handleMouseup);
    }
    function handleMousemove(event) {
        const dx = event.clientX - x;
        const dy = event.clientY - y;
        x = event.clientX;
        y = event.clientY;
        node.dispatchEvent(new CustomEvent('movement', {
            detail: { x, y, dx, dy }
        }));
    }
    function handleMouseup(event) {
        x = event.clientX;
        y = event.clientY;

        node.dispatchEvent(new CustomEvent('movementend', {
            detail: { x, y }
        }));

        window.removeEventListener('mousemove', handleMousemove);
        window.removeEventListener('mouseup', handleMouseup);
    }
    node.addEventListener('mousedown', handleMouseDown);

    return {
        destroy() {
            node.removeEventListener('mousedown', handleMouseDown);
        }
    };
}

export function rotate(node, posis) {
    let x, y;
    let t, l, h, w;
    let angle = 0;
    let rotation = 0;
    let startAngle = 0;
    const R2D = 180 / Math.PI
    let center = {
        x: 0,
        y: 0
    }

    function handleRotateStart(event) {
        event.preventDefault();
        event.stopPropagation();
        let baseRect = node.parentElement.parentElement.getBoundingClientRect()
        t = baseRect.top;
        l = baseRect.left;
        h = baseRect.height;
        w = baseRect.width;
        center = {
            x: l + (w / 2),
            y: t + (h / 2)
        }
        x = event.clientX - center.x;
        y = event.clientY - center.y;
        startAngle = R2D * Math.atan2(y, x)

        node.dispatchEvent(new CustomEvent('rotatesstart', {
            detail: { active: true }
        }));
        window.addEventListener('mousemove', handleRotating);
        window.addEventListener('mouseup', handleMouseup);

    }

    function handleRotating(event) {
        event.preventDefault();
        let x = event.clientX - center.x
        let y = event.clientY - center.y
        let d = R2D * Math.atan2(y, x);
        rotation = d - startAngle;
        node.dispatchEvent(new CustomEvent('rotating', {
            detail: { angle: angle + rotation }
        }));


    }
    function handleMouseup() {
        angle += rotation;
        window.removeEventListener('mousemove', handleRotating);
        window.removeEventListener('mouseup', handleMouseup);
    }
    node.addEventListener('mousedown', handleRotateStart);

    return {
        destroy() {
            node.removeEventListener('mousedown', handleRotateStart);
        }
    };
}