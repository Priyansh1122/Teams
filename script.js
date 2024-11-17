// Mock Data
let teamMembers = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
];

let tasks = [
    { id: 1, title: "Design Homepage", status: "in-progress", assignedTo: 1, deadline: "2024-11-20" },
    { id: 2, title: "Fix Bugs", status: "pending", assignedTo: 2, deadline: "2024-11-18" },
    { id: 3, title: "Write Documentation", status: "completed", assignedTo: 3, deadline: "2024-11-15" }
];

// Display Team Members
function updateTeamList() {
    const teamList = document.getElementById('team-list');
    teamList.innerHTML = '';
    teamMembers.forEach(member => {
        const li = document.createElement('li');
        li.textContent = member.name;
        teamList.appendChild(li);
    });

    // Update task assignment dropdown
    const taskMemberSelect = document.getElementById('task-member');
    taskMemberSelect.innerHTML = '<option value="">Assign to...</option>';
    teamMembers.forEach(member => {
        const option = document.createElement('option');
        option.value = member.id;
        option.textContent = member.name;
        taskMemberSelect.appendChild(option);
    });
}
updateTeamList();

// Display Tasks
function displayTasks(filter = 'all') {
    const tasksContainer = document.getElementById('tasks-container');
    tasksContainer.innerHTML = '';
    tasks.filter(task => filter === 'all' || task.status === filter)
        .forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.className = `task ${task.status}`;
            taskDiv.innerHTML = `
                <h3>${task.title}</h3>
                <p>Assigned to: ${teamMembers.find(member => member.id === task.assignedTo).name}</p>
                <p>Deadline: ${task.deadline}</p>
                <p>Status: ${task.status.charAt(0).toUpperCase() + task.status.slice(1)}</p>
            `;
            tasksContainer.appendChild(taskDiv);
        });
}
displayTasks();

// Add New Member
document.getElementById('add-member-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const newMemberName = document.getElementById('member-name').value.trim();
    if (newMemberName) {
        const newMember = { id: teamMembers.length + 1, name: newMemberName };
        teamMembers.push(newMember);
        updateTeamList();
        alert(`New member "${newMemberName}" added successfully!`);
        e.target.reset();
    }
});

// Add New Task
document.getElementById('add-task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const newTask = {
        id: tasks.length + 1,
        title: document.getElementById('task-title').value.trim(),
        description: document.getElementById('task-desc').value.trim(),
        deadline: document.getElementById('task-deadline').value,
        assignedTo: parseInt(document.getElementById('task-member').value),
        status: document.getElementById('task-status').value
    };

    if (newTask.title && newTask.deadline && newTask.assignedTo) {
        tasks.push(newTask);
        displayTasks(); // Update task list
        alert(`Task "${newTask.title}" added successfully!`);
        e.target.reset();
    } else {
        alert("Please fill out all required fields!");
    }
});

// Filter Tasks by Status
document.getElementById('status-filter').addEventListener('change', (e) => {
    displayTasks(e.target.value);
});
