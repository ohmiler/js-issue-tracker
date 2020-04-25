document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
    let issueDesc = document.getElementById('issueDescInput').value;
    let issueSeverity = document.getElementById('issueSeverityInput').value;
    let issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    let issueId = chance.guid();
    let issueStatus = 'Open';

    let issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }
    console.log(issue);


    if (localStorage.getItem('issues') == null) {
        let issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        let issues = JSON.parse(localStorage.getItem('issues'))
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueInputForm').reset();

    fetchIssues();

    e.preventDefault();
}

function setStatusClosed(id) {
    let issues = JSON.parse(localStorage.getItem('issues'));

    for (let i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues[i].status = 'Closed';
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

// function setStatusOpen(id) {
//     let issues = JSON.parse(localStorage.getItem('issues'));

//     for (let i = 0; i < issues.length; i++) {
//         if (issues[i].id == id) {
//             issues[i].status = 'Open';
//         }
//     }

//     localStorage.setItem('issues', JSON.stringify(issues));

//     fetchIssues();
// }

function deleteIssue(id) {
    let issues = JSON.parse(localStorage.getItem('issues'));
    console.log(issues);

    for (let i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues.splice(i, 1);    
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

function fetchIssues() {
    let issues = JSON.parse(localStorage.getItem('issues'));
    let issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    for (let i = 0; i < issues.length; i++) {
        let id = issues[i].id;
        let desc = issues[i].description;
        let severity = issues[i].severity;
        let assignedTo = issues[i].assignedTo;
        let status = issues[i].status;

        issuesList.innerHTML += `<div class="jumbotron">
                                <h6>Issue ID: <span class="badge badge-primary">${id}</span></h6>
                                <h6>Status : <span class="badge badge-info">${status}</span></h6>
                                <h3>${desc}</h3>
                                <p><i class="far fa-clock"></i> ${severity}</p>
                                <p><i class="fas fa-users-cog"></i> ${assignedTo}</p>
                                <a onClick="setStatusClosed('${id}')" class="btn btn-warning text-white">Close</a>
                                <!-- <a onClick="setStatusOpen('${id}')" class="btn btn-success text-white">Open</a> -->
                                <a onClick="deleteIssue('${id}')" class="btn btn-danger text-white">Delete</a>
                                </div>`;
    }
}