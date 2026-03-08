// State Variables
let currentIndex = 0;
let userAnswers = [];
let examStarted = false;
let timeRemaining = 45 * 60; 
let timerInterval = null;

// DOM Elements
const questionCounterEl = document.getElementById('question-counter');
const questionTextEl = document.getElementById('question-text');
const optionsContainerEl = document.getElementById('options-container');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnSubmit = document.getElementById('btn-submit');
const btnAnswerKey = document.getElementById('btn-answer-key');
const btnBackToExam = document.getElementById('btn-back-to-exam');
const btnRetake = document.getElementById('btn-retake'); 
const timeDisplay = document.getElementById('time-display');
const examArea = document.getElementById('exam-area');
const summaryArea = document.getElementById('summary-area');
const summaryContent = document.getElementById('summary-content');
const summaryTitle = document.getElementById('summary-title');

// Initialize Exam Data Structures
function initExam() {
    userAnswers = examData.map(q => {
        if (q.type === 'multiple') return [];
        if (q.type === 'matrix') return new Array(q.statements.length).fill(null);
        if (q.type === 'dragdrop') return new Array(q.targets.length).fill(null);
        return null; 
    });
    
    loadQuestion(currentIndex);
    
    btnPrev.addEventListener('click', () => {
        if (currentIndex > 0) { currentIndex--; loadQuestion(currentIndex); }
    });

    btnNext.addEventListener('click', () => {
        if (currentIndex < examData.length - 1) { currentIndex++; loadQuestion(currentIndex); }
    });

    btnSubmit.addEventListener('click', () => {
        const missingQuestions = checkCompletion();
        if (missingQuestions.length > 0) {
            alert(`You have not completed the following questions: ${missingQuestions.join(', ')}.\n\nPlease answer them before submitting the exam.`);
        } else {
            generateSummary();
        }
    });
    
    btnAnswerKey.addEventListener('click', () => {
        if (!examStarted) generateAnswerKey();
    });

    btnBackToExam.addEventListener('click', returnToExam);
    btnRetake.addEventListener('click', resetExam); 
}

// Reset Entire Exam
function resetExam() {
    clearInterval(timerInterval);
    currentIndex = 0;
    examStarted = false;
    timeRemaining = 45 * 60;
    timeDisplay.textContent = "45:00";
    btnAnswerKey.disabled = false;
    btnAnswerKey.style.opacity = "1";
    btnAnswerKey.style.cursor = "pointer";

    userAnswers = examData.map(q => {
        if (q.type === 'multiple') return [];
        if (q.type === 'matrix') return new Array(q.statements.length).fill(null);
        if (q.type === 'dragdrop') return new Array(q.targets.length).fill(null);
        return null; 
    });

    returnToExam();
    loadQuestion(0);
}

// Validation function
function checkCompletion() {
    let missing = [];
    for (let i = 0; i < examData.length; i++) {
        const ans = userAnswers[i];
        const q = examData[i];
        
        if (q.type === 'single' && ans === null) missing.push(i + 1);
        else if (q.type === 'multiple' && (!ans || ans.length !== q.correct.length)) missing.push(i + 1);
        else if ((q.type === 'matrix' || q.type === 'dragdrop') && ans.includes(null)) missing.push(i + 1);
    }
    return missing;
}

function startTimer() {
    if (examStarted) return; 
    examStarted = true;
    btnAnswerKey.disabled = true; 
    btnAnswerKey.style.opacity = "0.5";
    btnAnswerKey.style.cursor = "not-allowed";

    timerInterval = setInterval(() => {
        timeRemaining--;
        let m = Math.floor(timeRemaining / 60).toString().padStart(2, '0');
        let s = (timeRemaining % 60).toString().padStart(2, '0');
        timeDisplay.textContent = `${m}:${s}`;
        
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert("Time is up! Your exam will now be submitted automatically.");
            generateSummary(); 
        }
    }, 1000);
}

// Load Question into UI
function loadQuestion(index) {
    const question = examData[index];
    questionCounterEl.textContent = `Question ${index + 1} of ${examData.length}`;
    questionTextEl.innerText = question.text;
    optionsContainerEl.innerHTML = ''; 
    
    if (question.type === 'single' || question.type === 'multiple') {
        renderStandardOptions(question, index);
    } else if (question.type === 'matrix') {
        renderMatrixOptions(question, index);
    } else if (question.type === 'dragdrop') {
        renderDragDropOptions(question, index);
    }

    btnPrev.disabled = index === 0;
    btnNext.disabled = index === examData.length - 1;
}

function renderStandardOptions(question, index) {
    const maxSelections = question.type === 'multiple' ? question.correct.length : 1;

    question.options.forEach((optionText, optIndex) => {
        const label = document.createElement('label');
        label.className = 'option-label';
        const input = document.createElement('input');
        
        if (question.type === 'multiple') {
            input.type = 'checkbox';
            input.value = optIndex;
            if (userAnswers[index].includes(optIndex)) input.checked = true;

            input.addEventListener('change', (e) => {
                startTimer(); 
                if (e.target.checked) {
                    if (userAnswers[index].length >= maxSelections) {
                        e.target.checked = false; 
                        alert(`This question only requires ${maxSelections} answers.`);
                        return;
                    }
                    userAnswers[index].push(optIndex);
                } else {
                    userAnswers[index] = userAnswers[index].filter(val => val !== optIndex);
                }
            });
        } else {
            input.type = 'radio';
            input.name = `question_${index}`;
            input.value = optIndex;
            if (userAnswers[index] === optIndex) input.checked = true;

            input.addEventListener('change', (e) => {
                startTimer(); 
                userAnswers[index] = parseInt(e.target.value);
            });
        }

        label.appendChild(input);
        label.appendChild(document.createTextNode(optionText));
        optionsContainerEl.appendChild(label);
    });
}

function renderMatrixOptions(question, index) {
    let table = document.createElement('table');
    table.className = 'matrix-table';
    
    let headerRow = `<tr><th></th>`;
    question.options.forEach(opt => headerRow += `<th>${opt}</th>`);
    headerRow += `</tr>`;
    table.innerHTML = headerRow;

    question.statements.forEach((stmt, stmtIndex) => {
        let tr = document.createElement('tr');
        let tdTitle = document.createElement('td');
        tdTitle.textContent = stmt;
        tr.appendChild(tdTitle);

        question.options.forEach((opt, optIndex) => {
            let tdRadio = document.createElement('td');
            let radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `q${index}_stmt${stmtIndex}`;
            radio.value = optIndex;
            
            if (userAnswers[index][stmtIndex] === optIndex) radio.checked = true;

            radio.addEventListener('change', () => {
                startTimer();
                userAnswers[index][stmtIndex] = optIndex;
            });

            tdRadio.appendChild(radio);
            tr.appendChild(tdRadio);
        });
        table.appendChild(tr);
    });
    optionsContainerEl.appendChild(table);
}

function renderDragDropOptions(question, index) {
    const container = document.createElement('div');
    container.className = 'dragdrop-container';

    const sourceCol = document.createElement('div');
    sourceCol.className = 'drag-column';
    sourceCol.id = `source-col-${index}`;
    sourceCol.innerHTML = `<h4>Sources</h4>`;

    const targetCol = document.createElement('div');
    targetCol.className = 'drag-column';
    targetCol.innerHTML = `<h4>Targets</h4>`;

    question.targets.forEach((targetText, targetIdx) => {
        const row = document.createElement('div');
        row.className = 'target-row';
        
        const label = document.createElement('div');
        label.className = 'target-label';
        label.textContent = targetText;
        
        const dropZone = document.createElement('div');
        dropZone.className = 'drop-zone';
        dropZone.dataset.targetIdx = targetIdx;
        
        // Desktop Drag Over events
        dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('drag-over'); });
        dropZone.addEventListener('dragleave', e => dropZone.classList.remove('drag-over'));
        dropZone.addEventListener('drop', e => handleTargetDrop(e, dropZone, sourceCol, index, targetIdx));

        row.appendChild(label);
        row.appendChild(dropZone);
        targetCol.appendChild(row);
    });

    question.sources.forEach((srcText, srcIdx) => {
        const item = createDragItem(srcText, srcIdx, index);
        const placedTargetIdx = userAnswers[index].indexOf(srcIdx);
        
        if (placedTargetIdx !== -1) {
            targetCol.querySelectorAll('.drop-zone')[placedTargetIdx].appendChild(item);
        } else {
            sourceCol.appendChild(item);
        }
    });

    // Desktop Return to source logic
    sourceCol.addEventListener('dragover', e => e.preventDefault());
    sourceCol.addEventListener('drop', e => {
        e.preventDefault();
        const draggedData = JSON.parse(e.dataTransfer.getData('text/plain'));
        const draggedElement = document.getElementById(draggedData.elementId);
        
        sourceCol.appendChild(draggedElement);
        const targetIdxToRemove = userAnswers[index].indexOf(draggedData.srcIdx);
        if (targetIdxToRemove !== -1) userAnswers[index][targetIdxToRemove] = null;
    });

    container.appendChild(sourceCol);
    container.appendChild(targetCol);
    optionsContainerEl.appendChild(container);
}

function createDragItem(text, srcIdx, questionIndex) {
    const item = document.createElement('div');
    item.className = 'drag-item';
    item.draggable = true;
    item.textContent = text;
    item.id = `drag-${questionIndex}-${srcIdx}`;
    
    // --- DESKTOP DRAG EVENTS ---
    item.addEventListener('dragstart', e => {
        startTimer();
        e.dataTransfer.setData('text/plain', JSON.stringify({ srcIdx: srcIdx, elementId: item.id }));
        setTimeout(() => item.classList.add('is-dragging'), 0);
    });
    item.addEventListener('dragend', () => item.classList.remove('is-dragging'));

    // --- MOBILE TOUCH EVENTS ---
    let ghost = null;

    item.addEventListener('touchstart', e => {
        startTimer();
        const touch = e.touches[0];
        
        // Create visual clone
        ghost = item.cloneNode(true);
        ghost.classList.add('ghost-drag');
        ghost.style.width = item.offsetWidth + 'px';
        ghost.style.left = touch.pageX - (item.offsetWidth / 2) + 'px';
        ghost.style.top = touch.pageY - (item.offsetHeight / 2) + 'px';
        document.body.appendChild(ghost);

        item.classList.add('is-dragging');
    }, { passive: false });

    item.addEventListener('touchmove', e => {
        if (!ghost) return;
        e.preventDefault(); 
        const touch = e.touches[0];
        ghost.style.left = touch.pageX - (ghost.offsetWidth / 2) + 'px';
        ghost.style.top = touch.pageY - (ghost.offsetHeight / 2) + 'px';
    }, { passive: false });

    item.addEventListener('touchend', e => {
        if (!ghost) return;
        ghost.remove();
        ghost = null;
        item.classList.remove('is-dragging');

        const touch = e.changedTouches[0];
        const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
        if (!dropTarget) return;

        const dropZone = dropTarget.closest('.drop-zone');
        const sourceCol = dropTarget.closest('.drag-column');
        const originalSourceCol = document.getElementById(`source-col-${questionIndex}`);

        if (dropZone) {
            // Safety: Don't do anything if dropping the item into the exact box it's already in
            if (dropZone.contains(item)) return;

            // Swap back to source if zone is occupied by a different item
            if (dropZone.children.length > 0) {
                originalSourceCol.appendChild(dropZone.children[0]);
            }
            dropZone.appendChild(item);
            
            const targetIdx = parseInt(dropZone.dataset.targetIdx);
            const oldTargetIdx = userAnswers[questionIndex].indexOf(srcIdx);
            if (oldTargetIdx !== -1) userAnswers[questionIndex][oldTargetIdx] = null;
            
            userAnswers[questionIndex][targetIdx] = srcIdx;
            
        } else if (sourceCol && sourceCol.id === `source-col-${questionIndex}`) {
            originalSourceCol.appendChild(item);
            const targetIdxToRemove = userAnswers[questionIndex].indexOf(srcIdx);
            if (targetIdxToRemove !== -1) userAnswers[questionIndex][targetIdxToRemove] = null;
        }
    });

    return item;
}

// Handle drops on Desktop
function handleTargetDrop(e, dropZone, sourceCol, questionIndex, targetIdx) {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    
    const draggedData = JSON.parse(e.dataTransfer.getData('text/plain'));
    const draggedElement = document.getElementById(draggedData.elementId);
    
    // Safety: Don't do anything if dropping the item into the exact box it's already in
    if (dropZone.contains(draggedElement)) return;

    if (dropZone.children.length > 0) {
        sourceCol.appendChild(dropZone.children[0]);
    }

    dropZone.appendChild(draggedElement);
    
    const oldTargetIdx = userAnswers[questionIndex].indexOf(draggedData.srcIdx);
    if (oldTargetIdx !== -1) userAnswers[questionIndex][oldTargetIdx] = null;
    
    userAnswers[questionIndex][targetIdx] = draggedData.srcIdx;
}

function arraysEqual(a, b) {
    if (!a || !b) return false;
    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

// Formatting helpers for the summary screen
function getCorrectAnswerString(q) {
    if (q.type === 'single') return q.options[q.correct];
    if (q.type === 'multiple') return q.correct.map(idx => q.options[idx]).join(" | ");
    if (q.type === 'matrix') return q.statements.map((stmt, i) => `${stmt}: <b>${q.options[q.correct[i]]}</b>`).join("<br>");
    if (q.type === 'dragdrop') return q.targets.map((tgt, i) => `${tgt} &rarr; <b>${q.sources[q.correct[i]]}</b>`).join("<br>");
    return "";
}

function getUserAnswerString(q, ans) {
    if (ans === null || (Array.isArray(ans) && ans.length === 0) || (Array.isArray(ans) && ans.includes(null))) return "No answer selected / Incomplete";
    if (q.type === 'single') return q.options[ans];
    if (q.type === 'multiple') return ans.map(idx => q.options[idx]).join(" | ");
    if (q.type === 'matrix') return q.statements.map((stmt, i) => `${stmt}: <b>${q.options[ans[i]]}</b>`).join("<br>");
    if (q.type === 'dragdrop') return q.targets.map((tgt, i) => `${tgt} &rarr; <b>${q.sources[ans[i]]}</b>`).join("<br>");
    return "";
}

// Generate Final Grade
function generateSummary() {
    clearInterval(timerInterval); 
    examArea.style.display = 'none';
    summaryArea.style.display = 'block';
    
    let score = 0;
    summaryContent.innerHTML = '';

    examData.forEach((q, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'summary-item';
        const ans = userAnswers[index];
        let isCorrect = false;

        if (q.type === 'single') isCorrect = (ans === q.correct);
        else if (q.type === 'multiple') {
            const sortedAns = [...ans].sort();
            const sortedCorr = [...q.correct].sort();
            isCorrect = arraysEqual(sortedAns, sortedCorr);
        }
        else isCorrect = arraysEqual(ans, q.correct);

        if (isCorrect) score++;
        const resultClass = isCorrect ? 'result-correct' : 'result-incorrect';

        itemDiv.innerHTML = `
            <div class="summary-question">Q${index + 1}: ${q.text.substring(0,80)}...</div>
            <div class="summary-result ${resultClass}">Result: ${isCorrect ? 'Correct' : 'Incorrect'}</div>
            <div class="summary-user-answer">Your Answer: <br>${getUserAnswerString(q, ans)}</div>
            ${!isCorrect ? `<div class="summary-correct-answer">Correct Answer: <br>${getCorrectAnswerString(q)}</div>` : ''}
        `;
        summaryContent.appendChild(itemDiv);
    });

    summaryTitle.textContent = `Exam Summary - Score: ${score} / ${examData.length}`;
    
    btnPrev.style.display = 'none';
    btnNext.style.display = 'none';
    btnSubmit.style.display = 'none';
    btnAnswerKey.style.display = 'none';
    btnBackToExam.style.display = 'none'; 
    btnRetake.style.display = 'block'; 
}

function generateAnswerKey() {
    examArea.style.display = 'none';
    summaryArea.style.display = 'block';
    summaryTitle.textContent = `Full Answer Key`;
    summaryContent.innerHTML = '';
    
    examData.forEach((q, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'summary-item';
        itemDiv.innerHTML = `
            <div class="summary-question">Q${index + 1}: ${q.text}</div>
            <div class="summary-correct-answer">Answer: <br>${getCorrectAnswerString(q)}</div>
        `;
        summaryContent.appendChild(itemDiv);
    });

    btnPrev.style.display = 'none';
    btnNext.style.display = 'none';
    btnSubmit.style.display = 'none';
    btnAnswerKey.style.display = 'none';
    btnBackToExam.style.display = 'block';
    btnRetake.style.display = 'none';
}

function returnToExam() {
    summaryArea.style.display = 'none';
    examArea.style.display = 'block';
    
    btnPrev.style.display = 'block';
    btnNext.style.display = 'block';
    btnSubmit.style.display = 'block';
    
    if(!examStarted){
        btnAnswerKey.style.display = 'block';
    }
    
    btnBackToExam.style.display = 'none';
    btnRetake.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', initExam);