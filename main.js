
function TrieDS() {
    function Node(val, endVal) {
        this.key = val;
        this.children = [];
        this.endOfWord = endVal;
    }
    let rootNode = new Node(null, false);
    function add(input) {
        let matchChild = null;
        let newNode = null;
        function addChar(input, endValue, parNode, match) {
            if (!match) {
                let currChar = input.slice(0,1);
                newNode = new Node(currChar, endValue);
                parNode.children.push(newNode);
            }
            if (!endValue) {
                let inputVal = input.slice(1);
                if (match && match.children) {
                    matchChild = match.children.find((elem) => {
                        return (elem.key === inputVal[0]);
                    });
                }
                if (match) {
                    newNode = match;
                }
                if (inputVal.length === 1) {
                    addChar(inputVal, true, newNode, matchChild);
                } else {
                    addChar(inputVal, false, newNode, matchChild); 
                }
            } else {
                console.log(rootNode);
            }
            return;
        }
        if (rootNode.children) {
            matchChild = rootNode.children.find((elem) => {
                return (elem.key === input[0]);
            });
        }
        if (input.length === 1) {
            addChar(input, true, rootNode, matchChild);
        } else {
            addChar(input, false, rootNode, matchChild);
        }
    }
    function search(input) {
        let wordsList = [];
        function currNode(node, index) {
            let char = input[index];
            let currNodeElem = node.children.find(elem => {
                return (elem.key === char);
            });
            if (currNodeElem) {
                index++;
                if (index <= input.length - 1) {
                    currNode(currNodeElem, index);
                } else {
                    function iterateFurther(currNodeElem, word) {
                        if (!currNodeElem.children.length) {
                            return;
                        }
                        for (let i=0; i < currNodeElem.children.length; i++) {
                            let currNode = currNodeElem.children[i];
                            let newWord = word + currNode.key;
                            if (currNode.endOfWord) {
                                wordsList.push(newWord);  
                            }
                            iterateFurther(currNode, newWord);
                        }
                    }
                    let word = input.slice(0, index);
                    iterateFurther(currNodeElem, word);
                }
            }

        }
        if (input.length) {
            currNode(rootNode,0);
        }
        return wordsList;
    }
    return {
        add, 
        search
    }
}
const {add, search} = TrieDS();
add('hello');
add('hi');
add('elephant');
add('grass');
add('girraffe');
add('hybrid');
add('muscular');
add('elephanta');
add('lion');
add('soccer');
add('configuration');
add('project');
add('application');
add('thyroid');
add('tea');

document.getElementById('inputText').addEventListener('keyup', function(event) {

    document.getElementById('result').innerHTML = '';
    const wordsList = search(this.value);
    let parent = document.createElement('div');
    for(let i=0; i< wordsList.length; i++) {
        let childElem = document.createElement('div');
        let text = document.createTextNode(wordsList[i]);
        childElem.appendChild(text);
        parent.appendChild(childElem);
    }
    if (wordsList.length === 0) {
        document.getElementById('result').innerHTML = 'No results found';
    }
    document.getElementById('result').appendChild(parent);
});
