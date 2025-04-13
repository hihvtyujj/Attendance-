let attendanceData = [];

function markAttendance() {
    const studentName = document.getElementById("student-name").value;
    if (studentName === "") {
        alert("Please enter a student name.");
        return;
    }

    // Add new attendance record
    const attendance = {
        name: studentName,
        status: "Present"
    };
    attendanceData.push(attendance);

    // Clear input field
    document.getElementById("student-name").value = "";

    // Update attendance table
    updateAttendanceTable();
}

function updateAttendanceTable() {
    const tableBody = document.getElementById("attendance-table");
    tableBody.innerHTML = "";

    // Populate the table with attendance data
    attendanceData.forEach((attendance, index) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = attendance.name;
        row.appendChild(nameCell);

        const statusCell = document.createElement("td");
        statusCell.textContent = attendance.status;
        row.appendChild(statusCell);

        tableBody.appendChild(row);
    });
}

function shareAttendance() {
    if (navigator.share) {
        // Convert attendance data to a shareable string (e.g., CSV format or plain text)
        let attendanceText = "Attendance Records:\n";
        
        attendanceData.forEach(attendance => {
            attendanceText += `${attendance.name} - ${attendance.status}\n`;
        });

        navigator.share({
            title: "Attendance Tracker",
            text: attendanceText,  // The attendance list is shared as text
        })
        .then(() => console.log('Attendance shared successfully!'))
        .catch((error) => console.log('Error sharing attendance: ', error));
    } else {
        alert("Sharing is not supported on this device.");
    }
}

function downloadAttendanceCSV() {
    let csvContent = "Student Name,Status\n";
    
    attendanceData.forEach(attendance => {
        csvContent += `${attendance.name},${attendance.status}\n`;
    });

    // Create a Blob with the CSV data
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    
    // Create a link to download the file
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "attendance.csv";  // Filename for the download
    link.click();
}
