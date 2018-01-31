<!doctype html>
<html lang="en">
    <head>



        <style>
            .w3-sidebar a {font-family: "Roboto", sans-serif}
            body,h1,h2,h3,h4,h5,h6,.w3-wide {font-family: "Montserrat", sans-serif;}
        </style>
    <body >
        <div align="center">
            <table width="500" border="0">
                <tr>
                    <td>

                        <title>เข้าสู่ระบบ</title>

                <center><h2>เข้าสู่ระบบ</h2></center>
                <div class="col align-self-center">
                    <form action="home.php" enctype="multipart/form-data">
                        <div class="form-group">
                            <label for="exampleInputEmail1">อีเมล</label>
                            <input type="email" class="form-control" id="email" placeholder="ใส่อีเมล" value="<?php echo $txtemail; ?>">

                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">รหัสผ่าน</label>
                            <input type="password" class="form-control" id="pword" placeholder="ใส่รหัสผ่าน">
                        </div>


                        <div>
                            <button type="submit" class="btn btn-default btn-sm">เข้าสู่ระบบ</button>
                            <!-- Trigger the modal with a button -->
                            <button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#myModal">ลืมรหัสผ่าน</button>

                            <!-- Modal -->
                            <div class="modal fade" id="myModal" role="dialog">
                                <div class="modal-dialog modal-sm">
                                    <div class="modal-content">
                                        <div class="modal-header">

                                            <h4 class="modal-title">กรุณาใส่อีเมล</h4>
                                        </div>
                                        <div class="modal-body">
                                            <p>
                                            <div class="form-group">
                                                <input type="text" class="form-control" id="recipient-name"  placeholder="อีเมลที่ลืมรหัส..">
                                            </div></p>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-primary">ส่งอีเมล</button>
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">ออก</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <br>

                    </form>
                </div>



                <div class="col-sm">

                </div>
                </td>
                </tr>
            </table>
        </div>
        <script>
            // Accordion 
            function myAccFunc() {
                var x = document.getElementById("demoAcc");
                if (x.className.indexOf("w3-show") == -1) {
                    x.className += " w3-show";
                } else {
                    x.className = x.className.replace(" w3-show", "");
                }
            }

            // Click on the "Jeans" link on page load to open the accordion for demo purposes
            document.getElementById("myBtn").click();


            // Script to open and close sidebar
            function w3_open() {
                document.getElementById("mySidebar").style.display = "block";
                document.getElementById("myOverlay").style.display = "block";
            }

            function w3_close() {
                document.getElementById("mySidebar").style.display = "none";
                document.getElementById("myOverlay").style.display = "none";
            }
        </script>


    </body>
</html>