# Online-Academy

Đồ án cuối kì môn Phát triển ứng dụng web

Lớp: CSC13008_20KTPM3

Nhóm 10:
+ 20127078  - Nguyễn Lê Hoàng Thông
+ 20127545  - Trần Anh Kiệt
+ 19127396  - Phan Thiên Vinh Hiển
+ 20127107  - Lê Quốc Kỳ Anh


+ app/controller/ : các hàm xử lý API
+ config/db/: kết nối database
+ public/ : static file
+ services/ : các hàm tương tác với database
+ routes/ : định nghĩa url


Flow: ([get] '/example/test')\
&emsp;&emsp;-> src/routes/index.js\
&emsp;&emsp;&emsp;-> src/routes/example.route.js\
&emsp;&emsp;&emsp;&emsp;-> src/app/controllers/example.controller.js
