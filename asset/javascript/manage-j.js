document.addEventListener("DOMContentLoaded", function () {
    fetch("/data/formData.json")
        .then(response => {
            if (!response.ok) { // เพิ่มการตรวจสอบสถานะ
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // เพิ่มการตรวจสอบข้อมูลที่โหลดมา
            loadTableData(data);
        })
        .catch(error => {
            console.error('Error loading JSON data:', error);
        });
});

function loadTableData(items) {
    const table = document.getElementById("data-table"); // ค้นหา table ที่มี id = "data-table"

    items.forEach(item => {
        let row = document.createElement('tr'); // สร้าง element tr ใหม่

        // สร้างแต่ละ cell ของตาราง
        row.innerHTML = `
            <td>${item.first_name}</td>
            <td>${item.middle_name}</td>
            <td>${item.last_name}</td> <!-- แก้ไขให้ใช้ item.last_name แทน item.middle_name -->
            <td>${item.nickname}</td>
            <td>${item.age}</td>
            <td>${item.address}</td>
            <td>${item.district}</td>
            <td>${item.province}</td>
            <td>${item.postal_code}</td>
            <td>${item.country}</td>
            <td>${item.phone_number}</td>
            <td>${item.email}</td>
        `;

        // Append row เข้ากับตาราง
        table.appendChild(row);
    });
}
