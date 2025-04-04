class TreeNode {
    constructor(value, parent = null) {
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
        this.nodeRadius = 25;
    }

    insertRoot(value) {
        if (!value && value !== 0) {
            alert('Please enter a valid number');
            return;
        }
        if (this.root) {
            alert('Root node already exists!');
            return;
        }
        this.root = new TreeNode(Number(value));
        this.render();
    }

    insert(value, direction) {
        if (!this.root) {
            alert('Insert root node first!');
            return;
        }
        value = Number(value);
        if (isNaN(value)) {
            alert('Please enter a valid number');
            return;
        }
        let current = this.root;
        while (current[direction]) {
            current = current[direction];
        }
        current[direction] = new TreeNode(value, current);
        this.render();
    }

    clear() {
        this.root = null;
        document.getElementById('treeContainer').innerHTML = '';
    }

    render() {
        const container = document.getElementById('treeContainer');
        container.innerHTML = '';
        if (!this.root) return;
        const queue = [{ node: this.root, x: container.offsetWidth / 2, y: 20, level: 0 }];
        while (queue.length > 0) {
            const { node, x, y, level } = queue.shift();
            const nodeEl = this.createNodeElement(node.value, x, y);
            container.appendChild(nodeEl);
            const offset = container.offsetWidth / (2 ** (level + 2));
            if (node.left) {
                const leftX = x - offset;
                const leftY = y + 80;
                queue.push({ node: node.left, x: leftX, y: leftY, level: level + 1 });
                this.createConnection(x, y + this.nodeRadius, leftX, leftY - this.nodeRadius);
            }
            if (node.right) {
                const rightX = x + offset;
                const rightY = y + 80;
                queue.push({ node: node.right, x: rightX, y: rightY, level: level + 1 });
                this.createConnection(x, y + this.nodeRadius, rightX, rightY - this.nodeRadius);
            }
        }
    }

    createNodeElement(value, x, y) {
        const node = document.createElement('div');
        node.className = 'node';
        node.textContent = value;
        node.style.left = `${x - this.nodeRadius}px`;
        node.style.top = `${y}px`;
        return node;
    }

    createConnection(x1, y1, x2, y2) {
        const container = document.getElementById('treeContainer');
        const dx = x2 - x1;
        const dy = y2 - y1;
        const length = Math.sqrt(dx ** 2 + dy ** 2);
        const angle = Math.atan2(dy, dx);
        const connector = document.createElement('div');
        connector.className = 'connector';
        connector.style.width = `${length}px`;
        connector.style.left = `${x1}px`;
        connector.style.top = `${y1}px`;
        connector.style.transform = `rotate(${angle}rad)`;
        container.appendChild(connector);
    }
}

const bst = new BST();
function insertRoot() { bst.insertRoot(document.getElementById('nodeValue').value); }
function insertLeft() { bst.insert(document.getElementById('nodeValue').value, 'left'); }
function insertRight() { bst.insert(document.getElementById('nodeValue').value, 'right'); }
function clearTree() { bst.clear(); }