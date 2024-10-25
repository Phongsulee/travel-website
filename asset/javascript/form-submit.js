$('#registerForm').submit(function (e) {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้าเมื่อกดส่งฟอร์ม

    var formData = {
        package: $('#package').val(),
        firstName: $('#firstName').val(),
        middleName: $('#middleName').val(),
        lastName: $('#lastName').val(),
        nickname: $('#nickname').val(),
        age: $('#age').val(),
        address: $('#address').val(),
        district: $('#district').val(),
        province: $('#province').val(),
        postalCode: $('#postalCode').val(),
        country: $('#country').val(),
        phone: $('#phone').val(),
        email: $('#email').val()
    };

    $.ajax({
        url: '/submit-form',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function (response) {
            console.log('Response:', response);
            $('#successModal').modal('show'); // แสดงป๊อปอัปเมื่อสำเร็จ
        },
        error: function (error) {
            console.error('Error:', error);
            alert('เกิดข้อผิดพลาดในการส่งข้อมูล');
        }
    });
});
